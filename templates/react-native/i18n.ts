import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import en from './lang/en'
import ru from './lang/ru'

const getLangDevice = (): string => {
  const locale = Localization.locale.slice(0, 2)
  i18n
  return locale || 'en'
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en,
    ru,
  },
  lng: getLangDevice(),
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
