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
    return Vue.axiosAuth.get('/api/categories', { params })
  },
  getBySlug: function (slug) {
    return Vue.axios.get('/api/categories/' + slug)
  },
  update: function (data) {
    const updateData = {...data}
    return Vue.axiosAuth.patch('/api/categories/' + data.slug, updateData)
  },
  create: function (data) {
    return Vue.axiosAuth.post('/api/categories/', data)
  }
}
