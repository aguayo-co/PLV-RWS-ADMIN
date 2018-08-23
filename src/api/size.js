/**
 * API Calls related to sizes and their properties
 */
import Vue from 'vue'

export default {
  get (page = 1, items, filter, orderby, query, flat) {
    const params = {
      page,
      items,
      orderby,
      query,
      flat
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/sizes', { params })
  },

  update (size) {
    return Vue.axiosAuth.patch('/api/sizes/' + size.id, size)
  },

  delete (size) {
    return Vue.axiosAuth.delete('/api/sizes/' + size.id)
  },

  create (size) {
    return Vue.axiosAuth.post('/api/sizes', size)
  }
}
