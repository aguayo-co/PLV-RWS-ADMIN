import Vue from 'vue'
import Router from 'vue-router'
import Producto from '@/pages/Producto'
import Usuaria from '@/pages/Usuaria'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/producto',
      name: 'Producto',
      component: Producto
    },
    {
      path: '/usuaria',
      name: 'Usuaria',
      component: Usuaria
    }
  ]
})
