import PagerMixin from './PagerMixin'
import ListLayout from './ListLayout'

export default {
  mixins: [PagerMixin],
  components: {
    ListLayout
  },
  data () {
    return {
      loading: true,
      order: '-id',
      filter: null,

      showSlide: null,
      slide: null,
      slideData: null,

      // Required:
      loader: null,
      objectsKey: null
    }
  },
  computed: {
    objects: {
      get () {
        if (!this.objectsKey) {
          console.error('objectsKey not defined.')
          return
        }

        return this[this.objectsKey]
      },
      set (value) {
        if (!this.objectsKey) {
          console.error('objectsKey not defined.')
          return
        }

        this[this.objectsKey] = value
      }
    }
  },
  methods: {
    closeSlide () {
      this.slideData = null
      this.showSlide = false
    },
    openSlide (data) {
      this.slideData = data
      this.showSlide = true
    },
    updateList () {
      if (!this.objectsKey) {
        console.error('objectsKey not defined.')
        return
      }

      if (!this.loader) {
        console.error('Loader not defined.')
        return
      }

      const localLoading = this.loading = this.loader(this.page, this.items, this.filter, this.order)
        .then(response => {
          // Keep track of last request.
          if (localLoading !== this.loading) {
            return
          }
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.objects = response.data.data
        })
        .finally(() => {
          // Keep track of last request.
          if (localLoading !== this.loading) {
            return
          }
          this.loading = false
        })
    }
  },
  created () {
    this.updateList()
  }
}
