/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  statuses: {
    0: 'Por aprobar',
    1: 'Rechazado',
    2: 'Oculto (por admin)',
    3: 'Con cambios (por aprobar)',
    10: 'Aprobado',
    19: 'Disponible',
    20: 'No disponible (por usuaria)',
    29: 'En vacaciones',
    30: 'En pago',
    31: 'Vendido',
    32: 'Devuelto'
  },

  get (page = 1, items, filter, orderby, q) {
    const params = {
      page,
      items,
      orderby,
      q
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/products', { params })
  },

  update (product) {
    var formData = new window.FormData()

    // Check if there are images to remove.
    if (Object.keys(product).includes('images_remove')) {
      product.images_remove.forEach((name) => {
        formData.append('images_remove[]', name)
      })
      delete product.images_remove
    }

    // Checks if there are new images.
    if (Object.keys(product).includes('images')) {
      Object.keys(product.images).forEach((key) => {
        formData.append('images[' + key + ']', product.images[key])
      })
      delete product.images
    }

    // Appends the remaining properties
    Object.keys(product).forEach((key) => {
      // If it is array, make it PHP input compatible.
      if (Array.isArray(product[key])) {
        if (!product[key].length) {
          formData.append(key, '')
        }
        product[key].forEach(value => {
          formData.append(key + '[]', value)
        })
        return
      }
      // If not, just use value as it is.
      formData.append(key, product[key])
    })

    return Vue.axiosAuth.patch('/api/products/' + product.id, formData)
  }
}
