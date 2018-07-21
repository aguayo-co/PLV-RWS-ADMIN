import 'moment/locale/es'

import moment from 'moment'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App'
import axiosPlugin from './axios'
import Dots from './components/global/Dots'
import Loader from './components/global/Loader'
import UserCell from './components/global/UserCell'
import prilovFilters from './filters'
import prilovHelpers from './helpers'
import router from './router'
import store from './store'

(() => {
  if (window.location.protocol === 'http:') {
    window.location.protocol = 'https:'
    return
  }

  // Load global Axios instances.
  Vue.use(axiosPlugin, store)
  Vue.use(prilovFilters)
  Vue.use(VueTextareaAutosize)
  Vue.use(VueMoment, {moment})

  // Load our helpers!
  Vue.use(prilovHelpers)

  Vue.component('Loader', Loader)
  Vue.component('Dots', Dots)
  Vue.component('UserCell', UserCell)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})()
