/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/payments?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/payments?items=' + items + '&page=' + page + queryFilter)
  },
  update: function (data) {
    const updateData = { ...data
    }
    return Vue.axiosAuth.patch('/api/payments/' + data.id, updateData)
  },
  approved: function (data) {
    return Vue.axiosAuth.post('/callback/gateway/transfer', data)
  }
}
