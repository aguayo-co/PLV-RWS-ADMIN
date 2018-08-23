/**
 * API Calls related to menu items and their properties
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
    return Vue.axiosAuth.get('/api/menu_items', { params })
  },

  update (menuItem) {
    return Vue.axiosAuth.patch('/api/menu_items/' + menuItem.id, menuItem)
  },

  delete (menuItem) {
    return Vue.axiosAuth.delete('/api/menu_items/' + menuItem.id)
  },

  create (menuItem) {
    return Vue.axiosAuth.post('/api/menu_items', menuItem)
  }
}
