# Elajme India — Launch Readiness & Growth Checklist

This checklist tracks the production launch and patient-acquisition phase without changing the approved master footer or Elajme-only enquiry routing.

## Locked rules
- All patient and consultation enquiries remain routed through Elajme India.
- English and Arabic master footer designs remain locked across mobile, tablet and desktop.
- Medical wording must describe Elajme India as a coordination/facilitation service; diagnosis and treatment decisions remain with qualified hospitals and doctors.
- No guarantee of treatment outcome, visa approval, hospital acceptance, or final treatment cost.

## Phase 1 — Technical launch QA
- [x] Run repository-wide HTML/link/image/metadata/accessibility QA.
- [x] Confirm English and Arabic canonical + hreflang pairs.
- [x] Confirm sitemap.xml and robots.txt.
- [ ] Check mobile navigation, enquiry form and WhatsApp flow. Repository implementation has been audited: required-field and phone validation, accessible form status, mobile enquiry/WhatsApp conversion controls, EN/AR routing and Elajme-only WhatsApp handoff are present. A real-device/browser visual interaction test is still required before this item can be closed.
- [x] Check treatment → hospital/doctor → enquiry journey. All nine treatment pathways have been reviewed for relevant discovery links, cautious medical wording and Elajme-only consultation routing.
- [x] Verify no direct hospital/doctor consultation CTA bypasses Elajme India.

## Phase 2 — Performance
- [ ] Compress oversized banner, logo, hospital and doctor imagery. Most active heavy assets have been optimized. Remaining large legacy/original hospital assets must only be changed through a binary-safe image workflow; they are not blockers for the lightweight Saudi/UAE paid-traffic country pages.
- [x] Prefer WebP/AVIF where browser-safe and retain suitable fallbacks where needed.
- [x] Preserve lazy loading for below-the-fold imagery.
- [x] Avoid lazy loading the primary above-the-fold/LCP image.
- [ ] Recheck mobile layout after image changes. Real-device/browser visual verification remains required.

## Phase 3 — Measurement
- [x] Connect Google Search Console and verify elajmeindia.com.
- [x] Submit sitemap.xml.
- [x] Configure GA4.
- [x] Track enquiry-form submissions and WhatsApp clicks as conversions. WhatsApp enquiry event verified in GA4 Realtime.
- [x] Capture standard UTM campaign/source parameters on tracked conversion events without sending patient-identifying or medical data to GA4.
- [x] Persist standard UTM attribution during the visitor session so a conversion on a later Elajme page can retain the campaign source.
- [x] Normalize traffic source as campaign source where present, otherwise referral/direct, without storing patient-identifying or medical information.

## Phase 4 — GCC organic acquisition
- [x] Strengthen Saudi Arabia landing page.
- [x] Audit UAE English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Oman English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Qatar English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Kuwait English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Bahrain English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Expand Arabic search-intent coverage without unsupported medical claims. The six GCC Arabic country pages already target country-specific treatment-in-India intent and cover pre-travel report review, remote consultation where available, hospital cost estimates, travel/visa coordination and cautious medical limitations.
- [ ] Improve internal linking between GCC, treatment, hospital and doctor pages. English GCC country pages link directly to all nine treatment categories. Arabic GCC pages already link to the Arabic treatment, hospital and doctor directories and core patient resources; direct individual Arabic treatment links remain pending a footer-safe editing path.

### GCC search-intent expansion priorities
Use existing country and treatment pages as the primary landing architecture. Avoid thin duplicate country-treatment pages until Search Console data shows enough distinct demand.

Priority English themes:
- treatment in India for Saudi/UAE/Oman/Qatar/Kuwait/Bahrain patients
- hospital and specialist review in India before travel
- online consultation before travelling to India
- treatment cost estimate from an Indian hospital
- medical visa and international patient journey guidance

Priority Arabic themes:
- العلاج في الهند للمرضى من السعودية / الإمارات / عُمان / قطر / الكويت / البحرين
- مراجعة التقارير الطبية قبل السفر إلى الهند
- استشارة طبيب في الهند عن بُعد قبل السفر
- تقدير تكلفة العلاج في الهند من المستشفى
- خطوات رحلة العلاج والتأشيرة الطبية إلى الهند

## Phase 5 — Paid acquisition & lead generation
- [x] Prepare Google Search campaign landing journeys for Saudi Arabia, UAE, Oman, Qatar, Kuwait and Bahrain.
- [x] Prepare country/treatment search campaign structures covering the nine established treatment categories, bilingual intent, negative-keyword principles and privacy-safe UTM conventions.
- [x] Prepare Meta/Facebook/Instagram → WhatsApp GCC acquisition architecture.
- [x] Prepare Saudi Arabia + UAE Meta launch pack with bilingual messaging, treatment creative themes, campaign naming, WhatsApp opening-message framework and landing-page mapping.
- [x] Audit Saudi Arabia and UAE paid-traffic landing-page code for mobile viewport, country SEO, EN/AR routing, nine-treatment discovery, cautious medical wording and Elajme-only enquiry routing.
- [ ] Complete real-device paid-traffic conversion test: open representative Google/Meta campaign URL on mobile, verify page rendering, language switch, enquiry interaction, WhatsApp handoff and expected GA4 attribution.
- [x] Define qualified-lead fields: country, treatment/specialty need, reports available, preferred language and source/campaign where available.
- [x] Document lead follow-up stages, ownership, next-follow-up discipline and operational KPIs.
- [ ] Connect and actively use a secured private CRM or equivalent private lead-management system for patient-identifying/medical coordination data. GA4 must remain free of patient names, phone numbers, diagnoses, reports and message text.
- [x] Build hospital/doctor partnership outreach pipeline. Actual partner relationships must only be represented after they are confirmed.

## Final pre-spend gate
Do not scale paid advertising until these are confirmed on a real mobile browser:
1. Saudi and UAE representative campaign URLs load correctly with UTMs.
2. English/Arabic destination and language switching behave correctly.
3. Primary enquiry CTA reaches the Elajme enquiry journey.
4. WhatsApp handoff uses only Elajme India (+91 74889 55154).
5. `whatsapp_enquiry` and/or `generate_lead` appears with expected campaign attribution in GA4 without PII/medical data.
6. No visual regression is present in the locked footer or mobile conversion controls.

## Primary KPI
Qualified international patient enquiries received and managed through Elajme India, with secondary KPIs for WhatsApp starts, enquiry submissions, organic impressions/clicks, conversion rate, source/campaign and qualified-lead rate.
