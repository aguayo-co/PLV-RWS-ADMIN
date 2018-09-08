/**
 * API Calls related to sales and their properties
 */
import Vue from 'vue'

export default {
  statuses: {
    10: 'Carrito de compras',
    20: 'En pago',
    30: 'Pagada',
    40: 'Enviada',
    41: 'Entregada',
    49: 'Recibida',
    90: 'Completada',
    91: 'Devuelta',
    92: 'Devolución parcial',
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
    return Vue.axiosAuth.get('/api/sales', { params })
  },

  getForReport (page = 1, items, filter, orderby) {
    const params = {
      buyer: true,
      page,
      orderby,
      items,
      withReportData: 1
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/sales', { params })
  },

  update (sale) {
    return Vue.axiosAuth.patch('/api/sales/' + sale.id, sale)
  }
}
