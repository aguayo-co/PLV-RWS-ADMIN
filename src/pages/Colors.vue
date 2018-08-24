<template lang="pug">
  ListLayout
    template(slot="title") Colores

    template(slot="columns")
      th.crud__title Nombre
      th.crud__title Color
      th.crud__title Código HEX
    template(
      v-for="color in colors"
      :slot="'row-' + color.id")
      td.crud__cell {{ color.name }}
      td.crud__cell(:style="'background-color:' + color.hex_code")
      td.crud__cell {{ color.hex_code }}
</template>

<script>
import colorAPI from '@/api/color'
import ListMixin from '@/mixins/ListMixin'
import EditColor from '@/components/EditColor'

export default {
  name: 'Colors',
  mixins: [ListMixin],
  data () {
    return {
      orderby: 'name',
      slide: EditColor,

      objectsKey: 'colors',
      loaderMethod: colorAPI.get,
      deleterMethod: colorAPI.delete,

      colors: [],

      canCreate: true
    }
  },
  methods: {
    alterParams (query, filters) {
      if (query) {
        filters['name'] = '%' + query + '%'
      }
      return [null, filters]
    },
    objectsChanged () {
      this.$store.dispatch('ui/loadColors')
    }
  }
}
</script>
