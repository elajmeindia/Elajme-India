# Elajme India — Saudi Arabia Google Search Campaign Blueprint

Status: pre-launch campaign plan. This file does not activate ads or spend.

## Goal
Generate qualified patient enquiries from Saudi Arabia for treatment coordination in India, routed only through Elajme India.

Primary conversion: qualified enquiry / WhatsApp enquiry.
Secondary conversion: enquiry-form completion.

## Targeting
- Location: Saudi Arabia
- Languages: Arabic and English, separated where practical for ad relevance and reporting
- Network: Google Search only for initial validation
- Do not launch Display expansion during the first validation phase

## Landing-page routing
- General Saudi treatment intent → `/saudi-arabia/treatment-in-india/`
- Arabic general Saudi intent → `/ar/saudi-arabia/treatment-in-india/`
- Cancer intent → `/treatments/cancer-treatment-india/` or Arabic equivalent
- Heart intent → `/treatments/heart-treatment-india/` or Arabic equivalent
- Kidney transplant intent → `/treatments/kidney-transplant-india/` or Arabic equivalent
- Liver transplant intent → `/treatments/liver-transplant-india/` or Arabic equivalent
- Knee replacement intent → `/treatments/knee-replacement-india/` or Arabic equivalent
- Neurosurgery intent → `/treatments/neurosurgery-india/` or Arabic equivalent
- Spine intent → `/treatments/spine-surgery-india/` or Arabic equivalent
- Urology intent → `/treatments/urology-treatment-india/` or Arabic equivalent
- Gastroenterology intent → `/treatments/gastroenterology-treatment-india/` or Arabic equivalent

Do not send high-intent treatment searches to the generic homepage when a relevant treatment page exists.

## Campaign structure

### Campaign 1 — Saudi | General Treatment in India | Arabic
Intent themes:
- العلاج في الهند
- العلاج في الهند للسعوديين
- مستشفيات الهند للعلاج
- السفر للعلاج في الهند
- تنسيق العلاج في الهند

### Campaign 2 — Saudi | General Treatment in India | English
Intent themes:
- treatment in India from Saudi Arabia
- medical treatment in India for Saudi patients
- hospitals in India for Saudi patients
- medical travel India from Saudi Arabia
- treatment coordination India Saudi Arabia

### Campaigns 3–11 — Treatment-specific
Create separate ad groups/campaigns for:
1. Cancer
2. Heart
3. Kidney transplant
4. Liver transplant
5. Knee replacement
6. Neurosurgery
7. Spine surgery
8. Urology
9. Gastroenterology

Keep keywords tightly aligned with the corresponding landing page.

## Initial match strategy
Start conservatively with Exact and Phrase match. Expand only after reviewing real search-term data and qualified-lead quality.

## Negative keyword themes
Review before launch and maintain from Search Terms reports.

Exclude clearly irrelevant intent such as:
- jobs / career / vacancy / salary
- course / training / degree / university / study
- free / charity when no such program is offered
- medicine purchase / pharmacy / drug purchase
- wholesale / supplier / distributor
- PDF / book / research paper where clearly informational only
- veterinary / animal treatment

Do not blindly exclude informational terms if they can represent genuine patient research. Evaluate search terms by lead quality.

## Ad-message framework
Use factual coordination language only.

### Arabic themes
- تنسيق العلاج في الهند للمرضى من السعودية
- دعم عربي وإنجليزي لتنسيق مراجعة الحالة
- أرسل التقارير المتاحة لطلب مراجعة الحالة
- تنسيق المستشفى والمواعيد ومعلومات رحلة العلاج
- الاستفسارات عبر علاج مي إنديا

### English themes
- Treatment Coordination in India for Saudi Patients
- Arabic & English Patient Support
- Share Available Medical Reports for Case Coordination
- Hospital and Appointment Coordination in India
- Enquire Through Elajme India

Avoid claims such as “best doctor,” “guaranteed cure,” “100% success,” guaranteed hospital acceptance, guaranteed visa, guaranteed price, or guaranteed clinical outcome.

## Suggested CTA language
- Start Your Enquiry
- Share Available Reports
- Request Case Coordination
- ابدأ استفسارك
- أرسل التقارير المتاحة
- اطلب تنسيق مراجعة الحالة

## Tracking template
Use UTMs consistently.

Google general Arabic example:
`?utm_source=google&utm_medium=cpc&utm_campaign=saudi_general_ar&utm_content={adgroupid}&utm_term={keyword}`

Google treatment example:
`?utm_source=google&utm_medium=cpc&utm_campaign=saudi_cancer_en&utm_content={adgroupid}&utm_term={keyword}`

Do not put patient names, phone numbers, diagnoses, report contents, or other health information in URLs or analytics parameters.

## Conversion reporting
Measure:
- `whatsapp_enquiry`
- `generate_lead`
- campaign/source attribution
- qualified lead count in the operational lead pipeline
- cost per qualified lead once spend begins
- consultation progression
- case sent to hospital
- converted patient

Do not optimize solely for clicks or raw WhatsApp opens. Qualified international patient enquiries are the business KPI.

## Google Ads healthcare policy guardrails
Before launch, review the current Google Ads Healthcare and medicines policy for both the advertiser business model and every targeted location. Elajme India should be represented as a patient-coordination/facilitation service, not as a pharmacy, prescription-drug seller, diagnosing clinician, or entity promising treatment outcomes.

Avoid prescription-drug promotion and restricted drug terms unless the advertiser is genuinely eligible and appropriately certified. Do not promote speculative/experimental treatment in ways prohibited by Google policy.

Landing destinations must remain functional, crawlable, useful, easy to navigate, and consistent with the advertised destination.

## Pre-launch checklist
- [ ] Google Ads account/business verification completed if requested by Google
- [ ] Current healthcare policy reviewed for Saudi targeting and the offered service
- [ ] Final URLs load correctly on mobile and desktop from the target market
- [ ] Arabic ads route to Arabic pages; English ads route to English pages
- [ ] WhatsApp routes only to Elajme India
- [ ] Enquiry form works
- [ ] GA4 `whatsapp_enquiry` verified
- [ ] GA4 `generate_lead` verified
- [ ] UTMs visible in conversion attribution
- [ ] No PII or medical details sent to analytics
- [ ] No unsupported clinical, cost, visa, hospital-acceptance or outcome guarantees
- [ ] Negative keywords reviewed
- [ ] Search Terms report reviewed frequently during initial launch

## Initial optimization principle
Begin with a small, controlled Search campaign and prioritize high-intent queries. Expand budget, match types, countries, and treatment categories only after qualified-lead data demonstrates which searches produce useful patient enquiries.
