import 'moment/locale/es'

import moment from 'moment'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App'
import axiosPlugin from './axios'
import LoadingRow from './components/LoadingRow'
import prilovFilters from './filters'
import prilovHelpers from './helpers'
import router from './router'
import store from './store'

(() => {
  if (window.location.protocol === 'http:') {
    window.location.protocol = 'https:'
    return
  }

  Vue.component('LoadingRow', LoadingRow)

  // Load global Axios instances.
  Vue.use(axiosPlugin, store)
  Vue.use(prilovFilters)
  Vue.use(VueTextareaAutosize)
  Vue.use(VueMoment, {moment})

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
})()
