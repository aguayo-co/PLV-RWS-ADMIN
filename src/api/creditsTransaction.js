/**
 * API Calls related to CreditsTransactions
 */
import Vue from 'vue'

export default {
  get: function (page = 1, items, filter, orderby) {
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
    return Vue.axiosAuth.get('/api/credits_transactions', { params })
  },
  update: function (data) {
    return Vue.axiosAuth.patch('/api/credits_transactions/' + data.id, data)
  },
  create: function (data) {
    return Vue.axiosAuth.post('/api/credits_transactions/', data)
  }
}
