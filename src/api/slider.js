/**
 * API Calls related to Sliders and their properties
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
    console.log('/api/sliders?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/sliders?items=' + items + '&page=' + page + queryFilter)
  },
  update: function (data) {
    const updateData = {...data}
    delete updateData.image
    delete updateData.image_mobile
    return Vue.axiosAuth.patch('/api/sliders/' + data.slug, updateData)
  },
  updateWithImage: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return Vue.axiosAuth.patch('/api/sliders/' + data.slug, formData)
  }
}
