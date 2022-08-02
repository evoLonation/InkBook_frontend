import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(ElementPlus)
    .use(store)
    .use(router)
    .use(VueAxios,axios)
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios