/* Elajme India — privacy-conscious GA4 conversion tracking */
(function () {
  'use strict';

  const GA4_MEASUREMENT_ID = 'G-ZEKEN0TB2N';
  const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const ATTRIBUTION_KEY = 'elajme_campaign_attribution';
  const IS_MOBILE = !!(window.matchMedia && window.matchMedia('(max-width: 900px)').matches);

  /* Load the dedicated mobile-header stylesheet without modifying locked footer markup/styles. */
  if (!document.querySelector('link[data-elajme-mobile-header]')) {
    const mobileHeaderStyles = document.createElement('link');
    mobileHeaderStyles.rel = 'stylesheet';
    mobileHeaderStyles.href = '/assets/css/mobile-header-v2.css?v=16';
    mobileHeaderStyles.setAttribute('data-elajme-mobile-header', '');
    document.head.appendChild(mobileHeaderStyles);
    window.addEventListener('DOMContentLoaded', function () {
      if (mobileHeaderStyles.parentNode) mobileHeaderStyles.parentNode.appendChild(mobileHeaderStyles);
    });
  }

  if (IS_MOBILE) {
    window.Tawk_API = window.Tawk_API || {};
    const previousTawkOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function () {
      if (typeof previousTawkOnLoad === 'function') {
        try { previousTawkOnLoad(); } catch (e) {}
      }
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
        try { window.Tawk_API.hideWidget(); } catch (e) {}
      }
    };

    if (!document.querySelector('script[data-elajme-mobile-tawk]')) {
      const mobileTawk = document.createElement('script');
      mobileTawk.src = '/assets/js/mobile-tawk-launcher.js?v=2';
      mobileTawk.async = false;
      mobileTawk.setAttribute('data-elajme-mobile-tawk', '');
      document.head.appendChild(mobileTawk);
    }
    if (!document.querySelector('script[data-elajme-mobile-menu]')) {
      const mobileMenu = document.createElement('script');
      mobileMenu.src = '/assets/js/mobile-menu.js?v=1';
      mobileMenu.defer = true;
      mobileMenu.setAttribute('data-elajme-mobile-menu', '');
      document.head.appendChild(mobileMenu);
    }
  }

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

  function language() { return document.documentElement.lang === 'ar' ? 'ar' : 'en'; }
  function cleanCampaignValue(value) { return value ? String(value).trim().slice(0, 100) : ''; }

  function currentCampaignAttribution() {
    const params = new URLSearchParams(location.search);
    const attribution = {};
    CAMPAIGN_KEYS.forEach(function (key) {
      const value = cleanCampaignValue(params.get(key));
      if (value) attribution[key] = value;
    });
    return attribution;
  }

  function savedCampaignAttribution() {
    try {
      const value = sessionStorage.getItem(ATTRIBUTION_KEY);
      if (!value) return {};
      const parsed = JSON.parse(value);
      const attribution = {};
      CAMPAIGN_KEYS.forEach(function (key) {
        const clean = cleanCampaignValue(parsed && parsed[key]);
        if (clean) attribution[key] = clean;
      });
      return attribution;
    } catch (e) { return {}; }
  }

  function campaignAttribution() {
    const current = currentCampaignAttribution();
    if (Object.keys(current).length) {
      try { sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current)); } catch (e) {}
      return current;
    }
    return savedCampaignAttribution();
  }

  function trafficSource(attribution) {
    const source = cleanCampaignValue(attribution && attribution.utm_source).toLowerCase();
    const medium = cleanCampaignValue(attribution && attribution.utm_medium).toLowerCase();
    if (source) return source;
    if (medium) return medium;
    return document.referrer ? 'referral' : 'direct';
  }

  function track(name, params) {
    ensureGA4();
    const attribution = campaignAttribution();
    window.gtag('event', name, Object.assign({
      page_path: location.pathname,
      language: language(),
      traffic_source: trafficSource(attribution)
    }, attribution, params || {}));
  }

  ensureGA4();
  campaignAttribution();

  /* Delegated tracking catches present and dynamically-created WhatsApp links.
     Attribution is session-scoped and limited to standard UTM fields.
     No patient names, phone numbers, diagnoses, reports or message text are stored or sent. */
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
    generateLead: function (source) { track('generate_lead', { lead_source: source || 'website_enquiry' }); },
    campaignAttribution: campaignAttribution,
    trafficSource: function () { return trafficSource(campaignAttribution()); }
  };
})();
