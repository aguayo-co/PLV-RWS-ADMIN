/**
 * API Calls related to Sliders and their properties
 */
import Vue from 'vue'

function formData (data) {
  const formData = new window.FormData()

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  return formData
}

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
    return Vue.axiosAuth.get('/api/sliders', { params })
  },

  delete (data) {
    return Vue.axiosAuth.delete('/api/sliders/' + data.slug)
  },

  update (data) {
    return Vue.axiosAuth.patch('/api/sliders/' + data.slug, formData(data))
  },

  create (data) {
    return Vue.axiosAuth.post('/api/sliders', formData(data))
  }
}
