import './assets/admin.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customDarkheme = {
    dark: true,
    colors: {
      background: '#292626',
      surface: '#292626',
      primary: '#fff',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
      anchor: '#8c9eff'
    },
  }

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customDarkheme',
    themes: {
        customDarkheme,
    },
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
