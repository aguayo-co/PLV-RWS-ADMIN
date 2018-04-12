/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getSizes: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/sizes?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/sizes?items=' + items + '&page=' + page + queryFilter)
  }
}
