// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosPlugin from './axios'
import store from './store'
import prilovHelpers from './helpers'
import prilovFilters from './filters'
import VueTextareaAutosize from 'vue-textarea-autosize'

// Load global Axios instances.
Vue.use(axiosPlugin, store)
Vue.use(prilovFilters)
Vue.use(VueTextareaAutosize)
Vue.use(require('vue-moment'))

// Load our helpers!
Vue.use(prilovHelpers)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
