# Elajme India — Paid Campaign Landing Journey Plan

This file defines the production-safe paid acquisition routes for Google Search, Meta and WhatsApp campaigns. It does not alter the approved site footer.

## Measurement rules

- GA4 measurement: `G-ZEKEN0TB2N`
- Standard attribution parameters: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Attribution persists for the visitor's browser session through `assets/js/analytics.js`.
- Conversion events: `whatsapp_enquiry` and `generate_lead`.
- Never send patient names, phone numbers, diagnoses, medical reports or WhatsApp message text to GA4.

## Google Search

Use country pages for broad medical-tourism searches and treatment pages for treatment-specific searches.

### Country-intent landing routes

| Market | English | Arabic |
| --- | --- | --- |
| Saudi Arabia | `/saudi-arabia/treatment-in-india/` | `/ar/saudi-arabia/treatment-in-india/` |
| UAE | `/uae/treatment-in-india/` | `/ar/uae/treatment-in-india/` |
| Oman | `/oman/treatment-in-india/` | `/ar/oman/treatment-in-india/` |
| Qatar | `/qatar/treatment-in-india/` | `/ar/qatar/treatment-in-india/` |
| Kuwait | `/kuwait/treatment-in-india/` | `/ar/kuwait/treatment-in-india/` |
| Bahrain | `/bahrain/treatment-in-india/` | `/ar/bahrain/treatment-in-india/` |

### Treatment-intent landing routes

- Cancer: `/treatments/cancer-treatment-india/` and `/ar/treatments/cancer-treatment-india/`
- Heart: `/treatments/heart-treatment-india/` and `/ar/treatments/heart-treatment-india/`
- Kidney transplant: `/treatments/kidney-transplant-india/` and `/ar/treatments/kidney-transplant-india/`
- Liver transplant: `/treatments/liver-transplant-india/` and `/ar/treatments/liver-transplant-india/`
- Knee replacement: `/treatments/knee-replacement-india/` and `/ar/treatments/knee-replacement-india/`
- Neurosurgery: `/treatments/neurosurgery-india/` and `/ar/treatments/neurosurgery-india/`
- Spine surgery: `/treatments/spine-surgery-india/` and `/ar/treatments/spine-surgery-india/`
- Urology: `/treatments/urology-india/` and `/ar/treatments/urology-india/`
- Gastroenterology: `/treatments/gastroenterology-india/` and `/ar/treatments/gastroenterology-india/`

### Recommended Google UTM convention

`?utm_source=google&utm_medium=cpc&utm_campaign={market}_{treatment_or_general}&utm_content={ad_group}&utm_term={keyword}`

Examples:

- Saudi general: `/ar/saudi-arabia/treatment-in-india/?utm_source=google&utm_medium=cpc&utm_campaign=saudi_general&utm_content=arabic_search`
- UAE cancer: `/ar/treatments/cancer-treatment-india/?utm_source=google&utm_medium=cpc&utm_campaign=uae_cancer&utm_content=arabic_search`

Do not put patient information in UTM parameters.

## Meta / Facebook / Instagram

For broad country awareness campaigns, use the matching country landing page. For treatment-specific creatives, use the matching treatment page.

Recommended UTM convention:

`?utm_source=meta&utm_medium=paid_social&utm_campaign={market}_{treatment_or_general}&utm_content={creative_name}`

Example:

`/ar/saudi-arabia/treatment-in-india/?utm_source=meta&utm_medium=paid_social&utm_campaign=saudi_general&utm_content=arabic_video_01`

## WhatsApp campaign journeys

All website WhatsApp CTAs must continue to route only to Elajme India at `+91 74889 55154`. Do not send campaign traffic to a hospital or doctor's direct consultation channel.

Recommended paid-click flow:

1. Ad or search result
2. Relevant Elajme India country/treatment page
3. Patient reviews coordination information
4. Patient starts enquiry or WhatsApp contact through Elajme India
5. `whatsapp_enquiry` / `generate_lead` records the non-PII campaign attribution
6. Elajme India handles follow-up and hospital/doctor coordination

## Campaign launch checklist

- Match ad language to landing-page language.
- Match treatment-specific keywords/creative to the treatment page rather than the generic homepage.
- Use country pages for broad searches such as treatment in India from Saudi Arabia/UAE/Oman/Qatar/Kuwait/Bahrain.
- Keep clinical claims cautious and do not promise outcomes, acceptance, cost or visa approval.
- Test the final URL including UTM parameters before activating each campaign.
- Test Start Enquiry and WhatsApp on mobile.
- Confirm GA4 Realtime receives the conversion event without PII.
- Use one stable campaign naming convention so lead quality can be compared by market and treatment.

## Next operational layer

The next acquisition task is a lead follow-up pipeline that records campaign/source, country, treatment category, enquiry stage, next follow-up date and outcome outside GA4. Medical details should remain in an appropriately controlled patient-management process and should not be placed in analytics event parameters.
