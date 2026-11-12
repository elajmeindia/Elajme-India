/* Arabic Oman landing page: anonymous GA4 WhatsApp handoff intent. */
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

  // Add a human-readable source marker only when Google Ads click identifiers exist.
  // Never place raw click identifiers or patient data in the WhatsApp message.
  const query = new URLSearchParams(window.location.search);
  const googleAdsVisit = ['gclid', 'gbraid', 'wbraid'].some(function (key) {
    return Boolean(query.get(key));
  });
  if (googleAdsVisit) {
    document.querySelectorAll('a[href^="https://wa.me/917488955154"]').forEach(function (link) {
      try {
        const url = new URL(link.href);
        const message = url.searchParams.get('text');
        const marker = 'رمز المصدر: إعلان جوجل - عُمان';
        if (!message || message.includes(marker)) return;
        url.searchParams.set('text', message + '\n\n' + marker);
        link.href = url.toString();
      } catch (_) {
        // Leave the original enquiry link untouched on any error.
      }
    });
  }
  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!/^https:\/\/wa\.me\/917488955154(?:[/?#]|$)/i.test(href)) return;
    // Never transmit the WhatsApp URL, prefilled message, or patient information.
    window.gtag('event', 'whatsapp_handoff_intent', {
      page_path: location.pathname,
      language: 'ar',
      lead_source: 'oman_landing_whatsapp'
    });
  }, true);
})();
