# SUPER LOCK — Approved Elajme India Footers

Status: **SUPER LOCKED / DO NOT EDIT WITHOUT EXPLICIT OWNER APPROVAL**

The current English and Arabic footer designs are approved production UI and must now be treated as immutable.

## Locked source and final approved state

- Canonical footer stylesheet: `assets/css/footer-approved.css`
- Final approved Arabic mobile footer layout includes:
  - brand/logo on its own top row
  - navigation links on a separate row below
  - two-column RTL mobile link layout
  - full-width divider
  - copyright aligned bottom-right
- Final approved English footer remains unchanged and includes its existing mobile two-column link layout.
- Final footer layout correction commit: `fc7f9ee99939bd0e19c63b092a30c8c42816f186`
- Final approved state visually confirmed by Shahzad Alam after deployment.

## Non-negotiable rule

Do **not** modify, replace, regenerate, normalize, restyle, resize, reposition, or inject CSS affecting either approved footer unless Shahzad Alam explicitly asks for a footer change in the current request.

This prohibition includes automated/sitewide cleanup scripts, QA workflows, page migrations, design refreshes, responsive refactors, CSS consolidation, RTL/LTR normalization, performance work, homepage redesigns, cache-busting changes that alter footer behavior, and any CSS selector capable of changing `.site-footer`, `.footer-wrap`, `.footer-top`, `.footer-brand`, `.footer-links`, `.footer-bottom`, `.footer-copy`, or their descendants.

## Locked English footer

Keep the currently approved English footer exactly as deployed, including its logo position, links, container width, spacing, divider, copyright placement, dark background height, responsive behavior, typography, and mobile two-column link structure.

## Locked Arabic footer

Keep the currently approved Arabic footer exactly as visually confirmed, including its RTL structure, logo/brand on the separate top row, two-column navigation links below it, container width, spacing, divider, bottom-right copyright placement, dark-background height, responsive behavior, and typography.

## Change-control requirement

Any future footer change requires an explicit instruction from Shahzad Alam that clearly authorizes changing the footer **in that current request**. General instructions such as “continue”, “improve the site”, “fix all bugs”, “fix design”, “make it professional”, “run QA”, “update all pages”, “optimize mobile”, or similar broad requests do **not** authorize footer changes.

Before any explicitly authorized footer edit, preserve the current approved version so it can be restored exactly. After that authorized task is complete, the footer returns automatically to SUPER LOCKED status.

## Verification requirement

For future repository work that could potentially affect shared CSS or page structure, verify that the footer stylesheet/markup has not changed before claiming the footer remained untouched. If a proposed automated change cannot guarantee preservation of the approved footer, it must refuse the footer-affecting change rather than proceed.
