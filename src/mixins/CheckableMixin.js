export default {
  data () {
    return {
      checked: [],
      checkedIds: []
    }
  },
  computed: {
    isCheckable () {
      return this.checkableObjects && this.checkableObjects.length
    },
    // Get a list of the objects that can be checked.
    // By default all, but each component can override.
    checkableObjects () {
      return this.objects
    },
    // Set to `true` to check all possible objects.
    // Set to `false` to un-check all possible objects.
    checkAll: {
      set (value) {
        if (!value) {
          this.checkedIds = []
          return
        }

        // Only check the objects that are checkable.
        this.checkableObjects.forEach(item => {
          if (this.checkedIds.indexOf(item.id) === -1) {
            this.$set(this.checkedIds, this.checkedIds.length, item.id)
          }
        })
      },
      get () {
        return this.checkedIds.length && this.checkableObjects.every(item => {
          return this.checkedIds.some(id => id === item.id)
        })
      }
    }
  },
  methods: {
    checkable (object) {
      return this.checkableObjects.some(checkableObjects => checkableObjects.id === object.id)
    }
  },
  watch: {
    checkedIds (checkedIds) {
      const checked = []
      // Add to the list any missing ID.
      checkedIds.forEach((id, index) => {
        // Search for the object in the current page objects.
        let object = this.checkableObjects.find(object => object.id === id)

        // Search for the object in previously selected objects.
        // It might be from a previous page.
        if (!object) {
          object = this.checked.find(object => object.id === id)
        }

        checked[index] = object
      })
      this.checked = checked
    }
  }
}
