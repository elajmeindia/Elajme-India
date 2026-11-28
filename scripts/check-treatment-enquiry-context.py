#!/usr/bin/env python3
"""Validate all bilingual treatment-page enquiry links against their published routes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "sitemap.xml"

class EnquiryLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.header_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "header":
            self.header_depth += 1
        if tag.lower() != "a" or self.header_depth:
            return
        attributes = dict(attrs)
        href = attributes.get("href", "")
        if urlsplit(href).fragment == "enquiry":
            self.links.append((href, attributes.get("data-enquiry-treatment")))

    def handle_endtag(self, tag):
        if tag.lower() == "header" and self.header_depth:
            self.header_depth -= 1

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
    for slug in sorted(slugs):
        for lang in ("en", "ar"):
            path = pages.get((lang, slug))
            if path is None or not path.is_file():
                errors.append(f"Missing {lang} treatment page: {slug}")
                continue
            parser = EnquiryLinks()
            parser.feed(path.read_text(encoding="utf-8"))
            if not parser.links:
                errors.append(f"No enquiry links: {path.relative_to(ROOT)}")
            for href, context in parser.links:
                parsed = urlsplit(href)
                expected_path = "/ar/" if lang == "ar" else "/"
                if parsed.scheme or parsed.netloc or parsed.path != expected_path or parsed.query or context != slug:
                    errors.append(f"Invalid treatment context in {path.relative_to(ROOT)}: {href}")
    if errors:
        print("\n".join(errors))
        return 1
    print(f"PASS: {len(slugs)} specialties, {len(pages)} bilingual pages, all enquiry links validated without URL context")
    return 0

if __name__ == "__main__":
    sys.exit(main())
