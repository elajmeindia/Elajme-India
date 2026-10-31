# Elajme India — Saudi + UAE Paid-Traffic Conversion Readiness

Status: pre-launch audit completed
Markets: Saudi Arabia, United Arab Emirates
Channels: Google Search, Meta/Facebook/Instagram, WhatsApp
Primary conversion: qualified international patient enquiry managed through Elajme India

## Repository audit findings

### Saudi Arabia landing page
Route: `/saudi-arabia/treatment-in-india/`

Verified strengths:
- Mobile viewport is present.
- Saudi-specific title, description, canonical and EN/AR hreflang are present.
- Hero immediately explains Saudi-to-India patient coordination.
- Arabic and English communication support is stated.
- Primary CTA routes to the Elajme India enquiry journey.
- All nine priority treatment areas have direct contextual links.
- Hospital, doctor, patient-guide and medical-visa resources are linked.
- Medical wording is appropriately cautious: Elajme coordinates; medical teams diagnose/treat.
- No guarantee of medical outcome, hospital acceptance, final cost or visa approval.
- Phone and enquiry routes belong to Elajme India.

### UAE landing page
Route: `/uae/treatment-in-india/`

Verified strengths:
- Mobile viewport is present.
- UAE-specific title, description, canonical and EN/AR hreflang are present.
- Hero explains UAE-to-India coordination and Arabic/English support.
- Primary CTA routes to the Elajme India enquiry journey.
- All nine priority treatment areas have direct contextual links.
- Hospital, doctor, patient-guide and medical-visa resources are linked.
- Emergency disclaimer is present.
- Medical and cost wording is cautious and does not promise outcomes.
- Phone and enquiry routes belong to Elajme India.

## Conversion path

Paid ad → country landing page → relevant treatment information → Start/Request Enquiry → Elajme India enquiry form → WhatsApp continuation → lead follow-up pipeline.

For treatment-specific campaigns, use the relevant treatment page as the first landing page when intent is explicit. Use the country page for broader queries such as treatment in India from Saudi Arabia/UAE.

## Campaign attribution

Existing site analytics uses standard UTM fields and session-persistent attribution. Recommended parameters:

- `utm_source=google` / `facebook` / `instagram`
- `utm_medium=cpc` / `paid_social`
- `utm_campaign=<country>_<treatment>_<language>`
- `utm_content=<creative-or-ad-variant>`
- `utm_term=<keyword>` for search campaigns

Do not place patient names, phone numbers, diagnoses, report details or other medical information in UTMs, analytics event parameters or campaign names.

## Mobile pre-spend checklist

Before switching on paid campaigns, manually test on a real phone:

1. Landing page loads without horizontal overflow.
2. Header/navigation remains usable.
3. Arabic switch opens the correct corresponding Arabic route.
4. Hero CTA is visible and tappable.
5. Treatment links open the intended treatment pages.
6. Enquiry CTA reaches the Elajme India enquiry form.
7. Required enquiry fields validate correctly.
8. Continue-on-WhatsApp opens Elajme India's number only.
9. WhatsApp message contains useful case-routing context but analytics receives no medical/PII message content.
10. GA4 receives `generate_lead` / `whatsapp_enquiry` as applicable and preserves source/campaign attribution.
11. Back navigation does not lose the campaign journey.
12. Page remains readable on common Android/iPhone widths.

## Paid-traffic launch gate

Do not spend at scale until the real-device tests above pass. Start with a controlled Saudi + UAE test budget, evaluate qualified cases rather than raw clicks, and expand only after confirming:

- correct country/treatment routing;
- WhatsApp completion rate;
- qualified-lead rate;
- response speed;
- hospital-review progression;
- cost per qualified enquiry.

## Conversion-friction priorities

P0 — Must work before ads:
- Elajme-only enquiry/WhatsApp routing
- correct EN/AR route
- mobile CTA usability
- source/campaign attribution
- form validation

P1 — Optimize after initial traffic:
- hero message/ad-message match
- CTA wording by campaign intent
- treatment-page-to-enquiry transition
- mobile page speed and heavy imagery

P2 — Optimize with enough lead data:
- creative/ad variant quality
- country/treatment budget allocation
- remarketing only where platform policy and privacy rules permit

## Footer protection

The approved English and Arabic footers are SUPER LOCKED. This audit makes no footer changes and does not authorize future footer edits.
