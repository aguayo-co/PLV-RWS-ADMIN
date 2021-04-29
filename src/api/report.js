/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue'

export default {
  get(groupBy, from, until, tz) {
    const params = {
      groupBy,
      from,
      until,
      tz
    }
    return Vue.axiosAuth.get('/api/report/first', { params })
      .then(firstResponse => {
        const secondData = { firstPart: firstResponse.data }
        return Vue.axiosAuth.post('/api/report/second', secondData, { params })
          .then(secondResponse => {
            const thirdData = { secondPart: secondResponse.data }
            return Vue.axiosAuth.post('/api/report/third', thirdData, { params })
          })
      })
  }
}
