export default {
  data () {
    return {
      pagingTimeoutId: null,
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10
    }
  },
  methods: {
    pageChanged (page) {
      this.page = page
      this.loading = true
      clearTimeout(this.pagingTimeoutId)
      // Espera en caso de que la persona esté cambiando de página
      // rápidamente (de la 1 a la 4, por ejemplo) para evitar hacer
      // múltiples request simultáneos.
      this.pagingTimeoutId = setTimeout(this.updateList, 1000)
    },
    itemsChanged (items) {
      this.page = 1
      this.items = items
      this.updateList()
    }
  }
}
