/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get (groupBy = 'month', from, until) {
    const params = {
      groupBy,
      from,
      until
    }
    return Vue.axiosAuth.get('/api/report', { params })
  }
}
