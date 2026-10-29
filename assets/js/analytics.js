/* Elajme India — privacy-conscious GA4 conversion tracking */
(function () {
  'use strict';

  const GA4_MEASUREMENT_ID = 'G-ZEKEN0TB2N';
  const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function ensureGA4() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    if (!window.__elajmeGaConfigured) {
      window.gtag('js', new Date());
      window.gtag('config', GA4_MEASUREMENT_ID);
      window.__elajmeGaConfigured = true;
    }

    if (!document.querySelector('script[data-elajme-ga4],script[src*="googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID + '"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
      script.setAttribute('data-elajme-ga4', '');
      document.head.appendChild(script);
    }
  }

  function language() {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }

  function cleanCampaignValue(value) {
    if (!value) return '';
    return String(value).trim().slice(0, 100);
  }

  function campaignAttribution() {
    const params = new URLSearchParams(location.search);
    const attribution = {};

    CAMPAIGN_KEYS.forEach(function (key) {
      const value = cleanCampaignValue(params.get(key));
      if (value) attribution[key] = value;
    });

    return attribution;
  }

  function track(name, params) {
    ensureGA4();
    window.gtag('event', name, Object.assign({
      page_path: location.pathname,
      language: language()
    }, campaignAttribution(), params || {}));
  }

  ensureGA4();

  /* Delegated tracking catches present and dynamically-created WhatsApp links.
     Campaign parameters are limited to standard UTM attribution fields.
     No patient names, phone numbers, diagnoses, reports or message text are sent. */
  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/^(?:https?:\/\/)?(?:wa\.me\/|(?:www\.)?whatsapp\.com\/)/i.test(href)) {
      track('whatsapp_enquiry', { contact_method: 'whatsapp' });
    }
  }, true);

  window.ElajmeAnalytics = {
    track: track,
    generateLead: function (source) {
      track('generate_lead', { lead_source: source || 'website_enquiry' });
    },
    campaignAttribution: campaignAttribution
  };
})();
