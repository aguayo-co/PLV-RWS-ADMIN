import EditLayout from './EditLayout'

/**
 * Los valores de los formularios los almacenamos en local hasta
 * que se guarden en el servidor.
 * No se deben modificar directamente en el objeto editado hasta
 * que no se reciba confirmación de que se guarda correctamente
 * con el API.
 *
 * Adicional, esto nos permite mantener separados los valores
 * originales del objeto, de los modificados.
 *
 * Los valores modificados se guardan en el objeto "newData",
 * las propiedades computables tienen en nombre `field_PROPIEDAD`,
 * donde PROPIEDAD es el nombre de la propiedad modificable.
 */
function createComputedProps (editableProps) {
  const computed = {}
  Object.keys(editableProps).forEach(function (key) {
    computed['field_' + key] = {
      get () {
        return this.newData[key] !== undefined ? this.newData[key] : this.object[key]
      },
      set (value) {
        this.$delete(this.errorLog, key)
        if (value === this.object[key]) {
          this.$delete(this.newData, key)
          return
        }
        this.$set(this.newData, key, value)
      }
    }
  })
  return computed
}

// Este Mixin requiere un listado de las propiedades editables
// del objeto editado:
//    EditFormMixin(editableProps)
export default (editableProps) => {
  return {
    props: ['object', 'extraData'],
    components: {
      EditLayout
    },
    data () {
      return {
        idPropertyName: 'id',
        saving: false,
        newData: {},
        errorLog: {}
      }
    },
    computed: {
      ...createComputedProps(editableProps),
      // Sobre escribir este método para modificar los datos a enviar.
      payload () {
        return this.newData
      }
    },
    methods: {
      validate () {
        return true
      },
      submit () {
        this.saving = true
        if (!this.validate()) {
          this.saving = false
          return
        }

        const payload = this.payload
        if (this.object[this.idPropertyName]) {
          payload[this.idPropertyName] = this.object[this.idPropertyName]
        }
        this.apiMethod(payload).then(response => {
          this.$emit('updated', response.data)
          this.$emit('close')
        }).catch(e => {
          this.$handleApiErrors(e, Object.keys(editableProps), this.errorLog)
        }).finally(() => {
          this.saving = false
        })
      }
    }
  }
}
