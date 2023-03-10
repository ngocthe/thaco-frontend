import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import { getLang } from "@/utils/auth";

Vue.use(VueI18n)
const messages = {
  en: {
    ...require('@/locales/en/validate.json'),
    ...require('@/locales/en/en.json'),
    ...require('@/locales/en/messenger.json')
  },
  vi: {
    ...require('@/locales/vi/vi.json')
  }
}

export default new VueI18n({
  locale: localStorage.getItem('lang'),
  fallbackLocale: 'en',
  messages
})
