import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// import './shims-vue.d.ts'

Vue.use(ViewUI);
Vue.config.productionTip = false

import axios from "axios";
Vue.prototype.$axios = axios;
import "./libs/api.ts"

import "@/style/reset.css"



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
