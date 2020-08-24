// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import viewDesign from 'view-design'
import mavonEditor from 'mavon-editor'
// import ECharts from 'vue-echarts'
import Axios from './utils/axios'
import 'view-design/dist/styles/iview.css'

import './assets/style/reset.less'
import './assets/theme/index.less'
import './assets/style/common.less'
import 'nprogress/nprogress.css'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/github.css' //样式文件


Vue.use(viewDesign)
Vue.use(mavonEditor)
// Vue.component('v-chart', ECharts)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
