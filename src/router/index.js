import Vue from 'vue'
import Router from 'vue-router'
import Productos from '@/pages/Productos'
import Usuarios from '@/pages/Usuarios'
import Banners from '@/pages/Banners'
import Sizes from '@/pages/Sizes'
import FormLogin from '@/pages/FormLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: FormLogin
    },
    {
      path: '/productos',
      name: 'Productos',
      component: Productos
    },
    {
      path: '/usuarias',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/banners',
      name: 'Banners',
      component: Banners
    },
    {
      path: '/tallas',
      name: 'Tallas',
      component: Sizes
    }
  ]
})
