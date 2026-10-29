# Elajme India — Paid Campaign Landing Journeys

This plan defines privacy-safe, conversion-focused landing journeys for Google Search and Meta/WhatsApp campaigns without changing the approved master footer.

## Locked rules
- All patient and consultation enquiries route only through Elajme India.
- Elajme India coordinates/facilitates; qualified hospitals and doctors diagnose and treat.
- Do not promise treatment outcomes, hospital acceptance, visa approval, exact/final costs, or doctor availability.
- Do not send patient names, phone numbers, email addresses, diagnoses, reports, medical notes, WhatsApp message text, or other sensitive data to GA4.
- Use standard UTM parameters for campaign attribution.

## Google Search campaign journeys

### 1. GCC country-intent campaigns
Search intent examples:
- treatment in India from Saudi Arabia / UAE / Oman / Qatar / Kuwait / Bahrain
- hospital in India for international patients
- medical treatment in India for GCC patients
- Arabic support for treatment in India

Landing destinations:
- Saudi Arabia → `/saudi-arabia/treatment-in-india/`
- UAE → `/uae/treatment-in-india/`
- Oman → `/oman/treatment-in-india/`
- Qatar → `/qatar/treatment-in-india/`
- Kuwait → `/kuwait/treatment-in-india/`
- Bahrain → `/bahrain/treatment-in-india/`

Arabic campaigns should use the matching `/ar/.../treatment-in-india/` page.

Primary journey:
Ad → country landing page → treatment/hospital/doctor discovery → Elajme enquiry or WhatsApp → hospital/doctor coordination by Elajme.

### 2. Treatment-intent campaigns
Use the existing treatment pages rather than creating thin duplicate paid pages:
- Cancer → `/treatments/cancer-treatment-india/`
- Heart → `/treatments/heart-treatment-india/`
- Gastroenterology → `/treatments/gastroenterology-treatment-india/`
- Kidney Transplant → `/treatments/kidney-transplant-india/`
- Knee Replacement → `/treatments/knee-replacement-india/`
- Liver Transplant → `/treatments/liver-transplant-india/`
- Neurosurgery → `/treatments/neurosurgery-india/`
- Spine Surgery → `/treatments/spine-surgery-india/`
- Urology → `/treatments/urology-treatment-india/`

Primary journey:
Treatment search → relevant treatment page → verified hospital/doctor discovery → Elajme enquiry/WhatsApp.

### 3. Pre-travel consultation/review campaigns
Intent themes:
- doctor consultation in India before travel
- medical reports review before travelling to India
- online consultation with Indian hospital/doctor
- treatment cost estimate from hospital in India

Preferred landing architecture:
Country landing page for country-qualified searches; relevant treatment page for specialty-qualified searches. Do not create duplicate pages until Search Console and paid-search data demonstrate distinct demand.

## Google Ads URL attribution
Recommended parameters:
`utm_source=google&utm_medium=cpc&utm_campaign=<campaign>&utm_content=<ad-or-group>&utm_term=<keyword-theme>`

Use non-sensitive campaign labels only. The existing analytics module may attach these standard UTM values to conversion events. Never place patient or medical information in UTM values.

## Meta / WhatsApp campaign journeys

### 1. Country awareness and consideration
Ad creative → matching GCC country landing page → Elajme WhatsApp/enquiry.

Recommended source structure:
`utm_source=meta&utm_medium=paid_social&utm_campaign=<country-or-theme>&utm_content=<creative>`

### 2. Treatment-specific campaigns
Treatment creative → matching treatment page → hospital/doctor discovery → Elajme WhatsApp/enquiry.

### 3. Click-to-WhatsApp campaigns
Where Meta sends a user directly to WhatsApp, keep the opening message generic and privacy-conscious, for example asking the patient to state their country and treatment need. Do not prefill diagnoses, report details, identity numbers, or other sensitive medical information into campaign URLs.

## Conversion hierarchy
Primary conversion:
- Qualified international patient enquiry handled through Elajme India.

Website conversion signals:
- `whatsapp_enquiry`
- `generate_lead`

Supporting metrics:
- landing-page sessions
- treatment/hospital/doctor discovery engagement
- WhatsApp starts
- enquiry submissions
- qualified-lead rate
- campaign/source attribution

## Qualified lead handoff
After a website conversion, operational follow-up should record privately:
- lead ID
- enquiry date/time
- source/campaign
- country
- preferred language
- treatment need/specialty
- reports available: yes/no
- current follow-up stage
- next follow-up date

Diagnosis, reports, passport/identity information, phone/email and other sensitive patient information must remain in an appropriately secured private patient/CRM workflow, not GA4 or the public GitHub repository.

## Campaign launch gate
Before spending on ads:
1. Test each selected landing page on mobile.
2. Test the Elajme enquiry and WhatsApp handoff.
3. Open a test URL with UTM parameters and verify the conversion event without sensitive parameters.
4. Confirm the ad promise matches the landing page and avoids guarantees.
5. Start with a small country/treatment set, review qualified-lead quality, then expand.
