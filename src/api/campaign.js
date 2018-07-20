/**
 * API Calls related to products and their properties
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
    return Vue.axiosAuth.get('/api/campaigns', { params })
  },

  update (data) {
    return Vue.axiosAuth.patch('/api/campaigns/' + data.slug, data)
  },

  create (data) {
    return Vue.axiosAuth.post('/api/campaigns', data)
  }
}
