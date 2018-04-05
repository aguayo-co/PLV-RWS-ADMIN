import Vue from 'vue'
import Router from 'vue-router'
import Productos from '@/pages/Productos'
import Usuarios from '@/pages/Usuarios'
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
    }
  ]
})
