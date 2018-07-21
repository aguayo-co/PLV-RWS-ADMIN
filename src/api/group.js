/**
 * API Calls related to groups and their properties
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
    return Vue.axiosAuth.get('/api/groups', { params })
  },

  update (data) {
    return Vue.axiosAuth.patch('/api/groups/' + data.slug, data)
  },

  create (data) {
    return Vue.axiosAuth.post('/api/groups', data)
  }
}
