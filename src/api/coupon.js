/**
 * API Calls related to coupons and their properties
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
    return Vue.axiosAuth.get('/api/coupons', { params })
  },

  update (coupon) {
    return Vue.axiosAuth.patch('/api/coupons/' + coupon.id, coupon)
  },

  delete (coupon) {
    return Vue.axiosAuth.delete('/api/coupons/' + coupon.id)
  },

  create (coupon) {
    return Vue.axiosAuth.post('/api/coupons', coupon)
  }
}
