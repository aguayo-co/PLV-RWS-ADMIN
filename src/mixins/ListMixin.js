// Mixin para generación de listado de objetos.
// Se configura por medio de propiedades en "data".
// Cada propiedad está documentada en el objeto.
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
      // Los objetos a cargar en el listado se controlan con las
      // siguientes propiedades:

      // El método a llamar para cargar los objetos a mostrar en el listado.
      // Se puede modificar usando la propiedad computable `loader`.
      loaderMethod: null,
      // Configurable: Parámetros pasados a `loaderMethod`.
      // page: Este parámetro viene del PagerMixin.
      order: '-id',
      filter: null,
      query: null,
      objectsKey: null,
      // Configurable: Opciones de filtros para limitar reusltados
      // Debe ser un arreglo de objetos:
      // [{
      //   label: 'Valor a mostrar al usuario',
      //   filter: {
      //     filterKeyA: 'filter value',
      //     filterKeyB: 'filter value'
      //   }
      // },
      // {
      //   label: 'Valor a mostrar al usuario',
      //   filter: {
      //     filterKeyA: 'filter value',
      //     filterKeyB: 'filter value'
      //   }
      // }]
      filters: null,

      // Propiedades para controlar el manejo de formulario.
      // El formulario se puede mostrar de forma automática para editar
      // los objetos cargados.
      // O se puede disparar manualmente.

      // Configurable: Este es el componente de Vue a usar como slide.
      slide: null,
      // Configurable: Controla si se se está mostrando o no el componente.
      showSlide: null,

      // Variables interna. No se debe configurar.
      slideObject: null,
      loading: true
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
    // Verifica si podemos editar este objeto.
    isEditable (object) {
      return object !== null
    },

    updateObject (newObject) {
      // Reemplaza el objeto pasado en el arreglo de objetos.
      const replaced = this.objects.some((object, index) => {
        if (object.id === newObject.id) {
          this.$set(this.objects, index, newObject)
          return true
        }
      })
      // O refresca la lista si el objeto pasado no se encuentra listado.
      if (!replaced) {
        this.updateList()
      }
    },
    closeSlide () {
      this.slideObject = null
      this.showSlide = false
    },
    openSlide (object) {
      this.slideObject = object
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
