/* Normalize international phone inputs before opening a WhatsApp enquiry. */
window.normalizeEnquiryPhone = function (input) {
  const number = input.trim().replace(/[٠-٩۰-۹]/g, digit => {
    const code = digit.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
  if (!/^(?:\+|00)?[0-9\s()-]+$/.test(number)) return '';
  const compact = number.replace(/[\s()-]/g, '').replace(/^00/, '+');
  return /^\+?[1-9][0-9]{7,14}$/.test(compact) ? compact : '';
};
