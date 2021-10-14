import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './en/common.json';
import enComponent from './en/component.json';
import enPage from './en/page.json';
import koCommon from './ko/common.json';
import koComponent from './ko/component.json';
import koPage from './ko/page.json';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { common: koCommon, page: koPage, component: koComponent },
      en: { common: enCommon, page: enPage, component: enComponent },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
