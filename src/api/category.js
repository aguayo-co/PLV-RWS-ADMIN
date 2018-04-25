/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getAll: function () {
    return Vue.axios.get('/api/categories')
  },
  getBySlug: function (slug) {
    return Vue.axios.get('/api/categories/' + slug)
  },
  update: function (data) {
    const updateData = {...data}
    return Vue.axiosAuth.patch('/api/categories/' + data.slug, updateData)
  }
}
