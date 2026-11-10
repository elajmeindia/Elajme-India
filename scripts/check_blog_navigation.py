#!/usr/bin/env python3
"""Guard the approved bilingual Blog navigation on the four primary entry pages."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    "index.html": ("/blog/", "Blog"),
    "blog/index.html": ("/blog/", "Blog"),
    "ar/index.html": ("/ar/blog/", "المدونة"),
    "ar/blog/index.html": ("/ar/blog/", "المدونة"),
}

def check_page(path, href, label):
    html = (ROOT / path).read_text(encoding="utf-8")
    nav = re.search(r'<nav\b[^>]*class=["\'][^"\']*\bmaster-nav\b[^"\']*["\'][^>]*>(.*?)</nav>', html, re.S)
    if not nav:
        return f"{path}: missing master-nav"
    links = re.findall(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', nav.group(1), re.S)
    matches = [(url, re.sub(r'<[^>]+>', '', text).strip()) for url, text in links if url == href]
    if len(matches) != 1 or matches[0][1] != label:
        return f"{path}: expected exactly one {label!r} link to {href!r}"
    return None

errors = [error for path, (href, label) in PAGES.items() if (error := check_page(path, href, label))]
if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print("PASS: Blog navigation is present on all four EN/AR entry pages.")
