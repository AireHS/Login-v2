import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 1. Importar estilos de Vuetify y de los Iconos (OBLIGATORIO)
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' 

// 2. Importar funciones de configuración de Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 3. Crear la instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark' // Opcional: Para que los inputs se vean bien sobre fondo oscuro
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // 4. ¡Conectar Vuetify a la App!

app.mount('#app')