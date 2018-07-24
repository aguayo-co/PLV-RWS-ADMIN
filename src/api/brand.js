/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  get (page = 1, items, filter, orderby) {
    const params = {
      page,
      items,
      orderby
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/brands', { params })
  },
  update: function (data) {
    const updateData = {...data}
    return Vue.axiosAuth.patch('/api/brands/' + data.slug, updateData)
  }
}
