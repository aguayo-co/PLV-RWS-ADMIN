<template lang="pug">
  ListLayout
    template(slot="title") Categorías

    template(slot="columns")
      th.crud__title
      th.crud__title Nombre
      th.crud__title Subcategorías
    template(
      v-for="category in categories"
      :slot="'row-' + category.id")
      td.crud__cell
        template(v-if="category.children")
          button(v-if="expanded === category.id" @click="expanded = false") -
          button(v-else @click="expanded = category.id") +
      td.crud__cell {{ category.name }}
      td.crud__cell {{ category.children ? category.children.length : '' }}
</template>

<script>
import categoryAPI from '@/api/category'
import ListMixin from '@/mixins/ListMixin'
import EditCategory from '@/components/EditCategory'

export default {
  name: 'Categories',
  mixins: [ListMixin],
  data () {
    return {
      expanded: null,

      query: false,
      slide: EditCategory,

      objectsKey: 'categories',
      loaderMethod: categoryAPI.get,
      deleterMethod: categoryAPI.delete,

      rawCategories: [],

      canCreate: true
    }
  },
  computed: {
    categories: {
      set (categories) {
        this.rawCategories = categories
      },
      get () {
        const categories = []
        this.rawCategories.forEach(category => {
          categories.push(category)
          if (category.id === this.expanded) {
            Array.prototype.push.apply(categories, category.children)
          }
        })
        return categories
      }
    }
  },
  methods: {
    updateObject () {
      this.objectsChanged()
    },
    objectsChanged () {
      this.updateList()
      this.$store.dispatch('ui/loadCategories')
    }
  }
}
</script>
