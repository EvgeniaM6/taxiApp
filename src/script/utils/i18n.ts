import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translation/translation.en.json';
import translationUA from './translation/translation.ua.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18n;
