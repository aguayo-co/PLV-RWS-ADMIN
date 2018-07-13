/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  statuses: {
    0: 'Pendiente',
    1: 'Procesando',
    10: 'Exitosa',
    98: 'Rechazada',
    99: 'Cancelada'
  },

  get (page = 1, items, filter, orderby) {
    const params = {
      page,
      items,
      orderby
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/payments', { params })
  },

  getById: function (id) {
    return Vue.axiosAuth.get('/api/payments/' + id)
  },

  update: function (payment) {
    return Vue.axiosAuth.patch('/api/payments/' + payment.id, payment)
  },

  approve: function (payment) {
    const data = {
      reference: payment.request_data.reference,
      status: 'approved'
    }
    return Vue.axiosAuth.post('/callback/gateway/transfer', data)
  },

  reject: function (payment) {
    const data = {
      reference: payment.request_data.reference,
      status: 'rejected'
    }
    return Vue.axiosAuth.post('/callback/gateway/transfer', data)
  }
}
