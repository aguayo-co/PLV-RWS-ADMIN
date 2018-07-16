/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  statuses: {
    0: 'Por aprobar',
    1: 'Rechazado',
    2: 'Oculto',
    3: 'Con cambios',
    10: 'Aprobado',
    19: 'Disponible',
    20: 'No disponible',
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
    return Vue.axiosAuth.patch('/api/products/' + product.id, product)
  }
}
