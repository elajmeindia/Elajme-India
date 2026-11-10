#!/usr/bin/env python3
"""Read-only bilingual treatment-directory checks. Run: python3 scripts/check_treatment_directory.py"""
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import urljoin, urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "treatments"
AR = ROOT / "ar" / "treatments"
LEGACY = {"orthopedic-treatment-india"}

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.lang = None
        self.has_main = False
        self.has_h1 = False
        self.has_canonical = False
        self.has_enquiry = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "main": self.has_main = True
        if tag == "h1": self.has_h1 = True
        if tag == "link" and a.get("rel") == "canonical": self.has_canonical = True
        if tag == "a":
            href = a.get("href", "")
            self.links.append(href)
            if href.endswith("#enquiry"): self.has_enquiry = True

def audit():
    issues = []
    en_slugs = {p.name for p in EN.iterdir() if (p / "index.html").is_file()}
    ar_slugs = {p.name for p in AR.iterdir() if (p / "index.html").is_file()}
    for slug in sorted((en_slugs ^ ar_slugs) - LEGACY):
        issues.append(f"Missing language counterpart: {slug}")
    checked = 0
    for slug in sorted(en_slugs & ar_slugs):
        if slug in LEGACY:
            continue  # Legacy EN redirect; AR counterpart is intentionally absent.
        for language, base in (("en", EN), ("ar", AR)):
            path = base / slug / "index.html"
            page = Page()
            page.feed(path.read_text(encoding="utf-8"))
            checked += 1
            if page.lang != language: issues.append(f"{path.relative_to(ROOT)}: expected html lang={language}")
            if not page.has_main or not page.has_h1: issues.append(f"{path.relative_to(ROOT)}: missing main or h1")
            if not page.has_canonical: issues.append(f"{path.relative_to(ROOT)}: missing canonical")
            if not page.has_enquiry: issues.append(f"{path.relative_to(ROOT)}: missing enquiry link")
            base_url = "https://elajmeindia.com/" + str(path.relative_to(ROOT).parent) + "/"
            for href in page.links:
                if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
                    continue
                resolved = urlsplit(urljoin(base_url, href))
                if resolved.netloc != "elajmeindia.com":
                    continue
                route = unquote(resolved.path)
                if not route.startswith("/") or ".." in Path(route).parts:
                    issues.append(f"{path.relative_to(ROOT)}: unsafe internal link {href}")
                    continue
                target = ROOT / route.lstrip("/")
                if not (target.is_file() or (target / "index.html").is_file()):
                    issues.append(f"{path.relative_to(ROOT)}: unresolved internal link {href}")
    print(f"Checked {checked} active treatment pages across {len(en_slugs)} EN directories and {len(ar_slugs)} AR directories.")
    for issue in issues: print("ISSUE:", issue)
    print(f"Total issues: {len(issues)}")
    return 1 if issues else 0

if __name__ == "__main__":
    sys.exit(audit())
