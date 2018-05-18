/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  get: function (page, items, filter, order, search) {
    let querySearch = ''
    let queryFilter = ''
    let queryOrder = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key]) queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    if (order) queryOrder = '&orderby=' + order
    if (search) querySearch = '&q=' + search
    return Vue.axiosAuth.get('/api/products?items=' + items + '&page=' + page + queryFilter + queryOrder + querySearch)
  },
  update: function (data) {
    const updateData = {...data}
    delete updateData.images
    return Vue.axiosAuth.patch('/api/products/' + data.id, updateData)
  }
}
