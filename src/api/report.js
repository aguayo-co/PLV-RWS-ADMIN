/**
 * API Calls related to orders and their properties
 */
import Vue from 'vue';

const getInParts = (part = null, params, nexResponse = {}) => {
  if (part) {
    return Vue.axiosAuth.post(`/api/report/${part}`, nexResponse, { params })
      .then(({ data }) => {
        if (data.nextPart) {
          return getInParts(data.nextPart, params, { nexResponse: data.nexResponse })
        }
        return { data: data.nexResponse }
      })
  }

  return {}
}

export default {
  get(groupBy, from, until, tz) {
    const params = {
      groupBy,
      from,
      until,
      tz
    }
    return getInParts(1, params)
  }
}
