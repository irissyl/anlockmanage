/**
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import ws from '@/utils/socket'
import './utils/dialog' // 引入可拖动的js
// import './utils/excel.js' //表格导入导出
// let mExcel = initExcel();
// vue.prototype.$mExcel = mExcel;  //挂载到vue上面，这样在任何页面只要使用this.$mExcel就可以了 


//使用ElementUI
ElementUI.Dialog.props.lockScroll.default = false;
Vue.use(ElementUI, {
  size: "small",
  menuType: "text"
});
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
