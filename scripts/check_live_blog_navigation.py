#!/usr/bin/env python3
"""Verify the production homepage headers actually contain the approved Blog links."""
import re
import sys
import urllib.request

PAGES = {
    "https://elajmeindia.com/": ("/blog/", "Blog"),
    "https://elajmeindia.com/ar/": ("/ar/blog/", "المدونة"),
}

errors = []
for url, (href, label) in PAGES.items():
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Elajme-Production-Check/1.0", "Cache-Control": "no-cache"})
        with urllib.request.urlopen(req, timeout=20) as response:
            html = response.read().decode("utf-8")
        nav = re.search(r'<nav\b[^>]*class=["\'][^"\']*\bmaster-nav\b[^"\']*["\'][^>]*>(.*?)</nav>', html, re.S)
        if not nav or not re.search(r'<a\b[^>]*href=["\']' + re.escape(href) + r'["\'][^>]*>\s*' + re.escape(label) + r'\s*</a>', nav.group(1)):
            errors.append(f"{url}: missing {label} link to {href} in live master navigation")
        else:
            print(f"PASS {url}: {label} -> {href}")
    except Exception as exc:
        errors.append(f"{url}: request failed: {exc}")
if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
