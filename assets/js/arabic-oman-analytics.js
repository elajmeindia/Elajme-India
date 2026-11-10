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
