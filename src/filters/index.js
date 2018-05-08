export default {
  install (Vue) {
    Vue.filter('currency', function (value) {
      if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    })

    Vue.filter('status_code', function (value) {
      switch (value) {
        case 0:
          return 'Pendiente'
        case 1:
          return 'Rechazado'
        case 10:
          return 'Aprobado'
        case 19:
          return 'Disponible'
        case 30:
          return 'Vendido'
        default:
          return 'Deshabilitado'
      }
    })

    Vue.filter('payment_status', function (value) {
      switch (value) {
        case 0:
          return 'Pendiente'
        case 1:
          return 'En proceso'
        case 10:
          return 'Aprobado'
        case 98:
          return 'Error'
        case 99:
          return 'Cancelado'
        default:
          return 'Deshabilitado'
      }
    })
  }
}
