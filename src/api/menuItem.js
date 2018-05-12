/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getAll: function (page, items, filter) {
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
  },
  get: function (item) {
    console.log('/api/menu_items/' + item)
    return Vue.axios.get('/api/menu_items/' + item)
  },
  getItems: function () {
    console.log('/api/menu_items/')
    return Vue.axios.get('/api/menu_items/')
  },
  update: function (data) {
    const updateData = {
      id: data.id,
      name: data.name,
      url: data.url
    }
    return Vue.axiosAuth.patch('/api/menu_items/' + data.id, updateData)
  },
  create: function (data) {
    if (data.parent_id) {
      // const formData = {
      //   parent_id: data.menu_id,
      //   name: data.name,
      //   url: data.url
      // }
      delete data.menu_id
      return Vue.axiosAuth.post('/api/menu_items/', data)
    } else {
      return Vue.axiosAuth.post('/api/menus/', data)
    }
  }
}
