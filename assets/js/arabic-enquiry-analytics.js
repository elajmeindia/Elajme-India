/* Arabic homepage: GA4 direct WhatsApp link measurement. No patient data. */
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
    if (!link || !/^https:\/\/wa\.me\/917488955154(?:[/?#]|$)/i.test(link.href)) return;
    window.gtag('event', 'whatsapp_enquiry_click', {
      contact_method: 'whatsapp',
      page_path: location.pathname,
      language: 'ar'
    });
  }, true);

})();
