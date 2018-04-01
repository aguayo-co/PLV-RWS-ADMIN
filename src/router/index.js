import Vue from 'vue'
import Router from 'vue-router'
import Productos from '@/pages/Producto'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/producto',
      name: 'Producto',
      component: Producto
    }
  ]
})
