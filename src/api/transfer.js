/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get: function (params) {
    return Vue.axiosAuth.get('/api/payments', { params })
  },
  update: function (data) {
    const updateData = { ...data
    }
    return Vue.axiosAuth.patch('/api/payments/' + data.id, updateData)
  },
  approved: function (data) {
    return Vue.axiosAuth.post('/callback/gateway/transfer', data)
  },
  rejected: function (data) {
    return Vue.axiosAuth.post('/callback/gateway/transfer', data)
  }
}
