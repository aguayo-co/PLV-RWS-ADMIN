/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  get: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/products?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/products?items=' + items + '&page=' + page + queryFilter)
  },
  update: function (data) {
    const updateData = {...data}
    delete updateData.images
    return Vue.axiosAuth.patch('/api/products/' + data.id, updateData)
  }
}
