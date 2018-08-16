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
      td.crud__cell
        UserCell(:user="saleReturn.sale.order.user")
      td.crud__cell
        UserCell(:user="saleReturn.sale.user")
      td.crud__cell {{ saleReturn.reason }}
      td.crud__cell {{ saleReturn.shippingData }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='"state-" + saleReturn.status') {{ statuses[saleReturn.status] }}
</template>

<script>

import saleReturnAPI from '@/api/saleReturn'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'SaleReturns',
  mixins: [ListMixin],
  data () {
    return {
      statuses: saleReturnAPI.statuses,
      query: false,
      orderby: '-creation_at',

      loaderMethod: saleReturnAPI.get,
      objectsKey: 'rawSaleReturns',

      rawSaleReturns: []
    }
  },
  methods: {
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
