/*
  Elajme India
  Website configuration and bilingual functionality
*/

const SITE_CONFIG = {
  brandName: "Elajme India",
  whatsappNumber: "917488955154"
};

const translations = {
  en: { lang: "en", dir: "ltr", toggle: "Arabic" },
  ar: { lang: "ar", dir: "rtl", toggle: "English" }
};

let currentLanguage = "en";

function updateLanguage(language) {
  currentLanguage = language;
  const settings = translations[language];

  document.documentElement.lang = settings.lang;
  document.documentElement.dir = settings.dir;
  document.body.dir = settings.dir;

  const languageToggle = document.getElementById("languageToggle");
  if (languageToggle) {
    languageToggle.textContent = settings.toggle;
    languageToggle.setAttribute(
      "aria-label",
      language === "ar" ? "Switch to English" : "Switch to Arabic"
    );
  }

  /* Keep the English view visually English-only while preserving the Arabic experience. */
  document.querySelectorAll(".brand-ar").forEach((element) => {
    element.style.display = language === "ar" ? "block" : "none";
  });
  document.querySelectorAll(".note-icon").forEach((element) => {
    element.textContent = language === "ar" ? "ع" : "EN";
  });

  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value !== null) element.innerHTML = value;
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach((element) => {
    const placeholder = element.getAttribute(`data-placeholder-${language}`);
    if (placeholder !== null) element.setAttribute("placeholder", placeholder);
  });

  document.title = language === "ar"
    ? "علاج مي إنديا | تنسيق علاج المرضى الدوليين في الهند"
    : "Elajme India | International Patient Coordination for Healthcare in India";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", language === "ar"
      ? "تدعم علاج مي إنديا المرضى الدوليين الباحثين عن العلاج في الهند، مع تنسيق المستشفيات والعلاج والسفر ودعم المرضى باللغتين العربية والإنجليزية."
      : "Elajme India supports international patients seeking treatment in India with hospital, treatment, travel and patient coordination in Arabic and English.");
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", language === "ar"
      ? "علاج مي إنديا | تنسيق علاج المرضى الدوليين في الهند"
      : "Elajme India | International Patient Coordination in India");
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", language === "ar"
      ? "دعم المرضى الدوليين الباحثين عن العلاج في الهند، مع تنسيق المستشفيات والسفر باللغتين العربية والإنجليزية."
      : "Support for international patients seeking treatment in India, with hospital and travel coordination in Arabic and English.");
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

const languageToggle = document.getElementById("languageToggle");
if (languageToggle) {
  languageToggle.addEventListener("click", () => updateLanguage(currentLanguage === "en" ? "ar" : "en"));
}

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
updateLanguage("en");

const patientEnquiryForm = document.getElementById("patientEnquiryForm");
if (patientEnquiryForm) {
  patientEnquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const patientName = document.getElementById("patientName").value.trim();
    const patientCountry = document.getElementById("patientCountry").value.trim();
    const patientAge = document.getElementById("patientAge").value.trim();
    const patientMobile = document.getElementById("patientMobile").value.trim();
    const medicalNeed = document.getElementById("medicalNeed").value.trim();
    const preferredLanguage = document.getElementById("preferredLanguage").value;
    let message;

    if (preferredLanguage === "Arabic") {
      message = "السلام عليكم، أود الاستفسار عن تنسيق العلاج في الهند.\n\n" +
        "اسم المريض: " + patientName + "\n" +
        "الدولة: " + patientCountry + "\n" +
        (patientAge ? "العمر: " + patientAge + "\n" : "") +
        "رقم الجوال / واتساب: " + patientMobile + "\n" +
        "العلاج المطلوب / الحالة الطبية: " + medicalNeed + "\n" +
        "اللغة المفضلة: العربية\n\n" +
        "يرجى توضيح الخطوات التالية. ويمكنني إرفاق التقارير الطبية ذات الصلة في هذه المحادثة.";
    } else {
      message = "Hello Elajme India,\n\nI would like to enquire about treatment coordination in India.\n\n" +
        "Patient name: " + patientName + "\n" +
        "Country: " + patientCountry + "\n" +
        (patientAge ? "Age: " + patientAge + "\n" : "") +
        "Mobile / WhatsApp: " + patientMobile + "\n" +
        "Treatment / medical condition: " + medicalNeed + "\n" +
        "Preferred language: English\n\n" +
        "Please explain the next steps. I can attach the relevant medical reports in this WhatsApp conversation.";
    }

    window.open("https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener");
  });
}

