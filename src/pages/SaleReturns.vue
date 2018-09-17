<template lang="pug">
  ListLayout
    template(slot="title") Devoluciones

    template(slot="columns")
      th.crud__th.crud__title #Orden
      th.crud__th.crud__title #Venta
      th.crud__th.crud__title Fecha de solicitud
      th.crud__th.crud__title Productos
      th.crud__th.crud__title Compradora
      th.crud__th.crud__title Vendedora
      th.crud__th.crud__title Motivo
      th.crud__th.crud__title Envío
      th.crud__th.crud__title Estado

    template(
      v-for="saleReturn in saleReturns"
      :slot="'row-' + saleReturn.id")
      td.crud__cell {{ saleReturn.sale.order_id }}
      td.crud__cell {{ saleReturn.sale.id }}
      td.crud__cell {{ saleReturn.created_at | date-time }}
      td.crud__cell.crud__cell_14
        ul.crud__list
          li(v-for="product in saleReturn.products")
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
            button(
              v-if="canReplicate(saleReturn, product)"
              @click="replicate(product)") Republicar
            a(
              v-if="product.extra && product.extra.replicated"
              :href="$store.state.frontUrl + '/producto/-__' + product.extra.replicated") Republicado: {{ product.extra.replicated }}
      td.crud__cell
        UserCell(:user="saleReturn.sale.order.user")
      td.crud__cell
        UserCell(:user="saleReturn.sale.user")
      td.crud__cell {{ saleReturn.reason }}
      td.crud__cell {{ saleReturn.shippingData }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='{"state-warning": [0, 50, 99].indexOf(saleReturn.status) !== -1}') {{ statuses[saleReturn.status] }}
</template>

<script>

import saleReturnAPI from '@/api/saleReturn'
import replicateProductMixin from '@/mixins/replicateProductMixin'
import ListMixin from '@/mixins/ListMixin'

const statusFilters = Object.keys(saleReturnAPI.statuses)
  .map(status => {
    return { label: saleReturnAPI.statuses[status], filter: { status: status } }
  })

export default {
  name: 'SaleReturns',
  mixins: [replicateProductMixin, ListMixin],
  data () {
    return {
      statuses: saleReturnAPI.statuses,
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
          active: { status: '0,99' },
          options: [
            { label: 'Todas', filter: { status: '0,99' } },
            ...statusFilters
          ]
        }
      ],
      query: false,
      orderby: '-created_at',

      loaderMethod: saleReturnAPI.get,
      objectsKey: 'rawSaleReturns',

      rawSaleReturns: []
    }
  },
  methods: {
    canReplicate (saleReturn, product) {
      if (saleReturn.status !== 90) {
        return false
      }
      return this.canReplicateProduct(product)
    },
    getShippingData (saleReturn) {
      if (!saleReturn.shipment_details) {
        return
      }
      if (saleReturn.shipment_details.note) {
        return saleReturn.shipment_details.note
      }
      const shipment = this.$getNestedObject(saleReturn, ['shipment_details', 'tracking_codes', 0])
      if (shipment) {
        return 'Enviado por "' + shipment.company + '", guía: ' + shipment.code
      }
    },
    getBuyerFilters (text) {
      // Cualqueir cosa que parezca un email lo aceptamos como válido.
      // Dividimos por espacios que reemplazamos por comas.
      // lo@quesea.com    otra@cosa.com => lo@quesea.com,otra@cosa.com
      if (/^([^ ,]+@[^ ,]+ *)+$/.test(text)) {
        return { buyer_email: text.replace(/ +/g, ',') }
      }

      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return { buyer_id: text.replace(/ +/g, ',') }
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return { buyer_full_name: text }
    },
    getSellerFilters (text) {
      // Cualqueir cosa que parezca un email lo aceptamos como válido.
      // Dividimos por espacios que reemplazamos por comas.
      // lo@quesea.com    otra@cosa.com => lo@quesea.com,otra@cosa.com
      if (/^([^ ,]+@[^ ,]+ *)+$/.test(text)) {
        return { user_email: text.replace(/ +/g, ',') }
      }

      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return { user_id: text.replace(/ +/g, ',') }
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return { user_full_name: text }
    },
    getProductFilters (text) {
      // 123    456 => 123,456
      if (/^([0-9]+ *)+$/.test(text)) {
        return { product_id: text.replace(/ +/g, ',') }
      }
      // No sabemos que buscar, busca algo que asegura 0 resultados.
      return { product_title: text }
    },
    alterParams (query, filters) {
      const buyerText = filters.buyer
      delete filters.buyer
      if (buyerText) {
        filters = { ...filters, ...this.getBuyerFilters(buyerText) }
      }

      const sellerText = filters.user
      delete filters.user
      if (sellerText) {
        filters = { ...filters, ...this.getSellerFilters(sellerText) }
      }

      const productText = filters.product
      delete filters.product
      if (productText) {
        filters = { ...filters, ...this.getProductFilters(productText) }
      }

      return [query, filters]
    }
  },
  computed: {
    saleReturns () {
      return this.rawSaleReturns.map(saleReturn => {
        saleReturn.shippingData = this.getShippingData(saleReturn)
        return saleReturn
      })
    }
  }
}
</script>
