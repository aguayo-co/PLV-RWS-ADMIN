// User store will be used to handle public data regarding users.
import Vue from 'vue'
import router from '@/router'
import userAPI from '@/api/user'

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
        const user = response.data
        const isAdmin = user.roles.some(role => role.id === 1)
        if (!isAdmin) {
          dispatch('logOut')
          const modal = {
            name: 'ModalMessage',
            parameters: {
              title: 'No tienes los permisos necesarios.',
              type: 'alert'
            }
          }
          dispatch('ui/showModal', modal, { root: true })
          return response
        }
        commit('set', user)
        return response
      })
      .catch(e => {
        const code = Vue.getNestedObject(e, ['response', 'status'])
        // Not all errors should log the user out.
        // Some errors are handled by our axios instance axios.
        // Others, deal here if necessary.
        switch (code) {
          case 404:
            dispatch('logOut')
        }
      })
  },
  logOut ({ commit }) {
    commit('clear')
    router.push({name: 'Home'})
  },
  setUser ({ dispatch }, user) {
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
