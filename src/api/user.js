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
  update (data) {
    return Vue.axiosAuth.patch('/api/users/' + data.id, data)
  },

  updateWithFile (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (key === 'group_ids') {
        formData.append(key + '[]', data[key][0])
        formData.append(key + '[]', data[key][1])
      } else {
        formData.append(key, data[key])
      }
    })
    return Vue.axiosAuth.patch('/api/users/' + data.id, formData)
  },

  create (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      if (key !== 'picture') {
        formData.append(key, data[key])
      } else {
        let image = data.picture
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(image.split(',')[1])

        // separate out the mime component
        var mimeString = image.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], {type: mimeString})
        var file = new File([bb], 'image' + index + '.png')
        formData.append('picture', file)
      }
    })
    return Vue.axios.post('/api/users', formData)
  },

  login (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  checkEmail (email) {
    // return Vue.axios.post('/api/users/email', payload)
    setTimeout(function () { return true }, 1000)
  },

  load (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId)
  },

  getUsersByGroup (groupId) {
    return Vue.axios.get('/api/users/?filter[group_ids]=' + groupId)
  },

  getUserById (userId) {
    return Vue.axios.get('/api/users/' + userId)
  },

  getUserGroups () {
    return Vue.axios.get('/api/groups')
  },

  search (user) {
    return Vue.axiosAuth.get('/api/users/?q=' + user)
  }
}
