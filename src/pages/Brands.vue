<template lang="pug">
  ListLayout
    template(slot="title") Marcas

    template(slot="columns")
      th.crud__title Nombre
      th.crud__title URL
    template(
      v-for="brand in brands"
      :slot="'row-' + brand.id")
      td.crud__cell {{ brand.name }}
      td.crud__cell {{ brand.url }}
</template>

<script>
import brandAPI from '@/api/brand'
import ListMixin from '@/mixins/ListMixin'
import EditBrand from '@/components/EditBrand'

export default {
  name: 'Brands',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditBrand,

      objectsKey: 'brands',
      loaderMethod: brandAPI.get,
      deleterMethod: brandAPI.delete,

      brands: [],

      canCreate: true
    }
  },
  methods: {
    objectsChanged () {
      this.$store.dispatch('ui/loadBrands')
    }
  }
}
</script>
