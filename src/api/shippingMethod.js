/**
 * API Calls related to shippingMethods and their properties
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
    return Vue.axiosAuth.get('/api/shipping_methods', { params })
  },

  update (shippingMethod) {
    return Vue.axiosAuth.patch('/api/shipping_methods/' + shippingMethod.slug, shippingMethod)
  },

  delete (shippingMethod) {
    return Vue.axiosAuth.delete('/api/shipping_methods/' + shippingMethod.slug)
  },

  create (shippingMethod) {
    return Vue.axiosAuth.post('/api/shipping_methods', shippingMethod)
  }
}
