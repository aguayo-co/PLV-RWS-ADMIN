<template lang="pug">
// Pager: allows user to change number of items and pages on a table
    emit @pageChaged(direction) when users change the page
      direction = next : if next page
      direction = prev : if prev page
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
      @click.prevent="prev()")
  li.pagination__item {{ page }}
  li.pagination__item.pagination__item_txt de {{ pages }}
  li.pagination__item
    a.pagination__arrow.pagination__arrow_next.i-next(
      @click.prevent="next()")
</template>

<script>
export default {
  name: 'Pager',
  props: ['totalPages', 'currentPage'],
  data () {
    return {
      items: 10
    }
  },
  methods: {
    next () {
      if (this.currentPage === this.totalPages) {
        return
      }
      this.$emit('pageChanged', this.currentPage + 1)
    },
    prev () {
      if (this.currentPage === 1) {
        return
      }
      this.$emit('pageChanged', this.currentPage - 1)
    }
  },
  computed: {
    pages () {
      if (this.totalPages) {
        return this.totalPages
      }
      return 0
    },
    page () {
      if (this.currentPage) {
        return this.currentPage
      }
      return 1
    }
  }
}
</script>
