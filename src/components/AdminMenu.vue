<template lang="pug">
.side
  a.page-brand(href='/', title='Ir a la página de inicio')
    span.brand
      img.brand__logo(src='/static/img/brand-prilov.png', alt='Prilov Compra. Usa. Vende')
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
              url: '#',
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
              url: '#',
              ico: 'i-data'
            }
          ]
        },
        {
          title: 'Tienda',
          items: [
            {
              name: 'Blog',
              url: '#',
              ico: 'i-blog'
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
