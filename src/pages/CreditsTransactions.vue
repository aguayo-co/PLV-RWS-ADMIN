<template lang="pug">
  ListLayout
    template(slot="title")
      template(v-if="payrollId") Nómina {{ payrollId }}:
      template  Transacciones de créditos

    template(slot="selection")
      //- Para generación de nómina:
      div(v-if="!payrollId")
        p(v-if="!checked.length") Selecciona una o más transacciones para generar una nómina de pago.
        p(v-else)
          span ¿Generar nómina de {{ checked.length }} transacciones por un total de ${{ sumChecked | currency }} CLP?
          button.crud__btn(@click="createPayroll") Generar nómina
      //- Para pago de nómina:
      div(v-else)
        p(v-if="!checked.length") Selecciona una o más transacciones para reportar como pagadas.
        p(v-else)
          span ¿Reportar como pagadas {{ checked.length }} de {{ totalItems }} transacciones?
          button.crud__btn(@click="payTransactions") Reportar pagada
          button(@click="rejectTransactions") Reportar rechazada
        p
          a.btn(v-if="payroll && hasPending" :href="payroll.download_urls[0]") Descargar pendientes
          a.btn(v-if="payroll" :href="payroll.download_urls[1]") Descargar todas

    template(slot="columns")
      th.crud__title Nómina
      th.crud__title Estado
      th.crud__title Fecha de solicitud
      th.crud__title Destinatario
      th.crud__title Banco
      th.crud__title Número de Cuenta
      th.crud__title Tipo de cuenta
      th.crud__title Monto
      th.crud__title Monto boleta
      th.crud__title Rut

    template(
      v-for="transaction in transactions"
      :slot="'row-' + transaction.id")
      td.crud__cell {{ transaction.payroll_id }}
      td.crud__cell(:class="'state-' + transaction.transfer_status") {{ status(transaction) | unempty }}
      td.crud__cell {{ transaction.created_at | date-time | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'fullName') | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'bankName') | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'accountNumber') | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'accountType') | unempty }}
      td.crud__cell {{ transaction.amount | currency | unempty }}
      td.crud__cell {{ transaction.commission | currency | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'rut') | unempty }}

    template(slot="tfoot")
      tr
        td(colspan=100)
          button(@click.prevent="openSlide({})") Crear transacción de créditos

</template>

<script>
import creditsAPI from '@/api/creditsTransaction'
import ListMixin from '@/mixins/ListMixin'
import payrollsAPI from '@/api/payrolls'
import EditCreditsTransaction from '@/components/EditCreditsTransaction'

const filters = [
  { label: 'Todos', filter: null },
  { label: 'Manuales', filter: {related_to: 'none'} },
  { label: 'De Compras', filter: {related_to: 'orders'} },
  { label: 'De Ventas', filter: {related_to: 'sales'} },
  { label: 'Transferencias', filter: {transfer_status: '0,99'} },
  { label: 'Transferencias pendientes', filter: {transfer_status: '0'} },
  { label: 'Transferencias aprobadas', filter: {transfer_status: '1'} },
  { label: 'Transferencias rechazadas', filter: {transfer_status: '99'} }
]

export default {
  name: 'CreditsTransactions',
  mixins: [ListMixin],
  props: ['payrollId'],
  data () {
    return {
      query: false,
      payroll: null,
      transactions: [],
      filter: {
        transfer_status: '0,99'
      },
      filters: this.getFilters(),

      objectsKey: 'transactions',
      slide: EditCreditsTransaction
    }
  },
  computed: {
    loader () {
      return this.payrollId ? this.loadPayroll : creditsAPI.get
    },
    transactionsPerStatus () {
      // Cuenta transacciones por su estado.
      return this.transactions.reduce((count, transaction) => {
        count[transaction.transfer_status]++
        return count
      }, {0: 0, 1: 0, 99: 0})
    },
    hasPending () {
      return this.transactionsPerStatus[0] > 0
    },
    sumChecked () {
      return this.checked.reduce((total, transaction) => total + transaction.amount, 0)
    },
    checkableObjects () {
      if (this.payrollId) {
        return this.transactions.filter(transaction => {
          return transaction.payroll_id === parseInt(this.payrollId)
        })
      }
      return this.transactions.filter(transaction => {
        return transaction.payroll_id === null && transaction.transfer_status !== null
      })
    }
  },
  methods: {
    getFilters () {
      return this.payrollId ? null : filters
    },
    // Verifica si podemos editar este objeto.
    isEditable (object) {
      return object &&
        object.order_id === null &&
        object.sale_id === null &&
        object.transfer_status === null
    },
    status (transaction) {
      switch (transaction.transfer_status) {
        case 0:
          return 'Pendiente'
        case 1:
          return 'Completada'
        case 99:
          return 'Rechazada'
      }
    },
    bankInfo (transaction, key) {
      return this.$getNestedObject(transaction, ['extra', 'bank_account', key])
    },
    loadPayroll () {
      return payrollsAPI.load(this.payrollId).then(response => {
        this.checkedIds = []
        this.payroll = response.data
        return {
          data: {
            data: this.payroll.credits_transactions,
            total: this.payroll.credits_transactions.length,
            last_page: null
          }
        }
      })
    },
    createPayroll () {
      payrollsAPI.create(this.checkedIds).then(response => {
        this.checkedIds = []
        this.$router.push({ name: 'Payroll', params: {payrollId: response.data.id} })
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'positive',
            title: 'Tu nómina ' + response.data.id + ' fue creada exitósamente.'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
      })
    },
    payTransactions () {
      payrollsAPI.complete(this.payrollId, this.checkedIds).then(response => {
        this.checkedIds = []
        this.updateList()
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'positive',
            title: 'Tu nómina fue actualizada exitósamente.'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
      })
    },
    rejectTransactions () {
      payrollsAPI.reject(this.payrollId, this.checkedIds).then(response => {
        this.checkedIds = []
        this.updateList()
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'positive',
            title: 'Tu nómina fue actualizada exitósamente.'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
      })
    }
  },
  watch: {
    payrollId () {
      this.filters = this.getFilters()
      this.updateList()
    }
  }
}
</script>
