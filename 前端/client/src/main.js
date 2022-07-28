import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'

axios.defaults.baseURL =
  'https://rongrongya-7g81kb8432d7e9a8-1309272720.ap-shanghai.app.tcloudbase.com/lover'
Vue.use(ElementUI);

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
