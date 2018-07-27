/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get (groupBy, from, until, tz) {
    const params = {
      groupBy,
      from,
      until,
      tz
    }
    return Vue.axiosAuth.get('/api/report', { params })
  }
}
