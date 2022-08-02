import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'

/**
 * firebase 相关代码
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics'
const firebaseConfig = {
  apiKey: "AIzaSyB6bzpbn8SzyNRMoKH_w2JM97tnVWdcvaM",
  authDomain: "inkbook-cb595.firebaseapp.com",
  projectId: "inkbook-cb595",
  storageBucket: "inkbook-cb595.appspot.com",
  messagingSenderId: "858371951645",
  appId: "1:858371951645:web:537e40acc6f305abc10af4",
  measurementId: "G-9RP1HQXYQR"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const analytics = firebase.analytics(firebaseApp)
console.log(analytics)
/************************* */



import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const app = createApp(App)
axios.defaults.baseURL = '/api/';

app.use(ElementPlus)
    .use(store)
    .use(router)
    .use(VueAxios,axios)
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios