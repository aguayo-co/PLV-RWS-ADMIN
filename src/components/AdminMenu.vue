<template lang="pug">
.side
  router-link.page-brand(to='/productos', title='Ir a la página de inicio')
    span.brand
      img.brand__logo(src='/static/img/brand-prilov.svg', alt='Prilov Compra. Usa. Vende')
      span.brand__typo
        strong.brand__name Prilov.com
        span.brand__tagline  Compra. Usa. Vende.

  //- User Nav
  nav.user-nav
    //- User Menu lista
    dl.user-nav__list(
      v-for='list in UserNavList')
      dt.user-nav__title {{ list.title }}
      dd.user-nav__item(
        v-for='items in list.items')
        router-link.user-nav__link(
          :to='items.url',
          :class='items.ico') {{ items.name }}

</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      UserNavList: [
        {
          title: 'Ventas y productos',
          items: [
            {
              name: 'Productos',
              url: {name: 'productos'},
              ico: 'i-closet'
            },
            {
              name: 'Ventas',
              url: {name: 'Sales'},
              ico: 'i-sale'
            },
            {
              name: 'Devoluciones',
              url: {name: 'SaleReturns'},
              ico: 'i-reload'
            },
            {
              name: 'Pagos',
              url: {name: 'Payments'},
              ico: 'i-credits'
            },
            {
              name: 'Cupones',
              url: {name: 'Coupons'},
              ico: 'i-bank-data'
            },
            {
              name: 'Créditos',
              url: {name: 'CreditsTransactions'},
              ico: 'i-credits'
            },
            {
              name: 'Nóminas',
              url: {name: 'Payrolls'},
              ico: 'i-credits'
            }
          ]
        },
        {
          title: 'Reportes',
          items: [
            {
              name: 'Reporte',
              url: {name: 'Reporte'},
              ico: 'i-report'
            },
            {
              name: 'Reporte Productos',
              url: {name: 'ReportProductos'},
              ico: 'i-report'
            },
            {
              name: 'Reporte carrito',
              url: {name: 'ReportShoppingCarts'},
              ico: 'i-report'
            }
          ]
        },
        {
          title: 'Usuarias',
          items: [
            {
              name: 'Usuarias',
              url: {name: 'Usuarias'},
              ico: 'i-data'
            // },
            // {
            //   name: 'Solitudes de créditos',
            //   url: '#',
            //   ico: 'i-sell'
            },
            {
              name: 'Grupos',
              url: '/groups',
              ico: 'i-start'
            }
          ]
        },
        {
          title: 'Tienda',
          items: [
            {
              name: 'Slides',
              url: '/sliders',
              ico: 'i-upload'
            },
            {
              name: 'Banners',
              url: '/banners',
              ico: 'i-upload'
            },
            {
              name: 'Tallas',
              url: '/tallas',
              ico: 'i-closet'
            },
            {
              name: 'Marcas',
              url: '/marcas',
              ico: 'i-edit-line'
            },
            {
              name: 'Condiciones',
              url: '/conditions',
              ico: 'i-tag'
            },
            {
              name: 'Colores',
              url: '/colores',
              ico: 'i-tag'
            },
            {
              name: 'Categorias',
              url: '/categorias',
              ico: 'i-tag'
            },
            {
              name: 'Métodos de envío',
              url: '/metodos-envio',
              ico: 'i-shipping'
            },
            {
              name: 'Campañas',
              url: '/campaigns',
              ico: 'i-rocket'
            },
            {
              name: 'Menús',
              url: '/menus',
              ico: 'i-filter'
            // },
            // {
            //   name: 'Blog',
            //   url: '#',
            //   ico: 'i-blog-admin'
            // },
            // {
            //   name: 'Configuraciones',
            //   url: '#',
            //   ico: 'i-config'
            }
          ]
        }
      ]
    }
  }
}
</script>
