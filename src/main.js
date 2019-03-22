// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iview from 'iview'
import mavonEditor from 'mavon-editor'

import 'iview/dist/styles/iview.css'
import './assets/style/reset.less'
import './assets/style/common.less'
import 'nprogress/nprogress.css'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/github.css' //样式文件
Vue.use(iview)
Vue.use(mavonEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
