# Elajme India: Phase 2 Cloudflare production handover

## Existing production is live
Phase 1 is already published at https://elajmeindia.com/ and has existing Google visibility. This is not a first launch. Do not change nameservers, DNS records, hosting providers, production branch, or canonical domain as part of routine Phase 2 quality checks.

## Verified repository configuration
- GitHub repository maintains the bilingual static site.
- Cloudflare Pages-compatible `_headers` specifies response security and cache behavior.
- Cloudflare Pages-compatible `_redirects` preserves selected canonical URLs and legacy SEO paths.
- `robots.txt` points to the production `sitemap.xml`.
- English and Arabic legal pages exist at `/privacy.html`, `/terms.html`, `/ar/privacy.html`, and `/ar/terms.html`.
- Current CI checks live EN/AR mobile navigation, patient enquiry routing, legal pages, security headers and a representative performance baseline.

## Configuration still requiring account-level confirmation
1. Determine whether Cloudflare Pages is the current origin or only the CDN/DNS layer. Repository files alone do not establish actual hosting architecture.
2. Record the current Pages project name, production branch, build command, output directory and custom domain mappings.
3. Verify DNS A/AAAA/CNAME and proxied status in Cloudflare, TLS mode, certificate validity, and any redirect/page/cache rules.
4. Verify Google Search Console ownership and existing sitemap coverage before any infrastructure changes.
5. Confirm GA4 events and UTM attribution using non-medical test data only.
6. Record a rollback path and obtain explicit approval before any change affecting production DNS or hosting.

## Safe release procedure
1. Keep the current production deployment intact while verifying Phase 2 CI results.
2. Run mobile and desktop enquiry tests without sending real patient data.
3. Compare representative English and Arabic pages, header/footer, privacy/terms and 404 behavior.
4. Measure Core Web Vitals separately with appropriate tools; CI navigation timings are diagnostic only.
5. Fix demonstrated defects with small, reversible commits and confirm the production deployment before the next change.

## Locked rules
- All enquiries continue only through Elajme India WhatsApp +91 74889 55154.
- Do not expose patient reports, names, diagnoses or contact details to analytics.
- Doctor and hospital directory edits are deferred.
- No unverified medical claims, treatment guarantees or hospital partnership assertions.
