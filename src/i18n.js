import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import French translations
import frCommon from './locales/fr/common.json'
import frHome from './locales/fr/home.json'
import frServices from './locales/fr/services.json'
import frShop from './locales/fr/shop.json'
import frContact from './locales/fr/contact.json'
import frAuth from './locales/fr/auth.json'
import frCart from './locales/fr/cart.json'
import frConfigurator from './locales/fr/configurator.json'

// Import English translations
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enServices from './locales/en/services.json'
import enShop from './locales/en/shop.json'
import enContact from './locales/en/contact.json'
import enAuth from './locales/en/auth.json'
import enCart from './locales/en/cart.json'
import enConfigurator from './locales/en/configurator.json'

const resources = {
  fr: {
    common: frCommon,
    home: frHome,
    services: frServices,
    shop: frShop,
    contact: frContact,
    auth: frAuth,
    cart: frCart,
    configurator: frConfigurator
  },
  en: {
    common: enCommon,
    home: enHome,
    services: enServices,
    shop: enShop,
    contact: enContact,
    auth: enAuth,
    cart: enCart,
    configurator: enConfigurator
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    defaultNS: 'common',
    ns: ['common', 'home', 'services', 'shop', 'contact', 'auth', 'cart', 'configurator'],
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      // Detect language from URL path first (/fr/... or /en/...)
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    }
  })

export default i18n
