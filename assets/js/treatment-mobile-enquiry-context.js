/* Keep the sticky enquiry button aligned with the treatment page's main link. */
(() => {
  function init() {
    const sticky = document.querySelector('.elajme-bottom-enquiry');
    const source = document.querySelector('main a[data-enquiry-treatment]');
    if (!sticky || !source) return;
    sticky.setAttribute('href', source.getAttribute('href'));
    sticky.dataset.enquiryTreatment = source.dataset.enquiryTreatment;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
