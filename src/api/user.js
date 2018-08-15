/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  get (page = 1, items, filter, orderby, q) {
    const params = {
      page,
      items,
      orderby,
      q
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/users', { params })
  },

  delete (user) {
    return Vue.axiosAuth.delete('/api/users/' + user.id)
  },

  update (user) {
    var formData = new window.FormData()

    Object.keys(user).forEach((key) => {
      // Si es arreglo, pasarlo compatible con PHP.
      if (Array.isArray(user[key])) {
        // En FormData no hay como mandar un arreglo vacío.
        // Mandamos un valor vacío, que al API también acepta.
        if (!user[key].length) {
          formData.append(key, '')
          return
        }

        // Si sí hay valores en el arreglo,
        // agregamos cada uno a FormData.
        user[key].forEach(value => {
          formData.append(key + '[]', value)
        })
        return
      }

      // Si no es arreglo, lo agregamos como venga.
      formData.append(key, user[key])
    })

    return Vue.axiosAuth.patch('/api/users/' + user.id, formData)
  },

  login (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  load (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId)
  }
}
