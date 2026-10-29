# Elajme India — Lead Source & Follow-up Workflow

This document defines the operational framework for tracking international patient enquiries without storing patient records in the public website repository.

## Privacy boundary
- Never store actual patient names, phone numbers, email addresses, passport/identity details, diagnoses, medical reports, scans, prescriptions, WhatsApp message text or other sensitive patient data in this public GitHub repository.
- Never send those fields to GA4.
- Actual patient records and communications belong in an appropriately secured private CRM/workflow.
- Website analytics may use non-sensitive campaign/source metadata such as standard UTM parameters, page path, language and generic conversion method.

## Lead source taxonomy
Use one primary source for each enquiry:
- Organic Google
- Google Ads
- Meta Ads
- WhatsApp Direct
- Referral
- Hospital/Doctor Partner
- Other

Where available, preserve privacy-safe campaign attribution separately: source, medium, campaign, content and keyword theme. Never put patient or medical information into campaign labels.

## Recommended private lead fields
- Internal lead ID
- Enquiry received date/time
- Lead source
- Campaign/source metadata
- Country
- Preferred language
- Treatment need / medical specialty
- Reports available: Yes / No
- Assigned owner
- Current stage
- Last contact date
- Next follow-up date
- Outcome/status

Diagnosis details, report contents and patient identifiers should remain in secured patient records rather than analytics or this public repository.

## Follow-up stages
1. New Enquiry
2. Contacted
3. Awaiting Reports
4. Reports Received
5. Hospital Review
6. Consultation Scheduled
7. Consultation Completed
8. Treatment Planning
9. Travel Coordination
10. Converted
11. Closed / Lost

Use the stage that reflects the real status; do not advance a lead merely to improve conversion reporting.

## Operational follow-up discipline
- Review new enquiries promptly during operating hours.
- Every active lead should have an owner and a clear next action.
- When follow-up is required, record a next follow-up date rather than relying on memory.
- Keep patient-facing promises conditional on actual hospital/doctor availability and review.
- Do not promise treatment outcomes, visa approval, hospital acceptance, exact/final costs or appointment availability.
- Close inactive or unsuitable enquiries with a clear internal outcome instead of leaving them indefinitely open.

## Qualified lead definition
For business reporting, a qualified enquiry should normally have enough voluntarily provided information to identify:
- country
- treatment need / specialty
- preferred language
- whether relevant medical reports are available

A diagnosis may be recorded privately if voluntarily supplied and necessary for coordination, but it must not be sent to GA4 or stored in the public repository.

## Reporting KPIs
Review periodically:
- enquiries by source
- qualified enquiries by source
- qualified-lead rate
- stage conversion
- leads awaiting follow-up
- follow-up ageing
- conversions by source/campaign

The primary business KPI remains qualified international patient enquiries managed through Elajme India.

## CRM implementation target
When a private CRM is connected, map the fields and stages above into the CRM. The website should continue to route consultation enquiries through Elajme India; the CRM is an internal follow-up system, not a replacement for the website's patient-facing routing.

## Current implementation status
The website already captures privacy-safe standard UTM attribution on tracked conversion events. This document establishes the operating taxonomy and follow-up process. Full operational completion requires a secured private CRM or equivalent private lead-management system to be connected and actively used.