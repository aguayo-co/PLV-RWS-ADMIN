/**
 * API Calls related to user addresses
 */
import Vue from 'vue'

export default {
  getRegions: function () {
    return Vue.axios.get('/api/regions/')
  },

  update: function (data) {
    const payload = {...data}
    return Vue.axiosAuth.patch('/api/users/' + data.user_id + '/addresses/' + data.id, payload)
  },

  create: function (data) {
    const userId = window.localStorage.getItem('userId')
    const payload = {
      address: data.address,
      region: data.region,
      zone: data.zone
    }

    return Vue.axiosAuth.post('/api/users/' + userId + '/addresses', payload)
  },

  load: function () {
    const userId = window.localStorage.getItem('userId')
    return Vue.axiosAuth.get('/api/users/' + userId + '/addresses')
  },

  delete: function (data) {
    return Vue.axiosAuth.delete('/api/users/' + data.user_id + '/addresses/' + data.id)
  }
}
