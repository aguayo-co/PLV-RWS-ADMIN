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
              url: '/productos',
              ico: 'i-closet'
            },
            {
              name: 'Ventas',
              url: '#',
              ico: 'i-sale'
            },
            {
              name: 'Transferencias',
              url: '#',
              ico: 'i-credits'
            },
            {
              name: 'Devoluciones',
              url: '#',
              ico: 'i-reload'
            },
            {
              name: 'Cupones',
              url: '/user/data',
              ico: 'i-bank-data'
            },
            {
              name: 'Reportes',
              url: '/user/data',
              ico: 'i-report'
            }
          ]
        },
        {
          title: 'Usuarias',
          items: [
            {
              name: 'Usuarias',
              url: '/usuarias',
              ico: 'i-data'
            },
            {
              name: 'Solitudes de créditos',
              url: '#',
              ico: 'i-sell'
            }
          ]
        },
        {
          title: 'Tienda',
          items: [
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
              name: 'Carousel Principal',
              url: '/sliders',
              ico: 'i-insta'
            },
            {
              name: 'Colores',
              url: '/colores',
              ico: 'i-tag'
            },
            {
              name: 'Menús',
              url: '#',
              ico: 'i-filter'
            },
            {
              name: 'Blog',
              url: '#',
              ico: 'i-blog-admin'
            },
            {
              name: 'Configuraciones',
              url: '#',
              ico: 'i-config'
            }
          ]
        }
      ]
    }
  }
}
</script>
