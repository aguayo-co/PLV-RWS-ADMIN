<template lang="pug">
  ListLayout
    template(slot="title") Nóminas

    template(slot="columns")
      th.crud__title Estado
      th.crud__title Fecha de solicitud
      th.crud__title Monto de transferencia
      th.crud__title Monto boleta
      th.crud__title Nº de transacciones
      th.crud__title Acciones

    template(
      v-for="payroll in payrolls"
      :slot="'row-' + payroll.id")
        td.crud__cell(:class="statusClass(payroll)") {{ status(payroll) | unempty }}
        td.crud__cell {{ payroll.created_at | date | unempty }}
        td.crud__cell {{ payrollTotal(payroll) | currency | unempty }}
        td.crud__cell {{ payrollCommission(payroll) | currency | unempty }}
        td.crud__cell {{ payroll.credits_transactions.length | unempty }}
        td.crud__cell
          a.btn(
            v-if="hasPending(payroll)"
            :href="payroll.download_urls[0]") Descargar pendientes
          router-link.btn(
            :to="{name: 'Payroll', params: {payrollId: payroll.id}}") Reportar pago
</template>

<script>
import payrollsAPI from '@/api/payrolls'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Payrolls',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      loaderMethod: payrollsAPI.get,
      payrolls: [],
      objectsKey: 'payrolls'
    }
  },
  computed: {
    checkableObjects () {
      return []
    }
  },
  methods: {
    transactionsPerStatus (payroll) {
      // Cuenta transacciones por su estado.
      return payroll.credits_transactions.reduce((count, transaction) => {
        count[transaction.transfer_status]++
        return count
      }, {0: 0, 1: 0, 99: 0})
    },
    hasPending (payroll) {
      const count = this.transactionsPerStatus(payroll)
      return count[0] > 0
    },
    statusClass (payroll) {
      const count = this.transactionsPerStatus(payroll)

      // La orden puede estar completada, pendiente o parcialmente completada.
      switch (payroll.credits_transactions.length) {
        case count[1]:
          return 'state-1'
        case count[99]:
          return 'state-99'
        case count[1] + count[99]:
          return 'state-x'
        default:
          return 'state-0'
      }
    },
    status (payroll) {
      const count = this.transactionsPerStatus(payroll)

      // La orden puede estar completada, pendiente o parcialmente completada.
      switch (payroll.credits_transactions.length) {
        case count[1]:
          return 'Pagada'
        case count[99]:
          return 'Rechazada'
        case count[1] + count[99]:
          return 'Pagada con rechazos'
        default:
          return 'Pendiente'
      }
    },
    payrollTotal (payroll) {
      return -payroll.credits_transactions.reduce((total, transaction) => total + transaction.amount, 0)
    },
    payrollCommission (payroll) {
      return -payroll.credits_transactions.reduce((total, transaction) => total + transaction.commission, 0)
    }
  }
}
</script>
