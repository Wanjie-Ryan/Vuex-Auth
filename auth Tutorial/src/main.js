import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import router from './routes/routes'
import Store from './vuex'
const app = createApp(App)
app.use(Store)
app.use(VueToast)
app.use(router)
app.mount('#app')
// app.use(router)

