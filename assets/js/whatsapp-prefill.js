(() => {
  const destination = 'https://wa.me/917488955154';
  const english = 'Hello, I would like to enquire about treatment coordination services in India. Please contact me.';
  const arabic = 'مرحباً، أود الاستفسار عن خدمات تنسيق العلاج في الهند. يرجى التواصل معي.';
  const originalArabic = 'مرحبا، أود الاستفسار عن خدمات تنسيق العلاج في الهند. يرجى التواصل معي.';
  const messageUrl = message => destination + '?text=' + encodeURIComponent(message);

  document.addEventListener('DOMContentLoaded', () => {
    const language = document.documentElement.lang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    const genericUrl = messageUrl(language === 'ar' ? arabic : english);
    for (const link of document.querySelectorAll('a[href="' + destination + '"]')) {
      link.href = genericUrl;
    }

    if (!/^(?:\/ar)?\/[a-z-]+\/treatment-in-india\/$/.test(location.pathname)) return;
    const sticky = document.querySelector('.elajme-bottom-wa');
    if (!sticky || ![genericUrl, messageUrl(originalArabic)].includes(sticky.href)) return;
    const countryLink = [...document.querySelectorAll('main a[href^="' + destination + '?"]')]
      .find(link => ![genericUrl, messageUrl(originalArabic)].includes(link.href)
        && new URL(link.href).searchParams.get('text'));
    if (countryLink) sticky.href = countryLink.href;
  }, { once: true });
})();
