import {createApp} from 'vue'
import App from './App.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import router from './router';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueParticles from "vue-particles";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import VueQuill from 'vue-quill'
// import { firestorePlugin } from 'vuefire'

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const app = createApp(App)
axios.defaults.baseURL = '/api/';

app.use(ElementPlus)
    .use(store)
    .use(router)
    .use(Antd)
    .use(VueAxios,axios,Request)
    .use(VueParticles)
    // .use(VueQuill)
    // .use(firestorePlugin)
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios