#!/usr/bin/env python3
"""Read-only bilingual doctor/hospital profile audit. Run from any directory."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://elajmeindia.com"
CATEGORIES = ("doctors", "hospitals")

class Profile(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.dir = None
        self.canonical = None
        self.alternates = {}
        self.links = []
        self.images = []
        self.redirect = False
        self.redirect_target = None
        self.noindex = False
        self.h1 = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang, self.dir = a.get("lang"), a.get("dir")
        elif tag == "h1":
            self.h1 = True
        elif tag == "link":
            if a.get("rel") == "canonical": self.canonical = a.get("href")
            if a.get("rel") == "alternate" and a.get("hreflang"):
                self.alternates[a["hreflang"]] = a.get("href")
        elif tag == "a":
            self.links.append(a.get("href", ""))
        elif tag == "img":
            self.images.append((a.get("src", ""), a.get("alt", "")))
        elif tag == "meta":
            if a.get("http-equiv", "").lower() == "refresh":
                self.redirect = True
                value = a.get("content", "")
                if "url=" in value.lower():
                    self.redirect_target = value.split("=", 1)[1].strip().strip("'\\\"")
            if a.get("name", "").lower() == "robots" and "noindex" in a.get("content", "").lower():
                self.noindex = True

def audit():
    issues, counts = [], {"doctors": 0, "hospitals": 0, "redirects": 0, "doctor_placeholder_pages": 0}
    placeholders = []
    for category in CATEGORIES:
        english = ROOT / category
        arabic = ROOT / "ar" / category
        en_slugs = {p.name for p in english.iterdir() if (p / "index.html").is_file()}
        ar_slugs = {p.name for p in arabic.iterdir() if (p / "index.html").is_file()}
        for slug in sorted(en_slugs ^ ar_slugs):
            issues.append(f"{category}/{slug}: missing language counterpart")
        for slug in sorted(en_slugs & ar_slugs):
            pages = {}
            for lang, base in (("en", english), ("ar", arabic)):
                path = base / slug / "index.html"
                page = Profile()
                page.feed(path.read_text(encoding="utf-8"))
                pages[lang] = page
                rel = path.relative_to(ROOT)
                if page.lang != lang: issues.append(f"{rel}: wrong html language")
                if lang == "ar" and page.dir != "rtl": issues.append(f"{rel}: missing RTL direction")
                if page.redirect:
                    if not page.noindex: issues.append(f"{rel}: redirect missing noindex")
                    target_url = urlsplit(urljoin(f"{SITE}/{rel.parent.as_posix()}/", page.redirect_target or ""))
                    expected_prefix = f"/ar/{category}/" if lang == "ar" else f"/{category}/"
                    target_path = unquote(target_url.path)
                    if not page.redirect_target or target_url.netloc != "elajmeindia.com" or not target_path.startswith(expected_prefix):
                        issues.append(f"{rel}: unsafe or wrong-language redirect {page.redirect_target!r}")
                    elif not (ROOT / target_path.lstrip("/") / "index.html").is_file():
                        issues.append(f"{rel}: redirect target missing {page.redirect_target!r}")
                    continue
                counts[category] += 1
                if not page.h1: issues.append(f"{rel}: missing h1")
                en_url = f"{SITE}/{category}/{slug}/"
                ar_url = f"{SITE}/ar/{category}/{slug}/"
                expected = ar_url if lang == "ar" else en_url
                if page.canonical != expected: issues.append(f"{rel}: incorrect canonical {page.canonical!r}")
                for key, url in (("en", en_url), ("ar", ar_url), ("x-default", en_url)):
                    if page.alternates.get(key) != url:
                        issues.append(f"{rel}: incorrect {key} hreflang")
                enquiry = "/ar/#enquiry" if lang == "ar" else "/#enquiry"
                if enquiry not in page.links: issues.append(f"{rel}: missing {enquiry} enquiry link")
                if not page.images: issues.append(f"{rel}: no images")
                if category == "doctors" and any("portrait-unavailable" in src for src, alt in page.images):
                    counts["doctor_placeholder_pages"] += 1
                    placeholders.append(str(rel))
                for src, alt in page.images:
                    parsed = urlsplit(src)
                    if not src: issues.append(f"{rel}: empty image source")
                    elif not parsed.scheme and not parsed.netloc:
                        page_url = f"{SITE}/{rel.parent.as_posix()}/"
                        resolved = urlsplit(urljoin(page_url, src))
                        if resolved.netloc != "elajmeindia.com":
                            continue
                        local = ROOT / unquote(resolved.path).lstrip("/")
                        if not local.is_file():
                            issues.append(f"{rel}: missing local image {src}")
            if pages["en"].redirect != pages["ar"].redirect:
                issues.append(f"{category}/{slug}: redirect status differs between languages")
            if pages["en"].redirect and pages["ar"].redirect:
                counts["redirects"] += 2
    print("Profile audit:", counts)
    for path in placeholders: print("PLACEHOLDER:", path)
    for issue in issues: print("ISSUE:", issue)
    print("Total issues:", len(issues))
    return 1 if issues else 0

if __name__ == "__main__":
    sys.exit(audit())
