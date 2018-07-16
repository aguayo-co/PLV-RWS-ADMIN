/**
 * API Calls for Payrolls
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
    return Vue.axiosAuth.get('/api/payrolls', { params })
  },
  load: function (payrollId) {
    return Vue.axiosAuth.get('/api/payrolls/' + payrollId)
  },
  create: function (transactionsIds) {
    const data = {
      credits_transactions_ids: transactionsIds
    }
    return Vue.axiosAuth.post('/api/payrolls/', data)
  },
  complete: function (payrollId, transactionsIds) {
    const data = {
      completed_credits_transactions_ids: transactionsIds
    }
    return Vue.axiosAuth.patch('/api/payrolls/' + payrollId, data)
  },
  reject: function (payrollId, transactionsIds) {
    const data = {
      rejected_credits_transactions_ids: transactionsIds
    }
    return Vue.axiosAuth.patch('/api/payrolls/' + payrollId, data)
  }
}