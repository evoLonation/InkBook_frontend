import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueParticles from "vue-particles";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

const app = createApp(App)
axios.defaults.baseURL = '/api/';

app.use(ElementPlus)
    .use(store)
    .use(router)
    .use(Antd)
    .use(VueAxios,axios,Request)
    .use(VueParticles)
    .use(contextmenu)
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios