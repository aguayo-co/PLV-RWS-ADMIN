<template lang="pug">
  ListLayout
    template(slot="title") Reporte de carritos de compras

    template(slot="columns")
      th.crud__th.crud__title Fecha de creación
      th.crud__th.crud__title Correo comprador
      th.crud__th.crud__title Compras del comprador
      th.crud__th.crud__title Producto
      th.crud__th.crud__title Veces en carrito
      th.crud__th.crud__title Veces en favoritos

    template(
      v-for="product in products"
      :slot="'row-' + product.id")
      template(v-if="product.rowspan")
        td.crud__cell(:rowspan="product.rowspan") {{ product.sale.created_at | date }}
        td.crud__cell(:rowspan="product.rowspan") {{ product.sale.order.user.email }}
        td.crud__cell(:rowspan="product.rowspan") {{ product.sale.order.user.orders_count }}
      td.crud__cell {{ product.title }}
      td.crud__cell {{ product.shopping_cart_count }}
      td.crud__cell {{ product.favorited_by_count }}

</template>

<script>

import saleAPI from '@/api/sale'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'ReportShoppingCarts',
  mixins: [ListMixin],
  methods: {
    alterParams (query, filters) {
      // Las fechas deben ir en UTC.
      // Acá convertimos a el inicio y fin del día en nuestro uso horario a UTC.
      if (filters['created_at-from'] || filters['created_at-until']) {
        const dates = []
        if (filters['created_at-from']) {
          dates.push(
            this.$moment(filters['created_at-from']).utc().format('YYYY-MM-DD HH:mm:ss')
          )
          delete filters['created_at-from']
        }
        if (filters['created_at-until']) {
          dates.push(
            this.$moment(filters['created_at-until']).add(1, 'day').utc().format('YYYY-MM-DD HH:mm:ss')
          )
          delete filters['created_at-until']
        }
        filters['created_at'] = dates.join(',')
      }

      return [query, filters]
    }
  },
  data () {
    return {
      objectsKey: 'products',
      loaderMethod: saleAPI.getForReport,
      query: false,
      filter: {
        status: '10',
        all: 1
      },

      sales: [],
      filters: [
        {
          label: 'Creado desde',
          type: 'date',
          filter: 'created_at-from',
          value: null
        },
        {
          label: 'Creado hasta',
          type: 'date',
          filter: 'created_at-until',
          value: null
        }
      ]
    }
  },
  computed: {
    // El Mixin guarda el los objetos de la petición al API
    // en la propiedad especificada en objectsKey
    // En nuestro caso la petición trae sales, pero nosotros
    // vamos a recorrer productos.
    // Acá guardamos las sales en local, pero devolvemos
    // transofrmado en productos.
    products: {
      set (sales) {
        this.sales = sales
      },
      get () {
        const products = []
        this.sales.forEach(sale => {
          let rowspan = sale.products.length
          sale.products.forEach(product => {
            products.push({
              ...product,
              rowspan,
              sale: sale
            })
            rowspan = null
          })
        })
        return products
      }
    }
  }
}
</script>
