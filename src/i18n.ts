import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import hi from '../public/locales/hi/translation.json';
import en from '../public/locales/en/translation.json';
import mr from '../public/locales/mr/translation.json';
import gu from '../public/locales/gu/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      hi: { translation: hi },
      en: { translation: en },
      mr: { translation: mr },
      gu: { translation: gu },
    },
    fallbackLng: 'hi',
    debug: true, // enable debug to see warnings
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;