import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translation/languages/en';
import frTranslations from './translation/languages/fr';
import nedTranslations from './translation/languages/ned';

i18next
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      nl: {
        translation: nedTranslations,
      },
    },
  });

export default i18n;