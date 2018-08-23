<template lang="pug">
  ListLayout
    template(slot="title") Tallas

    template(slot="columns")
      th.crud__title
      th.crud__title Nombre
      th.crud__title Subtallas
    template(
      v-for="size in sizes"
      :slot="'row-' + size.id")
      td.crud__cell
        template(v-if="size.children")
          button(v-if="expanded === size.id" @click="expanded = false") -
          button(v-else @click="expanded = size.id") +
      td.crud__cell {{ size.name }}
      td.crud__cell {{ size.children ? size.children.length : '' }}
</template>

<script>
import sizeAPI from '@/api/size'
import ListMixin from '@/mixins/ListMixin'
import EditSize from '@/components/EditSize'

export default {
  name: 'Sizes',
  mixins: [ListMixin],
  data () {
    return {
      expanded: null,

      query: false,
      slide: EditSize,

      objectsKey: 'sizes',
      loaderMethod: sizeAPI.get,
      deleterMethod: sizeAPI.delete,

      rawSizes: [],

      canCreate: true
    }
  },
  computed: {
    sizes: {
      set (sizes) {
        this.rawSizes = sizes
      },
      get () {
        const sizes = []
        this.rawSizes.forEach(size => {
          sizes.push(size)
          if (size.id === this.expanded) {
            Array.prototype.push.apply(sizes, size.children)
          }
        })
        return sizes
      }
    }
  },
  methods: {
    updateObject () {
      this.objectsChanged()
    },
    objectsChanged () {
      this.updateList()
      this.$store.dispatch('ui/loadSizes')
    }
  }
}
</script>
