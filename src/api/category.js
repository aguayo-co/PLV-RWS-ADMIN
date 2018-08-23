/**
 * API Calls related to categories and their properties
 */
import Vue from 'vue'

export default {
  get (page = 1, items, filter, orderby, flat) {
    const params = {
      page,
      items,
      orderby,
      flat
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/categories', { params })
  },

  update (category) {
    return Vue.axiosAuth.patch('/api/categories/' + category.slug, category)
  },

  delete (category) {
    return Vue.axiosAuth.delete('/api/categories/' + category.slug)
  },

  create (category) {
    return Vue.axiosAuth.post('/api/categories', category)
  }
}
