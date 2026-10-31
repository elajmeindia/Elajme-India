# Elajme India — Live End-to-End Launch Verification

Date: 2026-10-31

## Scope
Representative paid-traffic journeys for Saudi Arabia and UAE, including live-domain reachability, landing-page routing, language switching, enquiry/WhatsApp path, attribution readiness and final pre-spend status.

## Results

### 1. Live public-domain reachability
- Saudi landing URL tested: `https://elajmeindia.com/saudi-arabia/treatment-in-india/`
- UAE landing URL tested: `https://elajmeindia.com/uae/treatment-in-india/`
- External live-page retrieval from the available web-testing environment failed for both URLs.
- A fresh search-engine query also returned no result for the two exact country landing pages during this test.
- Therefore live production rendering, response status, redirects, visual mobile layout and interactive behavior cannot be marked verified from this run.

### 2. Repository-level implementation already verified
The current repository implementation has previously been checked for:
- Saudi and UAE country-specific landing-page structure.
- English/Arabic alternate routing.
- Elajme-only enquiry CTAs.
- Direct links to all nine English treatment categories.
- Hospital, doctor, patient-guide and medical-visa discovery routes.
- Cautious medical wording without outcome, cost, hospital-acceptance or visa guarantees.
- GA4 conversion events and privacy-safe UTM attribution implementation.

These are code-level checks only and must not be represented as live-browser verification.

### 3. Pre-spend gate
Status: **HOLD — live-domain verification required before paid traffic is launched.**

Do not spend on Google Ads or Meta campaigns until the following are confirmed in a normal browser on the production domain:
1. Saudi landing page loads successfully on mobile and desktop.
2. UAE landing page loads successfully on mobile and desktop.
3. Arabic switch opens the matching Arabic country page.
4. Start Enquiry reaches the Elajme enquiry form.
5. Form validation works and valid submission opens the Elajme India WhatsApp number only.
6. A tagged campaign URL retains/records source attribution through conversion.
7. GA4 receives `whatsapp_enquiry` and/or `generate_lead` from the production journey.
8. No visual regression is present in the approved locked footer.

## Safe manual test URLs
Use representative campaign parameters without patient information:

Saudi:
`https://elajmeindia.com/saudi-arabia/treatment-in-india/?utm_source=google&utm_medium=cpc&utm_campaign=saudi_general_test&utm_content=prelaunch`

UAE:
`https://elajmeindia.com/uae/treatment-in-india/?utm_source=meta&utm_medium=paid_social&utm_campaign=uae_general_test&utm_content=prelaunch`

Never place patient names, phone numbers, diagnoses, reports or other medical information in UTM parameters.

## Footer protection
No footer HTML, footer stylesheet or footer-affecting selector was changed as part of this verification.

## Next action
Resolve or independently verify production-domain accessibility first. Once the two URLs load in a normal browser, complete the eight-point pre-spend gate above and only then move campaign status from HOLD to READY.