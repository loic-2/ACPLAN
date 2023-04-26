import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import axiosPlugin from './plugins/axios.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/dashboard.css'
import {
    createPinia
} from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(axiosPlugin)
app.use(Toast)
app.use(pinia)
app.mount('#app')