// User store will be used to handle public data regarding users.
import Vue from 'vue'
import userAPI from '@/api/user'
import userAddressesAPI from '@/api/userAddresses'

const baseUserGenerator = () => {
  return {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    picture: null,
    roles: []
  }
}

const baseStateGenerator = () => {
  return {
    ...baseUserGenerator(),
    addresses: {}
  }
}

const getters = {
  roles: state => state.roles,
  id: state => state.id
}

const actions = {
  loadUser ({ commit, dispatch }) {
    const userId = window.localStorage.getItem('userId')
    if (!userId) {
      return
    }
    return userAPI.load(userId)
      .then(response => {
        commit('set', response.data)
        dispatch('loadAddresses')
        return response
      })
      .catch(e => {
        console.log('No autenticado')
      })
  },
  loadAddresses ({ commit, state }) {
    return userAddressesAPI.load(state.id).then(response => {
      commit('setAddresses', response.data.data)
      return response
    })
  },
  update ({ commit, state }, data) {
    data.id = state.id
    return userAPI.update(data).then(response => {
      commit('set', response.data)
      return response
    })
  },
  updateWithFile ({ commit, state }, data) {
    data.id = state.id
    return userAPI.updateWithFile(data).then(response => {
      commit('set', response.data)
      return response
    })
  },
  createAddress ({ commit, state }, data) {
    data.user_id = state.id
    return userAddressesAPI.create(data).then(response => {
      commit('setAddress', response.data)
      return response
    })
  },
  updateAddress ({ commit, state }, data) {
    data.user_id = state.id
    return userAddressesAPI.update(data).then(response => {
      commit('setAddress', response.data)
      return response
    })
  },
  deleteAddress ({ commit, state }, data) {
    data.user_id = state.id
    return userAddressesAPI.delete(data).then(response => {
      commit('removeAddress', data)
      return response
    })
  },
  logOut ({ commit }) {
    commit('clear')
  },
  setUser ({ commit, dispatch }, user) {
    window.localStorage.setItem('token', user.api_token)
    window.localStorage.setItem('userId', user.id)
    dispatch('loadUser')
  }
}

const mutations = {
  set (state, user) {
    const baseUser = baseUserGenerator()
    Object.keys(baseUser).forEach((key) => {
      state[key] = user[key]
    })
  },
  setAddresses: function (state, addresses) {
    Object.keys(addresses).forEach(function (key) {
      const address = addresses[key]
      Vue.set(state.addresses, address.id, address)
    })
  },
  setAddress: function (state, address) {
    Vue.set(state.addresses, address.id, address)
  },
  setNotifications: function (state, notifications) {
    state.notifications = notifications.total
  },
  removeAddress: function (state, address) {
    Vue.delete(state.addresses, address.id)
  },
  clear (state) {
    const baseState = baseStateGenerator()
    Object.keys(baseState).forEach((key) => {
      state[key] = baseState[key]
    })
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }
}

export default {
  namespaced: true,
  state: {
    ...baseStateGenerator()
  },
  getters,
  actions,
  mutations
}
