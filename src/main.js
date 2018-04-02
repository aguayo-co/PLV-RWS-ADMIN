// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosPlugin from './axios'
import store from './store'

// Load global Axios instances.
Vue.use(axiosPlugin, store)

Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
})

Vue.filter('status_code', function (value) {
  switch (value) {
    case 0:
      return 'Pendiente'
    case 1:
      return 'Rechazado'
    case 10:
      return 'Aprobado'
    case 19:
      return 'Disponible'
    case 30:
      return 'Vendido'
    default:
      return 'Deshabilitado'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
