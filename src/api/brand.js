/**
 * API Calls related to brands and their properties
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

  update (brand) {
    return Vue.axiosAuth.patch('/api/brands/' + brand.slug, brand)
  },

  delete (brand) {
    return Vue.axiosAuth.delete('/api/brands/' + brand.slug)
  },

  create (brand) {
    return Vue.axiosAuth.post('/api/brands', brand)
  }
}
