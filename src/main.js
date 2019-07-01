import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueRouter from 'vue-router'
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css'
import './components/common/directives'
import echarts from 'echarts'
// import "babel-polyfill"
// import api from '../src/requests/api'
import VueDND from 'awe-dnd'
import * as $http from '../src/requests/index'
import { loginName } from '../src/global/global'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueDND)
// Vue.prototype.$axios = axios;
Vue.prototype.$http = $http
Vue.prototype.$echarts = echarts
Vue.prototype.$loginName = loginName
// Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
