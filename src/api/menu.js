/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {

  getItems: function (name) {
    return Vue.axios.get('api/menus/' + name)
  }
  
}
