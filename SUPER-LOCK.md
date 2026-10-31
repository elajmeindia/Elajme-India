# ELAJME INDIA — SITEWIDE SUPER LOCK

Status: **ACTIVE / PRODUCTION PROTECTION POLICY**

This policy protects the approved Elajme India production architecture while keeping medical, hospital, doctor, treatment, country and SEO content maintainable.

## Principle

Lock the production rules and approved shared UI. Do not freeze legitimate content updates.

## Tier 1 — Immutable without explicit owner approval

The following must not be changed by broad instructions such as “continue”, “improve”, “cleanup”, “optimize”, “fix bugs”, “update all pages”, or similar:

- `assets/css/footer-approved.css` and the approved English/Arabic footer behavior described in `FOOTER-LOCK.md`.
- Elajme India brand identity and production domain `https://elajmeindia.com/`.
- Primary patient enquiry ownership: treatment/consultation enquiries must route through Elajme India, not directly to a hospital or doctor.
- Production WhatsApp/phone identity unless the owner explicitly supplies a replacement.
- English/Arabic language architecture, including Arabic RTL behavior.
- Production canonical/hreflang model: English, Arabic and x-default counterparts where applicable.
- Safety rule against unsupported medical guarantees, outcomes, rankings, partnership/tie-up claims or fabricated doctor/hospital information.

## Tier 2 — Structurally protected

These may evolve only when the change preserves validation requirements:

- Header/navigation and language switching.
- Doctor, hospital, treatment and international-patient page structures.
- Enquiry forms and WhatsApp conversion flow.
- Shared CSS and responsive/mobile behavior.
- Sitemap, robots, canonical metadata, structured data and social metadata.
- Verified doctor/hospital image identity. Never replace an exact verified image with a generic or wrong person/place.

## Tier 3 — Maintainable content

The following are intentionally NOT frozen and may be updated when accurate:

- Doctor and hospital factual information.
- Treatment and country-page copy.
- SEO titles and descriptions.
- Images when a better exact verified source is available.
- Informational wording, accessibility text and translations.
- New pages and directory entries.

All such changes must still pass the production validation rules.

## Production gate

Before a production release is treated as approved, automated checks should verify as applicable:

1. Locked footer files remain unchanged unless explicitly authorized.
2. EN/AR page architecture and RTL/LTR rules remain valid.
3. Doctor/hospital/treatment consultation routes remain Elajme-owned.
4. Internal links and local assets resolve.
5. Canonical, hreflang, sitemap and robots rules remain valid.
6. Required title, description, H1, viewport and accessibility basics remain present.
7. No obvious placeholders or unsupported high-risk medical/trust claims are introduced.
8. Performance safeguards remain reasonable, including image loading/dimensions where known.
9. Production build/audit exits non-zero on a blocking failure.

## Deployment model

- `main` is the production branch.
- Prefer future development on non-production branches and review through Cloudflare Pages preview deployments before merging to `main`.
- Production domain cutover must occur only after the Cloudflare preview/deployment is verified.
- Do not add aggressive custom Cloudflare cache rules unless there is a specific tested need.
- Keep Git history as the rollback source of truth.

## Change control

A Tier 1 change requires an explicit owner instruction that clearly authorizes that specific protected change in the current request. General permission to continue development does not authorize it.

After an explicitly authorized protected change is completed and verified, the affected area returns automatically to SUPER LOCK status.

## Relationship to footer lock

`FOOTER-LOCK.md` remains the authoritative detailed policy for the approved footer. This sitewide policy adds protection around it and does not weaken or replace it.
