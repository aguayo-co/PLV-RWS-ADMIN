<template lang="pug">
  ListLayout
    template(slot="title") Productos

    template(slot="columns")
      th.crud__th.crud__title ID
      th.crud__th.crud__title Foto
      th.crud__th.crud__title Nombre
      th.crud__th.crud__title Marca
      th.crud__th.crud__title Precio original
      th.crud__th.crud__title Precio venta
      th.crud__th.crud__title Comisión
      th.crud__th.crud__title Usuaria
      th.crud__th.crud__title Estado

    template(
      v-for="product in products"
      :slot="'row-' + product.id")
      td.crud__cell
        a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id")
          img.crud__cell-img(:src="product.images[0]", :alt="product.title")
      td.crud__cell
        a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id") {{ product.id }}
      td.crud__cell
        a(:href="$store.state.frontUrl + '/producto/' + product.slug + '__' + product.id") {{ product.title }}
      td.crud__cell {{ product.brand.name }}
      td.crud__cell {{ product.original_price | currency }}
      td.crud__cell(:class='{ "danger": product.price > product.original_price - ( product.original_price * 0.1 ) }') {{ product.price | currency }}
      td.crud__cell {{ product.commission }} %
        small.crud__cell-small ({{ product.price * product.commission/100 | currency }})
      td.crud__cell
        UserCell(:user="product.user")
      td.crud__cell
        p.crud__state(
          :class='[{ "crud__state_alert": product.status === 0 }, { "crud__state_alert": product.status === 3 }]') {{ statuses[product.status] }}
</template>

<script>

import productAPI from '@/api/product'
import EditProduct from '@/components/EditProduct'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Productos',
  mixins: [ListMixin],
  methods: {
    isDeletable (product) {
      return product.status < 30
    },
    alterParams (query, filters) {
      // Cualqueir cosa que parezca un email lo aceptamos como válido.
      // Dividimos por espacios que reemplazamos por comas.
      // lo@quesea.com    otra@cosa.com => lo@quesea.com,otra@cosa.com
      if (query && /^([^ ,]+@[^ ,]+ *)+$/.test(query)) {
        filters = {...filters, users_emails: query.replace(/ +/g, ',')}
        query = null
      }
      return [query, filters]
    }
  },
  data () {
    return {
      statuses: productAPI.statuses,
      slide: EditProduct,

      objectsKey: 'products',
      loaderMethod: productAPI.get,
      deleterMethod: productAPI.delete,

      products: [],
      filters: [
        {
          label: 'ID de usuaria',
          type: 'text',
          filter: 'user_id',
          value: null
        },
        {
          label: 'Estado',
          type: 'select',
          active: null,
          options: [
            { label: 'Todos', filter: null },
            ...Object.keys(productAPI.statuses).map(status => {
              return { label: productAPI.statuses[status], filter: {status: status} }
            })
          ]
        }
      ]
    }
  }
}
</script>
