#!/usr/bin/env python3
"""Render a PowerPoint-exported PDF, then apply it after visual review."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[2]
PPT = ROOT / "assets/ganjiang-presentation-20260916.pptx"
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main"}


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True,
                          env={**os.environ, "LC_ALL": "C"}).stdout


def replace_once(pattern, replacement, text):
    result, count = re.subn(pattern, replacement, text)
    if count != 1:
        raise ValueError(f"Expected one HTML match for {pattern!r}, found {count}")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="PDF exported locally by PowerPoint")
    parser.add_argument("--apply", action="store_true",
                        help="Use the already rendered and visually reviewed preview")
    args = parser.parse_args()
    pdf = args.pdf.resolve()
    for tool in ("pdfinfo", "pdftoppm", "cwebp"):
        if not shutil.which(tool):
            raise ValueError(f"Missing required command: {tool}")
    with zipfile.ZipFile(PPT) as archive:
        presentation = ET.fromstring(archive.read("ppt/presentation.xml"))
    count = len(presentation.findall("p:sldIdLst/p:sldId", NS))
    size = presentation.find("p:sldSz", NS)
    if not count or abs(int(size.attrib["cx"]) / int(size.attrib["cy"]) - 16 / 9) > .001:
        raise ValueError("The website preview requires a nonempty 16:9 presentation")

    info = run("pdfinfo", "-f", "1", "-l", str(count), str(pdf))
    pages = re.search(r"^Pages:\s+(\d+)$", info, re.M)
    if not pages or int(pages[1]) != count:
        raise ValueError(f"PDF must contain all {count} slides, one slide per page")
    sizes = re.findall(r"^Page\s+\d+ size:\s+([\d.]+) x ([\d.]+) pts", info, re.M)
    rotations = re.findall(r"^Page\s+\d+ rot:\s+(-?\d+)", info, re.M)
    if len(sizes) != count or any(abs(float(w) / float(h) - 16 / 9) > .001 for w, h in sizes):
        raise ValueError("Every PDF page must be 16:9; export slides, not handouts")
    if len(rotations) != count or any(int(rotation) % 360 for rotation in rotations):
        raise ValueError("PDF pages must not be rotated")

    source = {"ppt_sha256": sha256(PPT), "pdf_sha256": sha256(pdf),
              "slide_count": count, "width": 1920, "height": 1080}
    version = f"native-{source['ppt_sha256'][:12]}-{source['pdf_sha256'][:12]}"
    build = ROOT / ".local-production" / version
    manifest_path = build / "manifest.json"

    if not args.apply:
        build.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=build) as temp:
            run("pdftoppm", "-png", "-scale-to-x", "1920", "-scale-to-y", "1080",
                str(pdf), str(Path(temp) / "slide"))
            pngs = sorted(Path(temp).glob("slide-*.png"),
                          key=lambda p: int(p.stem.split("-")[-1]))
            if len(pngs) != count:
                raise ValueError("PDF rendering did not produce all slides")
            images = {}
            for number, png in enumerate(pngs, 1):
                target = build / f"slide-{number:02}.webp"
                run("cwebp", "-quiet", "-lossless", "-z", "6", str(png), "-o", str(target))
                images[target.name] = sha256(target)
        if sha256(PPT) != source["ppt_sha256"] or sha256(pdf) != source["pdf_sha256"]:
            raise ValueError("Source changed while rendering; regenerate the preview")
        manifest_path.write_text(json.dumps({**source, "images": images}, indent=2) + "\n")
        print(f"Rendered {count} slides to {build}\nReview every image against PowerPoint, then rerun with --apply.")
        return

    manifest = json.loads(manifest_path.read_text())
    if any(manifest.get(key) != value for key, value in source.items()):
        raise ValueError("Source no longer matches the reviewed preview; regenerate it")
    expected = {f"slide-{number:02}.webp" for number in range(1, count + 1)}
    if set(manifest["images"]) != expected:
        raise ValueError("Preview manifest does not contain every slide")
    for name, checksum in manifest["images"].items():
        if sha256(build / name) != checksum:
            raise ValueError(f"Preview image changed: {name}; regenerate it")

    index = ROOT / "index.html"
    html = index.read_text()
    match = re.search(r'<section id="presentation"\s.*?</section>', html, re.S)
    if not match:
        raise ValueError("Could not find the presentation section")
    section = match[0]
    old_base = re.search(r'data-slide-base="([^"]+)"', section)[1]
    section = section.replace(old_base, f"assets/presentation/{version}/")
    section = replace_once(r'data-slide-count="\d+"', f'data-slide-count="{count}"', section)
    section = replace_once(r'第 1 页，共 \d+ 页', f'第 1 页，共 {count} 页', section)
    section = replace_once(r'>1 / \d+</span>', f'>1 / {count}</span>', section)
    section = replace_once(r'查看全部 \d+ 页', f'查看全部 {count} 页', section)
    html = html[:match.start()] + section + html[match.end():]
    destination = ROOT / "assets/presentation" / version
    destination.mkdir(exist_ok=True)
    for name in expected | {"manifest.json"}:
        shutil.copyfile(build / name, destination / name)
    temporary_index = index.with_suffix(".html.tmp")
    temporary_index.write_text(html)
    temporary_index.replace(index)
    print(f"Updated the local website to {version} ({count} slides). No deployment performed.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
