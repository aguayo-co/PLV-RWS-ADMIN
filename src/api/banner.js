/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getBanners: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/banners?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/banners?items=' + items + '&page=' + page + queryFilter)
  },
  update: function (data) {
    const updateData = {...data}
    delete updateData.image
    return Vue.axiosAuth.patch('/api/banners/' + data.slug, updateData)
  },
  updateWithImage: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Vue.axiosAuth.patch('/api/banners/' + data.slug, formData)
  },
  create: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Vue.axiosAuth.post('/api/banners/', formData)
  }
}
