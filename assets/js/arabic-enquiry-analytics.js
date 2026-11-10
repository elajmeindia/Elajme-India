/* Arabic homepage: privacy-conscious GA4 handoff-intent measurement. No patient data. */
(function () {
  'use strict';
  const id = 'G-ZEKEN0TB2N';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (!window.__elajmeGaConfigured) {
    window.gtag('js', new Date());
    window.gtag('config', id);
    window.__elajmeGaConfigured = true;
  }
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + id + '"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  const form = document.getElementById('patientEnquiryForm');
  if (form) form.addEventListener('submit', function () {
    const name = document.getElementById('patientName');
    const country = document.getElementById('patientCountry');
    const mobile = document.getElementById('patientMobile');
    const number = mobile && mobile.value.trim();
    if (!name || !name.value.trim() || !country || !country.value.trim() || !number ||
        !/^[+0-9][0-9\\s()\\-]{6,20}$/.test(number)) return;
    window.gtag('event', 'whatsapp_handoff_intent', {
      page_path: location.pathname,
      language: 'ar',
      lead_source: 'patient_enquiry_form'
    });
  });
})();
