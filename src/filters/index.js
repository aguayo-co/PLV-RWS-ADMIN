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

    Vue.filter('sale_status', function (value) {
      switch (value) {
        case 10:
          return 'Carro de compras'
        case 20:
          return 'En pago'
        case 30:
          return 'Pagada'
        case 40:
          return 'Enviada'
        case 41:
          return 'Entregada'
        case 49:
          return 'Recibida'
        case 90:
          return 'Completada'
        case 91:
          return 'Devolución'
        case 92:
          return 'Devolución parcial'
        case 99:
          return 'Cancelada'
        default:
          return 'Carro de compras'
      }
    })
  }
}
