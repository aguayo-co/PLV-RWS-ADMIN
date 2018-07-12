/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  get: function (page = 1, items, filter, orderby, q) {
    const params = {
      page,
      items,
      orderby,
      q
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/products', { params })
  },
  update: function (data) {
    const updateData = {...data}
    delete updateData.images
    if (!updateData.admin_notes) delete updateData.admin_notes

    if (data.image_instagram instanceof Blob) {
      var formData = new FormData()
      Object.keys(updateData).forEach((key) => {
        if (key !== 'color_ids' && key !== 'campaign_ids') {
          formData.append(key, data[key])
        } else {
          data[key].forEach(value => {
            formData.append(key + '[]', value)
          })
        }
      })
      return Vue.axiosAuth.patch('/api/products/' + data.id, formData)
    } else {
      return Vue.axiosAuth.patch('/api/products/' + data.id, updateData)
    }
  }
}
