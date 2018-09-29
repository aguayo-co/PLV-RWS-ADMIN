<template lang="pug">
  ListLayout
    template(slot="title") Pagos

    template(slot="columns")
      th.crud__th.crud__title Plataforma
      th.crud__th.crud__title Comprobante
      th.crud__th.crud__title Total por pagar orden
      th.crud__th.crud__title Total pago
      th.crud__th.crud__title # Orden
      th.crud__th.crud__title Usuaria
      th.crud__th.crud__title Fecha de creación
      th.crud__th.crud__title Estado
    template(
      v-for="payment in payments"
      :slot="'row-' + payment.id")
      td.crud__cell {{ payment.gateway }}
      td.crud__cell
        img.crud__cell-img(
          v-if="payment.transfer_receipt",
          :src="payment.transfer_receipt",
          :alt="'Recibo-' + payment.id")
        span(v-else) -
      td.crud__cell {{ payment.order.due | currency }}
      td.crud__cell {{ payment.amount | currency }}
      td.crud__cell {{ payment.order_id }}
      td.crud__cell
        UserCell(:user="payment.order.user")
      td.crud__cell {{ payment.created_at | date-time }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='{"state-warning": [0, 1].indexOf(payment.status) !== -1}') {{ statuses[payment.status] }}
    template(
      v-for="payment in payments"
      :slot="payment.id + '-actions'")
      button(
        v-if="isCancelable(payment) && !canceling[payment.id]"
        @click="$set(canceling, payment.id, 'confirm')") Cancelar la compra
      template(v-if="canceling[payment.id]")
        p Confirma:
        button(
          @click="cancel(payment)"
          :disabled="canceling[payment.id] === true")
          Dots(v-if="canceling[payment.id] === true")
          template(v-else) Si, Cancelar la compra
        button(
          @click="$delete(canceling, payment.id)"
          :disabled="canceling[payment.id] === true") No

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
      query: false,
      statuses: paymentAPI.statuses,
      slide: EditPayment,

      objectsKey: 'payments',
      loaderMethod: paymentAPI.get,

      payments: [],
      filters: [
        {
          label: 'ID de orden',
          type: 'text',
          filter: 'order_id',
          value: null
        },
        {
          label: 'Plataforma de pago',
          type: 'select',
          active: null,
          options: [
            { label: 'Todas', filter: null },
            { label: 'MercadoPago', filter: {'gateway': 'MercadoPago'} },
            { label: 'Transferencia', filter: {'gateway': 'Transfer'} },
            { label: 'PayU', filter: {'gateway': 'PayU'} },
            { label: 'Créditos - Gratuito', filter: {'gateway': 'Free'} }
          ]
        }
      ],

      canceling: []
    }
  },
  methods: {
    cancel (payment) {
      this.$set(this.canceling, payment.id, true)
      const payload = {
        id: payment.id,
        cancel: 'cancel'
      }
      paymentAPI.update(payload)
        .then(response => {
          this.updateObject(response.data)
        }).catch(e => {
          this.$handleApiErrors(e)
        }).finally(() => {
          this.$delete(this.canceling, payment.id)
        })
    },
    isCancelable (payment) {
      return payment.status === 0 || payment.status === 98
    },
    isEditable (payment) {
      // Un pago una vez aprobado, no se puede cambiar.
      // Una vez cancelado tampoco.
      return payment.gateway === 'Transfer' && payment.status !== 99 && payment.status !== 10
    }
  }
}
</script>
