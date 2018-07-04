<template lang="pug">
// Pager: allows user to change number of items and pages on a table
    emit @pageChaged(page) when users change the page
ul.pagination
  li.pagination__select
    select.form__select.form__select_small(
    name="numeroItems",
    v-model="items",
    @change="$emit('itemsChanged', items)")
      option(value="10") 10
      option(value="20") 20
      option(value="30") 30
      option(value="50") 50
  li.pagination__item
    a.pagination__arrow.pagination__arrow_prev.i-back(
      @click.prevent="changePage(-1)")
  li.pagination__item {{ this.newPage }}
  li.pagination__item.pagination__item_txt de {{ totalPages | unempty }}
  li.pagination__item
    a.pagination__arrow.pagination__arrow_next.i-next(
      @click.prevent="changePage(1)")
</template>

<script>
export default {
  name: 'Pager',
  props: ['totalPages', 'currentPage', 'currentItems'],
  data () {
    return {
      timeoutId: null,
      newPage: this.currentPage,
      items: this.currentItems
    }
  },
  watch: {
    currentPage (newPage) {
      this.newPage = newPage
    },
    currentItems (items) {
      this.items = items
    }
  },
  methods: {
    changePage (pages) {
      const newPage = this.newPage + pages

      // Do not go out of range.
      if (newPage > this.totalPages || newPage < 1) {
        return
      }
      clearTimeout(this.timoeoutId)
      this.newPage = newPage
      this.timoeoutId = setTimeout(() => { this.$emit('pageChanged', newPage) }, 500)
    }
  }
}
</script>
