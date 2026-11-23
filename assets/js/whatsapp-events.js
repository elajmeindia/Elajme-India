(() => {
  const measurementId = 'G-ZEKEN0TB2N';
  const safePage = 'https://elajmeindia.com/';
  const language = document.documentElement.lang.toLowerCase().startsWith('ar') ? 'ar' : 'en';

  function record(event, source) {
    if (window['ga-disable-' + measurementId] || navigator.globalPrivacyControl === true) return;
    if (typeof window.gtag !== 'function') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: safePage,
        page_referrer: ''
      });
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.append(tag);
    }
    window.gtag('event', event, {
      send_to: measurementId,
      language,
      contact_method: 'whatsapp',
      lead_source: source,
      page_location: safePage,
      page_referrer: ''
    });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const destination = new URL(link.href);
    if (destination.origin === 'https://wa.me' && destination.pathname === '/917488955154') {
      record('whatsapp_enquiry_click', 'direct_link');
    }
  }, true);

  window.recordFaqWhatsAppHandoff = () => record('whatsapp_handoff_intent', 'faq_enquiry_form');
})();
