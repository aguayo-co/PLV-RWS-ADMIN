<template lang="pug">
  ListLayout
    template(slot="title") Ventas

    template(slot="columns")
      th.crud__th.crud__title #Orden
      th.crud__th.crud__title #Venta
      th.crud__th.crud__title Fecha de pago
      th.crud__th.crud__title Productos
      th.crud__th.crud__title Gross Revenue
      th.crud__th.crud__title Compradora
      th.crud__th.crud__title Vendedora
      th.crud__th.crud__title Método de envío
      th.crud__th.crud__title Método de pago
      th.crud__th.crud__title Subtotal (sin descuento)
      th.crud__th.crud__title Envío
      th.crud__th.crud__title Cupón
      th.crud__th.crud__title Total
      th.crud__th.crud__title Créditos usados
      th.crud__th.crud__title Estado

    template(
      v-for="sale in sales"
      :slot="'row-' + sale.id")
      td.crud__cell {{ sale.order_id }}
      td.crud__cell {{ sale.id }}
      td.crud__cell {{ sale.payment_date | date-time }}
      td.crud__cell.crud__cell_14
        ul.crud__list
          li(v-for="product in sale.products")
            a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
              img.crud__cell-img(
                :src="product.images[0]",
                :alt="product.title")
            .crud__text
              a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
                .crud__text_small {{ product.id }}
              a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
                .crud__text_small {{ product.title }}
              a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
                .crud__text_small {{ product.price | currency }}
      td.crud__cell {{ sale.commission_percentage }}% / {{ sale.commission | currency }}
      td.crud__cell
        UserCell(:user="sale.order.user")
      td.crud__cell
        UserCell(:user="sale.user")
      td.crud__cell
        template(v-if="sale.shipping_method") {{ sale.shipping_method.name }}
        template(v-else) {{ | unempty }}
      td.crud__cell {{ sale.order.active_payment ? sale.order.active_payment.gateway : '' | unempty }}
      td.crud__cell {{ sale.total | currency }}
      td.crud__cell
        template(v-if="sale.shipping_cost") {{ sale.shipping_cost | currency }}
        template(v-else) {{ | unempty }}
      td.crud__cell
        template(
          v-if="sale.order.coupon") {{ sale.order.coupon.code }} / {{ sale.coupon_discount | currency }}
        template(v-else) {{ | unempty }}
      td.crud__cell {{ sale.total + sale.shipping_cost - sale.coupon_discount | currency }}
      td.crud__cell
        template(v-if="sale.used_credits") {{ sale.used_credits | currency }}
        template(v-else) {{ | unempty }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='"state-" + sale.status') {{ statuses[sale.status] }}
          template(v-if="sale.status === 99 && sale.status_history[99].user_id")  por usuario {{ sale.status_history[99].user_id }}
</template>

<script>

import saleAPI from '@/api/sale'
import EditSale from '@/components/EditSale'
import ListMixin from '@/mixins/ListMixin'

const statusFilters = Object.keys(saleAPI.statuses)
  .filter(status => status > 10)
  .map(status => {
    return { label: saleAPI.statuses[status], filter: {status: status} }
  })

export default {
  name: 'Sales',
  mixins: [ListMixin],
  data () {
    return {
      statuses: saleAPI.statuses,
      filter: {
        all: 1
      },
      filters: [
        {
          label: 'Compradora',
          type: 'text',
          filter: 'buyer',
          value: null
        },
        {
          label: 'Vendedora',
          type: 'text',
          filter: 'user',
          value: null
        },
        {
          label: 'Producto',
          type: 'text',
          filter: 'product',
          value: null
        },
        {
          label: 'Estado',
          type: 'select',
          active: {status: '11,99'},
          options: [
            { label: 'Todas', filter: {status: '11,99'} },
            ...statusFilters
          ]
        }
      ],
      slide: EditSale,
      query: false,
      orderby: '-payment_date',

      loaderMethod: saleAPI.get,
      objectsKey: 'rawSales',

      rawSales: []
    }
  },
  computed: {
    sales () {
      return this.rawSales.map(sale => {
        sale.commission_percentage = parseInt(sale.commission / sale.total * 100)
        sale.payment_date = this.$getNestedObject(sale.status_history, [20, 'date'])
        return sale
      })
    }
  },
  methods: {
    getBuyerFilters (text) {
      // Cualqueir cosa que parezca un email lo aceptamos como válido.
      // Dividimos por espacios que reemplazamos por comas.
      // lo@quesea.com    otra@cosa.com => lo@quesea.com,otra@cosa.com
      if (/^([^ ,]+@[^ ,]+ *)+$/.test(text)) {
        return {buyer_email: text.replace(/ +/g, ',')}
      }

      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return {buyer_id: text.replace(/ +/g, ',')}
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return {buyer_full_name: text}
    },
    getSellerFilters (text) {
      // Cualqueir cosa que parezca un email lo aceptamos como válido.
      // Dividimos por espacios que reemplazamos por comas.
      // lo@quesea.com    otra@cosa.com => lo@quesea.com,otra@cosa.com
      if (/^([^ ,]+@[^ ,]+ *)+$/.test(text)) {
        return {user_email: text.replace(/ +/g, ',')}
      }

      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return {user_id: text.replace(/ +/g, ',')}
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return {user_full_name: text}
    },
    getProductFilters (text) {
      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return {product_id: text.replace(/ +/g, ',')}
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return {product_title: text}
    },
    alterParams (query, filters) {
      const buyerText = filters.buyer
      delete filters.buyer
      if (buyerText) {
        filters = {...filters, ...this.getBuyerFilters(buyerText)}
      }

      const sellerText = filters.user
      delete filters.user
      if (sellerText) {
        filters = {...filters, ...this.getSellerFilters(sellerText)}
      }

      const productText = filters.product
      delete filters.product
      if (productText) {
        filters = {...filters, ...this.getProductFilters(productText)}
      }

      return [query, filters]
    }
  }
}
</script>
