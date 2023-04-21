import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
// Vue.use(axios);
Vue.prototype.$axios = axios;

import vueRouter from "vue-router";
Vue.use(vueRouter);
import router from './router';

Vue.use(elementUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  axios,
  router
}).$mount('#app')
