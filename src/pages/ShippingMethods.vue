<template lang="pug">
  ListLayout
    template(slot="title") Métodos de envío

    template(slot="columns")
      th.crud__title Nombre
      th.crud__title Descripción para vendedor
      th.crud__title Descripción para comprador
    template(
      v-for="method in methods"
      :slot="'row-' + method.id")
      td.crud__cell {{ method.name }}
      td.crud__cell {{ method.description_seller }}
      td.crud__cell {{ method.description_buyer }}
</template>

<script>
import shippingMethodAPI from '@/api/shippingMethod'
import ListMixin from '@/mixins/ListMixin'
import EditShippingMethod from '@/components/EditShippingMethod'

export default {
  name: 'ShippingMethods',
  mixins: [ListMixin],
  data () {
    return {
      expanded: null,

      query: false,
      slide: EditShippingMethod,

      objectsKey: 'methods',
      loaderMethod: shippingMethodAPI.get,
      deleterMethod: shippingMethodAPI.delete,

      methods: [],

      canCreate: true
    }
  }
}
</script>
