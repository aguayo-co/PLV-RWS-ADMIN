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
      if (value) return '$' + value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
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
