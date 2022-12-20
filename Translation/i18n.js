import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import en from './en';
import ru from './rus';
import am from './hy';

const resources = {
    en: {
        translation: {
            ...en,
        },
    },
    ru: {
        translation: {
            ...ru,
        },
    },
    am: {
        translation: {
            ...am,
        },
    },
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem('userLanguage') ? localStorage.getItem('userLanguage') : 'am',
        fallbackLng: "am",
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
