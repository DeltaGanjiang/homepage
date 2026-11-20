"""Export only the three public example structures from the team's ASE database.

python3 tools/export-gj-pdf-structures.py [path/to/ganjiang_db_v1.db]
The source is opened read-only. No structure coordinates are invented.
"""

import hashlib
import itertools
import json
import math
from pathlib import Path
import sqlite3
import struct
import sys
from collections import Counter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT.parent / "Asterbin-XMatcher/ganjiang_db_v1.db"
SYMBOLS = {3: "Li", 8: "O", 14: "Si", 15: "P", 22: "Ti", 26: "Fe"}
# Distance cutoffs for drawing near-neighbour contacts, not formal bond orders.
CUTOFFS = {("O", "Ti"): 2.45, ("Si", "Si"): 2.70, ("Fe", "O"): 2.45, ("O", "P"): 1.95, ("Li", "O"): 2.65}


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def cross(a, b):
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]


def norm(a):
    return math.sqrt(dot(a, a))


def unpack(blob, code):
    return struct.unpack("<" + code * (len(blob) // struct.calcsize(code)), blob)


def export_row(connection, entry):
    key = int(entry["id"].split("-")[1])
    row = connection.execute("SELECT id,natoms,numbers,positions,cell,key_value_pairs FROM systems WHERE id=?", (key,)).fetchone()
    assert row and json.loads(row["key_value_pairs"])["label"] == entry["id"]
    numbers = unpack(row["numbers"], "i")
    positions = unpack(row["positions"], "d")
    flat_cell = unpack(row["cell"], "d")
    assert len(numbers) == row["natoms"] and len(positions) == 3 * len(numbers) and len(flat_cell) == 9
    assert all(math.isfinite(v) for v in (*positions, *flat_cell))
    cell = [list(flat_cell[i:i + 3]) for i in range(0, 9, 3)]
    a, b, c = cell
    determinant = dot(a, cross(b, c))
    assert abs(determinant) > 1e-6
    reciprocal = [cross(b, c), cross(c, a), cross(a, b)]
    atoms = []
    for index, number in enumerate(numbers):
        position = positions[3 * index:3 * index + 3]
        fractional = [(dot(position, axis) / determinant) % 1 for axis in reciprocal]
        cartesian = [sum(fractional[i] * cell[i][j] for i in range(3)) for j in range(3)]
        atoms.append({"element": SYMBOLS[number], "position": [round(v, 8) for v in cartesian], "fractional": [round(v, 8) for v in fractional]})
    counts = Counter(atom["element"] for atom in atoms)
    formula = "".join(symbol + (str(counts[symbol]) if counts[symbol] > 1 else "") for symbol in sorted(counts))
    assert formula == entry["formula"], (entry["id"], formula, entry["formula"])
    assert sorted(counts) == sorted(entry["elements"])
    bonds = []
    for i, j in itertools.combinations(range(len(atoms)), 2):
        cutoff = CUTOFFS.get(tuple(sorted((atoms[i]["element"], atoms[j]["element"]))))
        distance = norm([x - y for x, y in zip(atoms[i]["position"], atoms[j]["position"])])
        if cutoff and .5 < distance <= cutoff:
            bonds.append([i, j])
    corners = [[sum(fractional[i] * cell[i][j] for i in range(3)) for j in range(3)] for fractional in itertools.product((0, 1), repeat=3)]
    edges = [[i, j] for i, j in itertools.combinations(range(8), 2) if (i ^ j).bit_count() == 1]
    angles = [math.degrees(math.acos(max(-1, min(1, dot(x, y) / (norm(x) * norm(y)))))) for x, y in ((b, c), (a, c), (a, b))]
    print(f"{entry['id']}: {formula}, {len(atoms)} atoms, {len(bonds)} in-cell neighbour contacts")
    return {
        "id": entry["id"], "formula": formula, "cell": cell,
        "cellLengths": [round(norm(axis), 5) for axis in cell], "cellAngles": [round(angle, 4) for angle in angles],
        "atoms": atoms, "bonds": bonds, "corners": corners, "edges": edges,
        "source": SOURCE.name, "sourceRow": key,
        "sourceRowSha256": hashlib.sha256(row["numbers"] + row["positions"] + row["cell"]).hexdigest(),
        "display": "Original ASE cell and atomic coordinates, wrapped into one cell. Lines are in-cell distance-based neighbour contacts; display sphere sizes are illustrative."
    }


def main():
    preview = (ROOT / "assets/science/gj-pdf-v1.js").read_text().split("window.gjPdfV1 = ", 1)[1].strip().removesuffix(";")
    entries = json.loads(preview)["examples"]
    with sqlite3.connect(SOURCE.resolve().as_uri() + "?mode=ro", uri=True) as connection:
        connection.row_factory = sqlite3.Row
        structures = [export_row(connection, entry) for entry in entries]
    output = ROOT / "assets/science/gj-pdf-structures.js"
    output.write_text("/* Generated from three matching ASE database rows; see tools/export-gj-pdf-structures.py. */\nwindow.gjPdfStructures = " + json.dumps(structures, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"Exported {output.relative_to(ROOT)} ({output.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
