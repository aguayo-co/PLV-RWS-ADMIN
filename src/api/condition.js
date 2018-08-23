/**
 * API Calls related to conditions and their properties
 */
import Vue from 'vue'

export default {
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
    return Vue.axiosAuth.get('/api/conditions', { params })
  },

  delete (data) {
    return Vue.axiosAuth.delete('/api/conditions/' + data.slug)
  },

  update (data) {
    return Vue.axiosAuth.patch('/api/conditions/' + data.slug, data)
  },

  create (data) {
    return Vue.axiosAuth.post('/api/conditions', data)
  }
}
