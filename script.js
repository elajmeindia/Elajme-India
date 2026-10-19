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

document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach((element) => {
  const placeholder = element.getAttribute(`data-placeholder-${language}`);
  if (placeholder !== null) {
    element.setAttribute("placeholder", placeholder);
  }
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
// PATIENT ENQUIRY FORM → WHATSAPP

const patientEnquiryForm = document.getElementById("patientEnquiryForm");

if (patientEnquiryForm) {
  patientEnquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const patientName = document.getElementById("patientName").value.trim();
    const patientCountry = document.getElementById("patientCountry").value.trim();
    const patientAge = document.getElementById("patientAge").value.trim();
    const medicalNeed = document.getElementById("medicalNeed").value.trim();
    const preferredLanguage = document.getElementById("preferredLanguage").value;

    let message;

    if (preferredLanguage === "Arabic") {
      message =
        "السلام عليكم، أود الاستفسار عن تنسيق العلاج في الهند.\n\n" +
        "اسم المريض: " + patientName + "\n" +
        "الدولة: " + patientCountry + "\n" +
        (patientAge ? "العمر: " + patientAge + "\n" : "") +
        "العلاج المطلوب / الحالة الطبية: " + medicalNeed + "\n" +
        "اللغة المفضلة: العربية\n\n" +
        "يرجى توضيح الخطوات التالية.";
    } else {
      message =
        "Hello Elajme India,\n\n" +
        "I would like to enquire about treatment coordination in India.\n\n" +
        "Patient name: " + patientName + "\n" +
        "Country: " + patientCountry + "\n" +
        (patientAge ? "Age: " + patientAge + "\n" : "") +
        "Treatment / medical condition: " + medicalNeed + "\n" +
        "Preferred language: English\n\n" +
        "Please explain the next steps.";
    }

    const whatsappUrl =
      "https://wa.me/" +
      SITE_CONFIG.whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  });
}


// HIDE FLOATING WHATSAPP WHILE ENQUIRY FORM IS VISIBLE

const enquirySection = document.getElementById("enquiry");
const mobileWhatsApp = document.querySelector(".mobile-whatsapp");

if (enquirySection && mobileWhatsApp) {
  const enquiryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        mobileWhatsApp.classList.toggle(
          "hide-during-enquiry",
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.15
    }
  );

  enquiryObserver.observe(enquirySection);
}
