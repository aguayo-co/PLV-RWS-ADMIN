import Pager from '@/components/Pager'

export default {
  name: 'PagerMixin',
  components: {
    Pager
  },
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
  },
  created () {
    this.updateList()
  }
}
