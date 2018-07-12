import PagerMixin from './PagerMixin'
import CheckableMixin from './CheckableMixin'
import ListLayout from './ListLayout'

export default {
  mixins: [PagerMixin, CheckableMixin],
  components: {
    ListLayout
  },
  data () {
    return {
      loading: true,
      order: '-id',
      filter: null,
      query: null,

      showSlide: null,
      slide: null,
      slideData: null,

      loaderMethod: null,
      objectsKey: null
    }
  },
  computed: {
    // Get the method to be called to retrieve the objects from the api.
    loader () {
      if (!this.loaderMethod) {
        console.error('loaderMethod not defined.')
        return
      }

      return this.loaderMethod
    },
    // Generic computed property to access the retrieved objects.
    // Each component can have its own name by setting "objectsKey".
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

      const localLoading = this.loading = this.loader(this.page, this.items, this.filter, this.order, this.query)
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
