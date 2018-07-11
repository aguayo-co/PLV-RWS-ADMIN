export default {
  name: 'PagerMixin',
  data () {
    return {
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10
    }
  },
  methods: {
    onPageChanged (page) {
      this.page = page
      this.updateList()
    },
    onItemsChanged (items) {
      this.page = 1
      this.items = items
      this.updateList()
    }
  }
}
