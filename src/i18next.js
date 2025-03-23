import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import uzTranslation from "./locales/uz/translation.json";
import ruTranslation from "./locales/ru/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
    },
    debug: true,
    silent: true,
    fallbackLng: "ru",
  });

export default i18next;
