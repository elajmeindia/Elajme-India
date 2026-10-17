/*
  BEFORE PUBLISHING:
  1. Replace YOUR BRAND / YOUR BRAND NAME in index.html.
  2. Add your business WhatsApp number below in international format, digits only.
     Example: 919876543210 (do not include +, spaces, or dashes).
  3. Add your business email and real hospital partners only after confirming permission.
*/
const SITE_CONFIG = {
  brandName: "Elajme India",
  whatsappNumber: "917488955154"
};

const translations = {
  en: { lang: "en", dir: "ltr", toggle: "العربية" },
  ar: { lang: "ar", dir: "rtl", toggle: "English" }
};

let currentLanguage = "en";

function updateLanguage(language) {
  currentLanguage = language;
  const settings = translations[language];
  document.documentElement.lang = settings.lang;
  document.documentElement.dir = settings.dir;
  document.body.dir = settings.dir;
  document.getElementById("languageToggle").textContent = settings.toggle;

  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value !== null) element.innerHTML = value;
  });

  document.title = language === "ar"
    ? "العلاج في الهند | تنسيق المرضى باللغة العربية"
    : "Healthcare in India | Arabic Patient Coordination";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", language === "ar"
      ? "مساعدة باللغة العربية للمرضى الذين يبحثون عن العلاج في الهند، مع تنسيق الاستفسارات الطبية والمواعيد والسفر."
      : "Arabic-speaking support for patients exploring treatment in India. Coordinate hospital enquiries, medical opinions, appointments and travel arrangements.");
  }
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = makeWhatsAppUrl(language);
  });
}

function makeWhatsAppUrl(language) {
  const number = SITE_CONFIG.whatsappNumber;
  const message = language === "ar"
    ? "السلام عليكم، أود الاستفسار عن تنسيق العلاج في الهند. يرجى توضيح الخطوات التالية."
    : "Hello, I would like to enquire about coordinating treatment in India. Please explain the next steps.";
  if (!number || number.includes("REPLACE")) {
    return "https://wa.me/?text=" + encodeURIComponent(message);
  }
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}

document.getElementById("languageToggle").addEventListener("click", () => {
  updateLanguage(currentLanguage === "en" ? "ar" : "en");
});
document.getElementById("year").textContent = new Date().getFullYear();
updateLanguage("en");
