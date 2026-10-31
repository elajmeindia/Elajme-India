# Elajme India — Meta / Instagram → WhatsApp GCC Acquisition Blueprint

Status: pre-launch campaign operating plan
Markets: Saudi Arabia, UAE, Oman, Qatar, Kuwait, Bahrain
Languages: Arabic first + English variants
Primary conversion: qualified international patient enquiry handled only by Elajme India

## Guardrails

- Elajme India is a patient-coordination/facilitation service. Do not present Elajme as the diagnosing or treating provider.
- Do not promise cure, treatment success, hospital acceptance, visa approval, exact savings or guaranteed prices.
- Avoid ad copy that asserts or implies sensitive personal health attributes about the viewer. Use neutral service-led wording such as “Explore treatment coordination in India” rather than “Are you suffering from cancer?”
- Medical reports, diagnoses, patient names, phone numbers and WhatsApp message text must never be sent to GA4 or advertising analytics.
- All consultation and patient-enquiry CTAs route through Elajme India, not directly to hospitals or doctors.

## Campaign architecture

### Campaign 1 — Saudi Arabia | Arabic | WhatsApp
Priority: highest
Destination: Arabic Saudi landing page, with Elajme WhatsApp as conversion path.
Creative themes:
1. Treatment coordination in India
2. Arabic-speaking patient support
3. Hospital and doctor coordination
4. Medical report review coordination
5. Travel and appointment planning support

### Campaign 2 — UAE | Arabic + English | WhatsApp
Priority: high
Use separate Arabic and English ad sets. Do not mix copy/language within one creative.

### Campaigns 3–6
- Oman — Arabic first
- Qatar — Arabic first
- Kuwait — Arabic first
- Bahrain — Arabic first

Start these only after Saudi/UAE creative and lead-quality benchmarks are established.

## Funnel

Ad impression → country landing page → treatment/hospital/doctor exploration → Start Enquiry / WhatsApp → Elajme intake → reports requested → case qualification → hospital/doctor coordination → response → consultation → travel planning.

Do not send cold traffic straight to individual doctor contact details.

## Audience testing

Run country-specific ad sets rather than one combined GCC audience.

Initial testing buckets:
- Broad adult audience in the selected country
- Arabic-language creative audience
- English-language creative audience where relevant
- Website-engagement retargeting only when consent/platform setup permits
- Qualified-lead lookalikes only after enough legitimate first-party conversion data exists

Do not construct health-condition audiences from patient medical information.

## Creative matrix

Test three formats per priority market:

### A. Trust / coordination static image
Headline EN: Medical Treatment Coordination in India
Headline AR: تنسيق العلاج في الهند
Body EN: Elajme India helps international patients coordinate hospital options, appointments and practical treatment planning in India. Speak with our patient coordination team on WhatsApp.
Body AR: تساعد علاج مي إنديا المرضى الدوليين في تنسيق خيارات المستشفيات والمواعيد والترتيبات العملية للعلاج في الهند. تواصل مع فريق تنسيق المرضى عبر واتساب.

### B. Patient journey carousel
Cards:
1. Share your enquiry with Elajme
2. Case coordination
3. Hospital/doctor options
4. Appointment planning
5. Travel support coordination

Arabic equivalent should be native RTL copy, not literal word-for-word translation.

### C. Short vertical video / Reel
15–25 seconds.
Sequence: India healthcare destination → Elajme coordination → hospitals/doctors → Arabic support → WhatsApp CTA.
No surgery footage, graphic medical imagery or outcome guarantees.

## Treatment creative clusters

Maintain separate creative sets for:
- Cancer care coordination
- Heart care
- Kidney transplant
- Liver transplant
- Knee replacement
- Neurosurgery
- Spine surgery
- Urology
- Gastroenterology

Use service-oriented wording. Never address the viewer as though Meta has identified their diagnosis.

## Landing routes

