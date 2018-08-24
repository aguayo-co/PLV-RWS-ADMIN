import productAPI from '@/api/product'
export default {
  methods: {
    replicate (product) {
      productAPI.replicate(product)
        .then(response => {
          const modal = {
            name: 'ModalMessage',
            parameters: {
              title: 'Producto replicado.',
              body: 'Nuevo ID de producto: ' + response.data.id,
              linkTitle: 'Ver producto',
              linkURL: this.$store.state.frontUrl + '/producto/-__' + response.data.id,
              type: 'positive'
            }
          }
          product.extra = product.extra ? product.extra : []
          product.extra.replicated = response.data.id
          this.$store.dispatch('ui/showModal', modal)
        }).catch(e => {
          this.$handleApiErrors(e)
        })
    },
    canReplicateProduct (product) {
      if (product.extra && product.extra.replicated) {
        return false
      }
      return true
    }
  }
}
