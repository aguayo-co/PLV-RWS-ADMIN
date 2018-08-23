/**
 * API Calls related to menus and their properties
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
    return Vue.axiosAuth.get('/api/menus', { params })
  },

  update (menu) {
    return Vue.axiosAuth.patch('/api/menus/' + menu.slug, menu)
  },

  delete (menu) {
    return Vue.axiosAuth.delete('/api/menus/' + menu.slug)
  },

  create (menu) {
    return Vue.axiosAuth.post('/api/menus', menu)
  }
}
