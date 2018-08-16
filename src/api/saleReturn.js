/**
 * API Calls related to sales and their properties
 */
import Vue from 'vue'

export default {
  statuses: {
    0: 'Pendiente',
    40: 'Enviada',
    41: 'Entregada',
    49: 'Recibida',
    50: 'Manejo Prilov',
    90: 'Completada',
    99: 'Cancelada'
  },
  get (page = 1, items, filter, orderby) {
    const params = {
      buyer: true,
      page,
      orderby,
      items
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/sale_returns', { params })
  },

  update (saleReturn) {
    return Vue.axiosAuth.patch('/api/sale_returns/' + saleReturn.id, saleReturn)
  }
}
