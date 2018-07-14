<template lang="pug">
  ListLayout
    template(slot="title") Transferencias bancarias

    template(slot="columns")
      th.crud__th.crud__title Comprobante
      th.crud__th.crud__title Total
      th.crud__th.crud__title # Orden
      th.crud__th.crud__title Usuaria
      th.crud__th.crud__title Fecha de creación
      th.crud__th.crud__title Estado
    template(
      v-for="payment in payments"
      :slot="'row-' + payment.id")
      td.crud__cell
        img.crud__cell-img(
          v-if="payment.transfer_receipt",
          :src="payment.transfer_receipt",
          :alt="'Recibo-' + payment.id")
        span(v-else) -
      td.crud__cell {{ payment.request_data.amount | currency }}
      td.crud__cell {{ payment.order_id }}
      td.crud__cell {{ payment.order.user.first_name + ' ' + payment.order.user.last_name }}
      td.crud__cell {{ payment.created_at | date-time }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='"state-" + payment.status') {{ statuses[payment.status] }}

</template>

<script>

import EditPayment from '@/components/EditPayment'
import paymentAPI from '@/api/payment'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Transfers',
  mixins: [ListMixin],
  data () {
    return {
      statuses: paymentAPI.statuses,
      slide: EditPayment,

      objectsKey: 'payments',
      loaderMethod: paymentAPI.get,

      payments: [],
      filter: {
        'gateway': 'Transfer'
      }
    }
  },
  computed: {
    areCheckable () {
      return false
    }
  },
  methods: {
    isEditable (payment) {
      // Un pago una vez aprobado, no se puede cambiar.
      // Una vez cancelado tampoco.
      return payment.status !== 99 && payment.status !== 10
    }
  }
}
</script>
