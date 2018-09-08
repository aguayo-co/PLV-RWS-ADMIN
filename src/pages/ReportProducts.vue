<template lang="pug">
  ListLayout
    template(slot="title") Reporte de productos disponibles para la venta

    template(slot="columns")
      th.crud__th.crud__title Fecha de creación
      th.crud__th.crud__title Producto
      th.crud__th.crud__title Comisión
      th.crud__th.crud__title Veces en carrito
      th.crud__th.crud__title Veces en favoritos
      th.crud__th.crud__title Campañas

    template(
      v-for="product in products"
      :slot="'row-' + product.id")
      td.crud__cell {{ product.created_at | date }}
      td.crud__cell {{ product.title }}
      td.crud__cell {{ product.commission }}%
      td.crud__cell {{ product.shopping_cart_count }}
      td.crud__cell {{ product.favorited_by_count }}
      td.crud__cell
        ul(v-if="product.campaign_ids.length")
          li(v-for="campaign in product.campaigns") {{ campaign.name }}
</template>

<script>

import productAPI from '@/api/product'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'ReporteProductos',
  mixins: [ListMixin],
  methods: {
    alterParams (query, filters) {
      if (filters.commission) {
        filters.commission = filters.commission + ',100'
      }

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
      loaderMethod: productAPI.getWithCounts,
      query: false,
      filter: {
        status: '10,19'
      },

      products: [],
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
        },
        {
          label: 'Comisión mínima',
          type: 'text',
          filter: 'commission',
          value: null
        }
      ]
    }
  }
}
</script>
