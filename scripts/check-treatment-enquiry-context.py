#!/usr/bin/env python3
"""Validate all bilingual treatment-page enquiry links against homepage allowlists."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "sitemap.xml"

class EnquiryLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "a":
            return
        attributes = dict(attrs)
        href = attributes.get("href", "")
        if urlsplit(href).fragment == "enquiry":
            self.links.append(href)

def main():
    xml = ET.parse(SITEMAP)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [node.text or "" for node in xml.findall(".//s:loc", ns)]
    pages = {}
    for url in urls:
        match = re.fullmatch(r"https://elajmeindia\.com/(ar/)?treatments/([a-z0-9-]+)/", url)
        if match:
            language = "ar" if match.group(1) else "en"
            pages[(language, match.group(2))] = ROOT / ("ar/" if language == "ar" else "") / "treatments" / match.group(2) / "index.html"

    slugs = {slug for _, slug in pages}
    errors = []
    if len(slugs) != 47 or len(pages) != 94:
        errors.append(f"Expected 47 specialties and 94 pages; found {len(slugs)} and {len(pages)}")
    en_source = (ROOT / "script.js").read_text(encoding="utf-8")
    ar_source = (ROOT / "ar/index.html").read_text(encoding="utf-8")
    for slug in sorted(slugs):
        if not re.search(r'["\\\']' + re.escape(slug) + r'["\\\']\\s*:', en_source):
            errors.append(f"English form mapping missing: {slug}")
        if not re.search(r'["\\\']' + re.escape(slug) + r'["\\\']\\s*:', ar_source):
            errors.append(f"Arabic form mapping missing: {slug}")
        for lang in ("en", "ar"):
            path = pages.get((lang, slug))
            if path is None or not path.is_file():
                errors.append(f"Missing {lang} treatment page: {slug}")
                continue
            parser = EnquiryLinks()
            parser.feed(path.read_text(encoding="utf-8"))
            if not parser.links:
                errors.append(f"No enquiry links: {path.relative_to(ROOT)}")
            for href in parser.links:
                parsed = urlsplit(href)
                expected_path = "/ar/" if lang == "ar" else "/"
                params = parse_qs(parsed.query, keep_blank_values=True)
                if parsed.scheme or parsed.netloc or parsed.path != expected_path or params != {"treatment": [slug]}:
                    errors.append(f"Invalid treatment context in {path.relative_to(ROOT)}: {href}")
    if errors:
        print("\\n".join(errors))
        return 1
    print(f"PASS: {len(slugs)} specialties, {len(pages)} bilingual pages, all enquiry links and form mappings validated")
    return 0

if __name__ == "__main__":
    sys.exit(main())
