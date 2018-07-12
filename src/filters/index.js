export default {
  install (Vue) {
    Vue.filter('full_name', function (user) {
      return user.first_name + ' ' + user.last_name
    })

    Vue.filter('unempty', function (value) {
      return value || '--'
    })

    Vue.filter('date', function (value) {
      return value ? Vue.moment(value).format('LL') : ''
    })

    Vue.filter('date-time', function (value) {
      return value ? Vue.moment(value).format('LLL') : ''
    })

    Vue.filter('currency', function (value) {
      if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
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
    Vue.filter('groups', function (value) {
      switch (value) {
        case 1:
          return 'Prilover Star'
        case 2:
          return 'It Girls'
        case 3:
          return 'Prilovers We Love'
      }
    })
  }
}