const enquirySection = document.getElementById("enquiry");
const mobileWhatsApp = document.querySelector(".mobile-whatsapp");
if (enquirySection && mobileWhatsApp) {
  const enquiryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => mobileWhatsApp.classList.toggle("hide-during-enquiry", entry.isIntersecting));
  }, { threshold: 0.15 });
  enquiryObserver.observe(enquirySection);
}

/* Treatment cards */
const treatmentPageLinks = {
  "Cancer Care": "treatments/cancer-treatment-india/",
  "Cardiac care": "treatments/heart-treatment-india/",
  "Orthopaedics and joints": "treatments/knee-replacement-india/",
  "Neurosciences": "treatments/neurosurgery-india/",
  "Urology and kidney care": "treatments/urology-treatment-india/",
  "Gastroenterology": "treatments/gastroenterology-treatment-india/"
};

Object.entries(treatmentPageLinks).forEach(([label, url]) => {
  const treatmentLabel = document.querySelector(`.treatment-card [data-en="${label}"]`);
  if (!treatmentLabel) return;
  const treatmentCard = treatmentLabel.closest(".treatment-card");
  if (!treatmentCard) return;
  treatmentCard.classList.remove("whatsapp-link");
  treatmentCard.href = url;
  treatmentCard.removeAttribute("target");
  treatmentCard.removeAttribute("rel");
});

/* Add high-value treatment pages beneath the existing treatment grid without changing the approved cards. */
const treatmentGrid = document.querySelector(".treatment-grid");
if (treatmentGrid && !document.querySelector(".advanced-treatment-links")) {
  const moreTreatments = document.createElement("div");
  moreTreatments.className = "advanced-treatment-links";
  moreTreatments.style.cssText = "grid-column:1/-1;margin-top:18px;padding:22px;border:1px solid #dce7e9;border-radius:16px;background:#f7fbfa;";
  moreTreatments.innerHTML = `
    <strong data-en="More treatment coordination" data-ar="خدمات علاجية إضافية">More treatment coordination</strong>
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">
      <a href="treatments/kidney-transplant-india/" data-en="Kidney Transplant" data-ar="زراعة الكلى">Kidney Transplant</a>
      <a href="treatments/liver-transplant-india/" data-en="Liver Transplant" data-ar="زراعة الكبد">Liver Transplant</a>
      <a href="treatments/spine-surgery-india/" data-en="Spine Surgery" data-ar="جراحة العمود الفقري">Spine Surgery</a>
    </div>`;
  treatmentGrid.appendChild(moreTreatments);
}

/* Main navigation: use crawlable destination pages where dedicated hubs exist. */
document.querySelectorAll('.desktop-nav a[data-en="Treatments"]').forEach((link) => {
  link.href = "treatments/";
});
document.querySelectorAll('.desktop-nav a[data-en="International Patients"]').forEach((link) => {
  link.href = "international-patients/mea/";
});

/* International patient pages */
const countryPageLinks = {
  "Saudi Arabia": "saudi-arabia/treatment-in-india/",
  "Oman": "oman/treatment-in-india/",
  "United Arab Emirates": "uae/treatment-in-india/",
  "Nigeria": "nigeria/treatment-in-india/"
};

document.querySelectorAll(".audience-strip .country").forEach((country) => {
  const label = country.querySelector("[data-en]");
  if (!label) return;
  const countryName = label.getAttribute("data-en");
  const url = countryPageLinks[countryName];
  if (!url) return;
  country.setAttribute("role", "link");
  country.setAttribute("tabindex", "0");
  country.style.cursor = "pointer";
  country.setAttribute("aria-label", `Treatment in India for patients from ${countryName}`);
  const openCountryPage = () => { window.location.href = url; };
  country.addEventListener("click", openCountryPage);
  country.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCountryPage();
    }
  });
});

/* Legal footer */
const footerLinks = document.querySelector(".footer-links");
if (footerLinks && !footerLinks.querySelector('a[href="privacy.html"]')) {
  const privacyLink = document.createElement("a");
  privacyLink.href = "privacy.html";
  privacyLink.setAttribute("data-en", "Privacy Policy");
  privacyLink.setAttribute("data-ar", "سياسة الخصوصية");
  privacyLink.textContent = currentLanguage === "ar" ? "سياسة الخصوصية" : "Privacy Policy";

  const termsLink = document.createElement("a");
  termsLink.href = "terms.html";
  termsLink.setAttribute("data-en", "Terms & Medical Disclaimer");
  termsLink.setAttribute("data-ar", "الشروط وإخلاء المسؤولية الطبية");
  termsLink.textContent = currentLanguage === "ar" ? "الشروط وإخلاء المسؤولية الطبية" : "Terms & Medical Disclaimer";
  footerLinks.appendChild(privacyLink);
  footerLinks.appendChild(termsLink);
}
