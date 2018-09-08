import Vue from 'vue'
import Router from 'vue-router'

import Banners from '@/pages/Banners'
import Brands from '@/pages/Brands'
import Campaigns from '@/pages/Campaigns'
import Categories from '@/pages/Categories'
import Colors from '@/pages/Colors'
import Conditions from '@/pages/Conditions'
import Coupons from '@/pages/Coupons'
import CreditsTransactions from '@/pages/CreditsTransactions'
import Groups from '@/pages/Groups'
import Home from '@/pages/Home'
import Menus from '@/pages/Menus'
import MenuItems from '@/pages/MenuItems'
import Payrolls from '@/pages/Payrolls'
import Productos from '@/pages/Productos'
import Sales from '@/pages/Sales'
import SaleReturns from '@/pages/SaleReturns'
import ShippingMethods from '@/pages/ShippingMethods'
import Sizes from '@/pages/Sizes'
import Sliders from '@/pages/Sliders'
import Payments from '@/pages/Payments'
import Report from '@/pages/Report'
import ReportProducts from '@/pages/ReportProducts'
import ReportShoppingCarts from '@/pages/ReportShoppingCarts'
import Usuarios from '@/pages/Usuarios'

import beforeEach from './beforeEach'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/productos',
      name: 'productos',
      component: Productos
    },
    {
      path: '/usuarias',
      name: 'Usuarias',
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
      path: '/menus',
      name: 'Menus',
      component: Menus
    },
    {
      path: '/menus/:menuId(\\d+)',
      name: 'MenuItems',
      component: MenuItems,
      props: true
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
    },
    {
      path: '/sale-returns',
      name: 'SaleReturns',
      component: SaleReturns
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/conditions',
      name: 'Conditions',
      component: Conditions
    },
    {
      path: '/cupones',
      name: 'Coupons',
      component: Coupons
    },
    {
      path: '/credits-transactions',
      name: 'CreditsTransactions',
      component: CreditsTransactions
    },
    {
      path: '/payrolls/:payrollId',
      name: 'Payroll',
      component: CreditsTransactions,
      props: true
    },
    {
      path: '/payrolls',
      name: 'Payrolls',
      component: Payrolls
    },
    {
      path: '/reporte',
      name: 'Reporte',
      component: Report
    },
    {
      path: '/reporte-productos',
      name: 'ReportProductos',
      component: ReportProducts
    },
    {
      path: '/reporte-shopping-cart',
      name: 'ReportShoppingCarts',
      component: ReportShoppingCarts
    }
  ]
})

router.beforeEach(beforeEach)

export default router
