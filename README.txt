# Elajme India — Bilingual International Patient Coordination Website

Elajme India is a responsive English/Arabic (RTL) static website for international patients considering treatment in India, with a focus on Arabic-speaking and GCC/MEA patients.

## Current website structure
- English and Arabic homepages
- Treatment pages
- Hospital directory and hospital profiles
- Doctor directory and doctor profiles
- International patient and country landing pages
- Patient Guide and Medical Visa guidance
- About and Contact pages
- Privacy Policy
- Terms & Medical Disclaimer
- Sitemap, robots.txt and custom 404 page

## Enquiry and communication flow
- Business phone / WhatsApp: +91 74889 55154
- Website enquiry forms prepare a case summary and continue the conversation through Elajme India.
- Consultation and coordination enquiries should remain routed through Elajme India rather than directly through doctor or hospital enquiry channels.
- Medical reports may be shared after contact through an agreed communication channel; the public static website does not provide a medical-report upload system.

## Medical and patient-safety positioning
- Elajme India provides healthcare facilitation and international patient coordination; it is not a hospital, clinic or medical provider.
- Diagnosis, treatment recommendations, clinical suitability and medical decisions remain with qualified healthcare professionals.
- Treatment costs and estimates can change after examination, investigations or changes in the treatment plan.
- Treatment outcomes, hospital acceptance and visa approval are not guaranteed.
- Website and WhatsApp coordination channels are not emergency medical services.

## Cloudflare deployment checklist
1. Preserve the canonical production domain: https://elajmeindia.com/
2. Preserve English and Arabic URL paths during deployment.
3. Preserve sitemap.xml, robots.txt, 404.html, privacy.html and terms.html.
4. Preserve directory-style URLs ending in `/`.
5. Confirm the business phone/WhatsApp number remains +91 74889 55154.
6. Test the enquiry form and WhatsApp continuation on desktop and mobile.
7. Test EN↔AR language switches and RTL presentation.
8. Verify internal links, images, CSS and JavaScript after deployment.
9. Keep HTTPS enabled and submit the production sitemap to search engines after launch.
10. Re-check hospital/doctor information periodically and avoid unsupported rankings, guarantees or claims.

## Hosting
The site is maintained in this GitHub repository and is intended for Cloudflare-based production deployment. The existing `_headers` file contains Cloudflare-compatible security and caching directives for the static site. The site does not require a backend for its current public pages.

## Important limitation
This repository does not include a CRM, patient login, secure medical-record portal or appointment-management backend. Any future collection or storage of sensitive medical documents should use an appropriately secured, consent-based system rather than a simple public web form.
