<template lang="pug">
  ListLayout
    template(slot="title") Ventas

    template(slot="columns")
      th.crud__th.crud__title #Orden
      th.crud__th.crud__title #Venta
      th.crud__th.crud__title Fecha
      th.crud__th.crud__title Productos
      th.crud__th.crud__title Comisión
      th.crud__th.crud__title Compradora
      th.crud__th.crud__title Vendedora
      th.crud__th.crud__title Método de pago
      th.crud__th.crud__title Subtotal
      th.crud__th.crud__title Envío
      th.crud__th.crud__title Método
      th.crud__th.crud__title Créditos
      th.crud__th.crud__title Cupón
      th.crud__th.crud__title Estado

    template(
      v-for="sale in sales"
      :slot="'row-' + sale.id")
      //- Id Orden #2
      td.crud__cell {{ sale.order_id }}
      //- Id Ventas #3
      td.crud__cell {{ sale.id }}
      //- Fecha #4
      td.crud__cell {{ sale.created_at | date }}
      //- Productos #5
      td.crud__cell.crud__cell_14
        ul.crud__list
          li(v-for="product in sale.products")
            a.crud__user(
              :href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
              img.crud__cell-img(
                :src="product.images[0]",
                :alt="product.title")
              .crud__text
                p.crud__text_small {{ product.title }}
                p.crud__text_small {{ product.price | currency}}
      //- Comisión #6
      td.crud__cell {{ sale.commission }}% / {{ sale.total_commission | currency }}
      //- Compradora / Vendedora #7
      td.crud__cell
        UserCell(:user="sale.order.user")
      td.crud__cell
        UserCell(:user="sale.user")
      //- Subtotal #8
      td.crud__cell {{ sale.order.payments[0] ? sale.order.payments[0].gateway : '' | unempty }}
      //- Subtotal #9
      td.crud__cell {{ sale.total | currency }}
      //- Envío #10
      td.crud__cell
        template(v-if="sale.shipping_cost") {{ sale.shipping_cost | currency }}
        template(v-else) {{ | unempty }}
      //- Metodo #11
      td.crud__cell
        template(v-if="sale.shipping_method") {{ sale.shipping_method.name }}
        template(v-else) {{ | unempty }}
      //- Credito amount #12
      td.crud__cell
        template(v-if="sale.used_credits") {{ sale.used_credits | currency }}
        template(v-else) {{ | unempty }}
      //- Cupon #13
      td.crud__cell
        template(
          v-if="sale.coupon") {{ sale.coupon.code }}
        template(v-else) {{ | unempty }}
      //- Estado #14
      td.crud__cell
        p.crud__state.crud__state_detail(:class='"state-" + sale.status') {{ statuses[sale.status] }}
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
          label: 'ID de Vendedora',
          type: 'text',
          filter: 'user_id',
          value: null
        },
        {
          label: 'ID de Compradora',
          type: 'text',
          filter: 'buyer_id',
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
      orderby: '-updated_at',

      loaderMethod: saleAPI.get,
      objectsKey: 'rawSales',

      rawSales: [],
      picture: null
    }
  },
  computed: {
    sales () {
      return this.rawSales.map(sale => {
        [sale.total_commission, sale.commission] = this.getCommission(sale.products)
        return sale
      })
    }
  },
  methods: {
    getCommission (products) {
      const totalCommission = products.reduce((sum, product) => {
        return sum + product.commission * product.price / 100
      }, 0)

      const percentege = totalCommission * 100 / products.reduce((sum, product) => {
        return sum + product.price
      }, 0)

      return [totalCommission, parseInt(percentege)]
    }
  }
}
</script>
