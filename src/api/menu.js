/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {

  getItems: function (name) {
    return Vue.axios.get('api/menus/' + name)
  },

  getMenus: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/menus?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/menus?items=' + items + '&page=' + page + queryFilter)
  }

}
