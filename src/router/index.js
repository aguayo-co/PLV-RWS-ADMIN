import Vue from 'vue'
import Router from 'vue-router'
import Productos from '@/pages/Productos'
import Usuarios from '@/pages/Usuarios'
import Banners from '@/pages/Banners'
import Sliders from '@/pages/Sliders'
import Sizes from '@/pages/Sizes'
import MenuItems from '@/pages/MenuItems'
import Home from '@/pages/Home'
import Colors from '@/pages/Colors'
import Brands from '@/pages/Brands'
import Categories from '@/pages/Categories'
import Payments from '@/pages/Payments'
import ShippingMethods from '@/pages/ShippingMethods'
import Campaigns from '@/pages/Campaigns'
import Sales from '@/pages/Sales'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/sliders',
      name: 'Sliders',
      component: Sliders
    },
    {
      path: '/tallas',
      name: 'Tallas',
      component: Sizes
    },
    {
      path: '/menu-items',
      name: 'MenuItems',
      component: MenuItems
    },
    {
      path: '/colores',
      name: 'Colors',
      component: Colors
    },
    {
      path: '/marcas',
      name: 'Brands',
      component: Brands
    },
    {
      path: '/categorias',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments
    },
    {
      path: '/metodos-envio',
      name: 'ShipingMethods',
      component: ShippingMethods
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      component: Campaigns
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales
    }
  ]
})
