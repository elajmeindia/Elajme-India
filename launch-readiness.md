# Elajme India — Launch Readiness & Growth Checklist

This checklist tracks the production launch and patient-acquisition phase without changing the approved master footer or Elajme-only enquiry routing.

## Locked rules
- All patient and consultation enquiries remain routed through Elajme India.
- English and Arabic master footer designs remain locked.
- Medical wording must describe Elajme India as a coordination/facilitation service; diagnosis and treatment decisions remain with qualified hospitals and doctors.
- No guarantee of treatment outcome, visa approval, hospital acceptance, or final treatment cost.

## Phase 1 — Technical launch QA
- [x] Run repository-wide HTML/link/image/metadata/accessibility QA.
- [x] Confirm English and Arabic canonical + hreflang pairs.
- [x] Confirm sitemap.xml and robots.txt.
- [ ] Check mobile navigation, enquiry form and WhatsApp flow.
- [ ] Check treatment → hospital/doctor → enquiry journey.
- [x] Verify no direct hospital/doctor consultation CTA bypasses Elajme India.

## Phase 2 — Performance
- [ ] Compress oversized banner, logo, hospital and doctor imagery. Most active heavy assets have been optimized; one known hospital WebP remains above the target threshold.
- [x] Prefer WebP/AVIF where browser-safe and retain suitable fallbacks where needed.
- [x] Preserve lazy loading for below-the-fold imagery.
- [x] Avoid lazy loading the primary above-the-fold/LCP image.
- [ ] Recheck mobile layout after image changes.

## Phase 3 — Measurement
- [x] Connect Google Search Console and verify elajmeindia.com.
- [x] Submit sitemap.xml.
- [x] Configure GA4.
- [x] Track enquiry-form submissions and WhatsApp clicks as conversions. WhatsApp enquiry event verified in GA4 Realtime.
- [x] Capture standard UTM campaign/source parameters on tracked conversion events without sending patient-identifying or medical data to GA4.

## Phase 4 — GCC organic acquisition
- [x] Strengthen Saudi Arabia landing page.
- [x] Audit UAE English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Oman English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Qatar English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Kuwait English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [x] Audit Bahrain English and Arabic landing pages; existing pages already meet the current SEO, safety and conversion baseline.
- [ ] Expand Arabic search-intent coverage without unsupported medical claims.
- [ ] Improve internal linking between GCC, treatment, hospital and doctor pages. English GCC country pages now link directly to all nine treatment categories; Arabic expansion remains pending a footer-safe editing path.

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

Internal-linking rule for the next implementation pass:
- GCC country page → treatment directory + relevant treatment pages + hospital directory + doctor directory + patient guide + medical visa.
- Treatment page → relevant hospital/doctor discovery + international-patient journey + Elajme enquiry.
- Hospital/doctor page → relevant treatment information + Elajme enquiry only.
- Arabic pages should link to Arabic destinations wherever an equivalent page exists.

## Phase 5 — Lead generation
- [ ] Prepare Google Search campaign landing journeys.
- [ ] Prepare Meta/WhatsApp campaign journeys.
- [x] Define qualified-lead fields: country, treatment need, diagnosis if known, reports available, preferred language.
- [ ] Establish lead-source and follow-up tracking.
- [ ] Build hospital/doctor partnership outreach pipeline.

### Qualified lead definition
A qualified international patient enquiry should capture, where voluntarily provided and appropriate for coordination: country, treatment need/medical specialty, diagnosis if known, whether medical reports are available, and preferred communication language. Sensitive medical or identifying information must not be sent to GA4.

## Primary KPI
Qualified international patient enquiries received and managed through Elajme India, with secondary KPIs for WhatsApp starts, enquiry submissions, organic impressions/clicks, conversion rate and qualified-lead rate.
