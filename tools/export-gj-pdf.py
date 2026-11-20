"""Build the small public preview from the six local PDF-data snapshots.

Run from any directory: python3 tools/export-gj-pdf.py
Only summary counts and three example entries per target are published.
"""

import gc
import json
import math
import pickle
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TARGETS = ("Cu", "Co", "Mo", "Cr", "Fe", "Ag")
SAMPLES = ((73744, "Ti–O"), (63919, "Si"), (260, "Li–Fe–P–O"))


class DataOnlyUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        raise pickle.UnpicklingError(f"Unexpected executable global: {module}.{name}")


def read_target(symbol):
    source = ROOT / "PDF-data" / f"GJ-PDF-V1-{symbol}.pkl"
    with source.open("rb") as stream:
        snapshot = DataOnlyUnpickler(stream).load()
    database = snapshot["xrd_database"]
    metadata = snapshot["metadata"]
    assert metadata["radiation"] == symbol
    assert metadata["total_entries"] == len(database)
    elements = Counter()
    systems = Counter()
    groups = set()
    peaks = 0
    ids = set()
    index_entries = set()
    for key, entry in database.items():
        assert entry["ganjiang_id"] and entry["ganjiang_id"] not in ids
        ids.add(entry["ganjiang_id"])
        assert entry["formula"] and entry["elements"] and entry["n_atoms"] > 0
        assert entry["spacegroup_symbol"] and 1 <= entry["spacegroup_number"] <= 230
        elements.update(set(entry["elements"]))
        systems[tuple(sorted(set(entry["elements"])))] += 1
        groups.add(entry["spacegroup_number"])
        pattern = entry["peaks"]
        length = len(pattern["positions"])
        assert length == len(pattern["intensities"]) == len(pattern["d_spacings"]) == len(pattern["hkls"])
        assert length <= metadata["n_peaks"]
        for position, intensity, spacing, hkls in zip(pattern["positions"], pattern["intensities"], pattern["d_spacings"], pattern["hkls"]):
            assert all(math.isfinite(v) for v in (position, intensity, spacing))
            assert metadata["two_theta_range"][0] <= position <= metadata["two_theta_range"][1]
            assert 0 <= intensity <= 100.000001 and spacing > 0
            assert hkls and all(len(hkl["hkl"]) in (3, 4) for hkl in hkls), f"Invalid Miller indices: {symbol}/{key}/{hkls}"
        peaks += length
    for keys in snapshot["element_index"].values():
        for key in keys:
            assert key in database, f"Broken chemical-system index: {symbol}/{key}"
            index_entries.add(key)
    assert index_entries == database.keys(), f"Incomplete chemical-system index: {symbol}"
    inverted_entries = set()
    for element, keys in snapshot["element_inverted_index"].items():
        for key in keys:
            assert key in database and element in database[key]["elements"]
            inverted_entries.add(key)
    assert inverted_entries == database.keys(), f"Incomplete element index: {symbol}"
    stats = {
        "entries": len(database),
        "elements": len(elements),
        "chemicalSystems": len(systems),
        "spacegroups": len(groups),
        "peaks": peaks,
    }
    examples = []
    for key, system in SAMPLES:
        entry = database[key]
        pattern = entry["peaks"]
        sample_peaks = []
        for position, intensity, spacing, hkls in zip(
            pattern["positions"], pattern["intensities"], pattern["d_spacings"], pattern["hkls"]
        ):
            assert all(math.isfinite(v) for v in (position, intensity, spacing))
            assert metadata["two_theta_range"][0] <= position <= metadata["two_theta_range"][1]
            assert 0 <= intensity <= 100.000001
            sample_peaks.append({
                "position": round(position, 6),
                "intensity": round(intensity, 6),
                "d": round(spacing, 6),
                "hkl": [list(hkl["hkl"]) for hkl in hkls],
            })
        examples.append({
            "id": entry["ganjiang_id"],
            "formula": entry["formula"],
            "system": system,
            "elements": entry["elements"],
            "spacegroup": entry["spacegroup_symbol"],
            "spacegroupNumber": entry["spacegroup_number"],
            "peaks": sample_peaks,
        })
    result = {
        "symbol": symbol,
        "source": f"PDF-data/{source.name}",
        "wavelength": metadata["wavelength"],
        "wavelengthConvention": metadata["wavelength_convention"],
        "twoThetaRange": list(metadata["two_theta_range"]),
        "maxPeaksPerEntry": metadata["n_peaks"],
        "stats": stats,
        "examples": examples,
        "integrity": {"entriesChecked": len(database), "peaksChecked": peaks, "uniqueIds": len(ids), "chemicalIndexEntries": len(index_entries), "elementIndexEntries": len(inverted_entries)},
    }
    print(f"{symbol}: {json.dumps(stats)}; wavelength={metadata['wavelength']} Å", flush=True)
    del entry, database, snapshot
    gc.collect()
    return result, dict(sorted(elements.items())), systems, ids


def main():
    targets = []
    reference_elements = reference_systems = reference_ids = None
    for symbol in TARGETS:
        target, elements, systems, ids = read_target(symbol)
        if reference_elements is None:
            reference_elements, reference_systems = elements, systems
            reference_ids = ids
        else:
            assert elements == reference_elements, f"Element coverage differs for {symbol}"
            assert systems == reference_systems, f"Chemical-system coverage differs for {symbol}"
            assert ids == reference_ids, f"Structure identifiers differ for {symbol}"
            for sample, reference in zip(target["examples"], targets[0]["examples"]):
                for field in ("id", "formula", "elements", "spacegroup", "spacegroupNumber"):
                    assert sample[field] == reference[field], f"Sample identity differs: {symbol}/{field}"
        targets.append(target)
    payload = {
        "version": "GJ-PDF-V1",
        "stats": {**targets[0]["stats"], "targets": len(targets), "totalPeaks": sum(t["stats"]["peaks"] for t in targets)},
        "conditions": {
            "radiation": "Cu Kα",
            "twoThetaRange": targets[0]["twoThetaRange"],
            "maxPeaksPerEntry": targets[0]["maxPeaksPerEntry"],
        },
        "elementCounts": reference_elements,
        "targets": targets,
        "examples": targets[0]["examples"],
    }
    output = ROOT / "assets/science/gj-pdf-v1.js"
    output.write_text(
        "/* Generated by tools/export-gj-pdf.py from the six PDF-data snapshots. */\n"
        + "window.gjPdfV1 = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"Exported {output.relative_to(ROOT)} ({output.stat().st_size:,} bytes)", flush=True)
    print(json.dumps(payload["stats"]), flush=True)


if __name__ == "__main__":
    main()
