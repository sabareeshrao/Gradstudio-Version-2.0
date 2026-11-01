#!/usr/bin/env python3
"""Diagram-stage validation; run after cloning the repository.
Usage: python content-pipeline/02-diagrams/data-augmentation/render_check.py
Optional: pip install playwright && playwright install chromium
"""
import xml.etree.ElementTree as ET
from pathlib import Path
ROOT = Path(__file__).resolve().parent
IMAGES = ["hero.svg"] + [f"layer-{i}.svg" for i in range(1, 8)]
SVG_NS = "{http://www.w3.org/2000/svg}"
for name in IMAGES:
    path = ROOT / name
    root = ET.parse(path).getroot()
    assert root.tag == SVG_NS + "svg", f"{name}: wrong SVG root"
    assert root.attrib.get("viewBox") == "0 0 1000 430", f"{name}: wrong viewBox"
    assert root.attrib.get("role") == "img", f"{name}: inaccessible root"
    assert root.find(SVG_NS + "title") is not None, f"{name}: missing title"
    assert root.find(SVG_NS + "desc") is not None, f"{name}: missing description"
    ids = [el.attrib["id"] for el in root.iter() if "id" in el.attrib]
    assert len(ids) == len(set(ids)), f"{name}: duplicate IDs"
    print("XML PASS", name, len(ids), "unique SVG IDs")

assert (ROOT / "diagrams.css").is_file()
assert (ROOT / "preview.html").is_file()
print("Static artwork validation: 8/8 PASS")

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Visual inspection not run: install Playwright to take browser screenshots.")
else:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for name, width, height in [("desktop",1440,900),("mobile",390,844)]:
            page = browser.new_page(viewport={"width":width,"height":height}, device_scale_factor=1)
            issues = []
            page.on("pageerror", lambda e: issues.append(str(e)))
            page.goto((ROOT/"preview.html").as_uri(), wait_until="load")
            sizes = page.locator(".da-art img").evaluate_all(
              "(imgs) => imgs.map(i => ({ok:i.complete && i.naturalWidth > 0, width:i.naturalWidth, height:i.naturalHeight}))"
            )
            assert len(sizes) == 8 and all(x["ok"] for x in sizes), sizes
            assert not issues, issues
            assert page.locator(".da-art").count() == 8
            outfile = ROOT / f"qa-{name}.png"
            page.screenshot(path=str(outfile), full_page=True)
            print("BROWSER LOAD PASS", name, "screenshot", outfile.name)
            page.close()
        browser.close()
    print("IMPORTANT: Human visual inspection of screenshots is still required.")
