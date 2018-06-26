/**
 * API Calls for Payrolls
 */
import Vue from 'vue'

export default {
  get: function (page = 1, items = 8, filter, orderby) {
    const params = {
      page,
      items,
      orderby
    }

    console.log(params)

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/payrolls', { params })
  },
  create: function (transactionsIds) {
    const data = {
      credits_transactions_ids: transactionsIds
    }
    return Vue.axiosAuth.post('/api/payrolls/', data)
  }
}
