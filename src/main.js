/**
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import ws from '@/utils/socket'

Vue.prototype.$ws = ws
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),
})
