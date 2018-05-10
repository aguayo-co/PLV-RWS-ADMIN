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
  update: function (data) {
    const updateData = {...data}
    return Vue.axiosAuth.patch('/api/menu_items/' + data.id, updateData)
  },
  create: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Vue.axiosAuth.post('/api/menus/', formData)
  }
}
