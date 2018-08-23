// UI store will be used to handle data regarding general elements of UI.
// import productsAPI from '@/api/product'
import menusAPI from '@/api/menu'
import categoriesAPI from '@/api/category'
import conditionsAPI from '@/api/condition'
import colorsAPI from '@/api/color'
import brandsAPI from '@/api/brand'
import sizesAPI from '@/api/size'
import campaignsAPI from '@/api/campaign'
import groupAPI from '@/api/group'

// initial state
const state = {
  // Modal property is used to define if the application is showing a modal
  modal: false,
  modalWindow: {
    enabled: false,
    name: null,
    parameters: {}
  },
  menus: {},
  conditions: [],
  colors: [],
  brands: [],
  sizes: [],
  categories: [],
  regions: []
}

// getters
const getters = {
  modal: state => state.modal,
  modalWindow: state => state.modalWindow
}

// actions
const actions = {
  loadProperties ({ dispatch, commit }) {
    conditionsAPI.get()
      .then(response => {
        const property = {
          name: 'conditions',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
    menusAPI.getMenus()
      .then(response => {
        const menus = {}
        response.data.data.forEach((menu) => {
          menus[menu.slug] = menu
        })
        const property = {
          name: 'menus',
          data: menus
        }
        commit('setProperty', { property })
      })
    dispatch('loadSizes')
    dispatch('loadColors')
    dispatch('loadCampaigns')
    dispatch('loadCategories')
    dispatch('loadBrands')
    dispatch('loadGroups')
  },
  loadColors ({ commit }) {
    colorsAPI.get(1, 10000)
      .then(response => {
        const colors = response.data.data.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'colors',
          data: colors
        }
        commit('setProperty', { property })
      })
  },
  loadSizes ({ commit }) {
    sizesAPI.get(1, 10000, null, null, true)
      .then(response => {
        const property = {
          name: 'sizes',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
  },
  loadCategories ({ commit }) {
    categoriesAPI.get(1, 10000)
      .then(response => {
        response.data.data.forEach((category) => {
          category.children.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          })
        })
        const property = {
          name: 'categories',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
  },
  loadBrands ({ commit }) {
    brandsAPI.get(1, 10000)
      .then(response => {
        const brands = response.data.data.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        const property = {
          name: 'brands',
          data: brands
        }
        commit('setProperty', { property })
      })
  },
  loadCampaigns ({ commit }) {
    campaignsAPI.get(1, 10000)
      .then(response => {
        const property = {
          name: 'campaigns',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
  },
  loadGroups ({ commit }) {
    groupAPI.get(1, 10000)
      .then(response => {
        const property = {
          name: 'groups',
          data: response.data.data
        }
        commit('setProperty', { property })
      })
  },
  clearBody (context) {
    context.commit('noModal')
  },
  switchModal (context) {
    context.commit('switchModal')
  },
  showModal (context, { name, parameters }) {
    context.commit('modalWindow', { name, parameters })
  },
  closeModal (context) {
    context.commit('closeModal')
  }
}

// mutations
const mutations = {
  setProperty (state, { property }) {
    state[property.name] = property.data
  },
  switchModal (state) {
    state.modal = !state.modal
  },
  noModal (state) {
    state.modal = false
  },
  modalWindow (state, { name, parameters }) {
    state.modalWindow.enabled = true
    state.modalWindow.name = name
    state.modalWindow.parameters = parameters
    state.modal = true
  },
  closeModal (state) {
    state.modalWindow.enabled = false
    state.modalWindow.name = null
    state.modal = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
