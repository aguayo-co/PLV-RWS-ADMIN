export default {
  install (Vue) {
    // Busca de forma recursiva en un objeto sin necesidad de verificar
    // que todas las propiedades estén definidas.
    //
    // @param  nestedObj El objeto.
    // @param  pathArr   Un arreglo con las llaves de la ruta a buscar.
    const getNestedObject = function (nestedObj, pathArr) {
      return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj)
    }
    Vue.getNestedObject = getNestedObject
    Vue.prototype.$getNestedObject = getNestedObject
  }
}
