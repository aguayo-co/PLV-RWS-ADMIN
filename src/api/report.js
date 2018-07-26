/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get (groupby = 'month', since, until) {
    const params = {
      groupby,
      since,
      until
    }
    return Vue.axiosAuth.get('/api/report', { params })
  }
}
