import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import user from './modules/user'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    apiUrl: process.env.API_URL,
    frontUrl: process.env.FRONT_URL
  },
  modules: {
    ui,
    user
  },
  mutations: {
    updateField
  },
  getters: {
    getField
  },
  strict: debug
})
