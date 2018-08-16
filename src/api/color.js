/**
 * API Calls related to colors and their properties
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
    return Vue.axiosAuth.get('/api/colors', { params })
  },

  update (color) {
    return Vue.axiosAuth.patch('/api/colors/' + color.slug, color)
  },

  delete (color) {
    return Vue.axiosAuth.delete('/api/colors/' + color.slug)
  },

  create (color) {
    return Vue.axiosAuth.post('/api/colors', color)
  }
}