Country-intent campaigns:
- Saudi Arabia → /saudi-arabia/treatment-in-india/ or /ar/saudi-arabia/treatment-in-india/
- UAE → /uae/treatment-in-india/ or /ar/uae/treatment-in-india/
- Oman → /oman/treatment-in-india/ or /ar/oman/treatment-in-india/
- Qatar → /qatar/treatment-in-india/ or /ar/qatar/treatment-in-india/
- Kuwait → /kuwait/treatment-in-india/ or /ar/kuwait/treatment-in-india/
- Bahrain → /bahrain/treatment-in-india/ or /ar/bahrain/treatment-in-india/

Treatment-specific ads should use the corresponding treatment page when it produces a more relevant journey.

## UTM convention

Meta country campaign:
?utm_source=meta&utm_medium=paid_social&utm_campaign={country}_{language}_{theme}&utm_content={creative_name}

Examples:
?utm_source=meta&utm_medium=paid_social&utm_campaign=saudi_ar_treatment_coordination&utm_content=static_trust_01
?utm_source=instagram&utm_medium=paid_social&utm_campaign=uae_en_treatment_coordination&utm_content=reel_patient_journey_01

Never put patient information or medical details in UTM values.

## Conversion measurement

Primary:
- whatsapp_enquiry
- generate_lead

Business-quality measures outside GA4:
- qualified lead rate
- reports received rate
- case sent rate
- hospital response rate
- consultation rate
- travel-planning rate
- converted patient rate
- cost per qualified lead

Clicks and raw WhatsApp opens are not sufficient success metrics.

## WhatsApp intake

Initial automated/prefilled message should identify campaign context without including a diagnosis:

EN: Hello Elajme India. I would like assistance with treatment coordination in India. Please tell me how to share the case details/reports securely.

AR: السلام عليكم، أود الحصول على مساعدة من علاج مي إنديا لتنسيق العلاج في الهند. يرجى إرشادي إلى الطريقة المناسبة لمشاركة تفاصيل الحالة والتقارير بشكل آمن.

Elajme staff then collect only the information necessary for coordination.

## First 30-day rollout

Week 1:
- Saudi Arabic: 3 creative concepts
- UAE Arabic: 3 creative concepts
- UAE English: 2 creative concepts
- Verify UTMs and GA4 conversion events before spend scales

Week 2:
- Pause clearly weak creatives based on qualified-lead quality, not CTR alone
- Add one new creative variation to each winning ad set
- Review landing-page drop-off and WhatsApp enquiry quality

Week 3:
- If Saudi/UAE lead quality is acceptable, open Oman and Qatar tests
- Start limited retargeting only if tracking/consent setup is appropriate

Week 4:
- Add Kuwait and Bahrain tests if operational capacity allows
- Compare cost per qualified lead and downstream consultation rate by country
- Shift budget toward markets producing genuine case enquiries

## Pre-launch checklist

- [ ] Meta Business/Page/Instagram ownership confirmed
- [ ] WhatsApp Business number connected to the intended business account where applicable
- [ ] Saudi/UAE landing pages manually checked on mobile
- [ ] Arabic copy manually reviewed in RTL
- [ ] No personal-attribute medical wording in ad copy
- [ ] No guaranteed treatment/price/visa/outcome claims
- [ ] UTM values tested
- [ ] whatsapp_enquiry visible in GA4
- [ ] Lead follow-up pipeline ready
- [ ] Response owner assigned for Arabic WhatsApp leads
- [ ] Response-time target defined
- [ ] Privacy handling for reports and patient information documented

## Scale rule

Do not scale based on impressions, clicks or cheap WhatsApp starts alone. Scale a country/ad set when it repeatedly produces qualified cases that progress to reports received, hospital coordination and consultation stages.

## Footer protection

This marketing plan requires no footer changes. The approved English/Arabic footer remains SUPER LOCKED across mobile, tablet and desktop.