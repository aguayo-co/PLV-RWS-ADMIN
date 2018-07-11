/**
 * API Calls related to sales and their properties
 */
import Vue from 'vue'

export default {
  get: function (page = 1, items = 8, filter, orderby) {
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
  }
}
