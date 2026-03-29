import './assets/main.css'
import './assets/button.css'
import './assets/searchbar.css'
import './assets/modal.css'
import './assets/sidebar.css'
import './assets/annotationDot.css'
import './assets/sidebarSection.css'
import './assets/contextMenu.css'
import './assets/newClass.css'
import './assets/confirmModal.css'
import './assets/explanaitionComponent.css'

import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import en from './locales/en.json'
import sk from './locales/sk.json'
import cz from './locales/cz.json'
import cookie from './locales/cookie.json'

library.add(fas, far)

const pinia = createPinia()


const i18n = createI18n({
  locale: localStorage.getItem('selectedLanguage') || 'en',
  messages: {
    en: en,
    cz: cz,
    sk: sk,
    cookie: cookie,
  },
})

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(pinia)
  .use(i18n)
  .mount('#app')