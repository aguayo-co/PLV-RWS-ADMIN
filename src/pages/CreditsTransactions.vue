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
          span ¿Generar nómina de {{ checked.length }} transacciones por un total de {{ sumChecked | currency }} CLP?
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
      th.crud__title # de órden
      th.crud__title # de venta
      th.crud__title Usuaria
      th.crud__title Estado
      th.crud__title Fecha de creación
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
      td.crud__cell {{ transaction.order_id }}
      td.crud__cell {{ transaction.sale_id }}
      td.crud__cell
        UserCell(:user="transaction.user")
      td.crud__cell {{ status(transaction) | unempty }}
      td.crud__cell {{ transaction.created_at | date-time | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'fullName') | unempty }}
      td.crud__cell {{ banks[bankInfo(transaction, 'bankId')] | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'accountNumber') | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'accountType') | unempty }}
      td.crud__cell {{ transaction.amount | currency | unempty }}
      td.crud__cell {{ transaction.commission | currency | unempty }}
      td.crud__cell {{ bankInfo(transaction, 'rut') | unempty }}
</template>

<script>
import creditsAPI from '@/api/creditsTransaction'
import ListMixin from '@/mixins/ListMixin'
import payrollsAPI from '@/api/payrolls'
import EditCreditsTransaction from '@/components/EditCreditsTransaction'

const filters = [
  {
    label: 'ID de usuaria',
    type: 'text',
    filter: 'user_id',
    value: null
  },
  {
    label: 'Tipo de transacción',
    type: 'select',
    active: {transfer_status: '0,99'},
    options: [
      { label: 'Todos', filter: null },
      { label: 'Manuales', filter: {related_to: 'none'} },
      { label: 'De Compras', filter: {related_to: 'orders'} },
      { label: 'De Ventas', filter: {related_to: 'sales'} },
      { label: 'Transferencias', filter: {transfer_status: '0,99'} },
      { label: 'Transferencias pendientes', filter: {transfer_status: '0'} },
      { label: 'Transferencias aprobadas', filter: {transfer_status: '1'} },
      { label: 'Transferencias rechazadas', filter: {transfer_status: '99'} },
      { label: 'Transferencias con devoluciones recientes', filter: {transfer_status: '0', recent_returns: true} }
    ]
  }
]

const banks = {
  1: 'Banco de Chile / A. Edwards / Citibank N.A.',
  12: 'Banco del Estado de Chile',
  37: 'Banco Santander - Santiago',
  51: 'Banco Falabella',
  16: 'Banco Crédito e Inversiones',
  27: 'Corpbanca',
  28: 'Banco Bice',
  14: 'Scotiabank',
  39: 'Banco Itaú',
  49: 'Banco Security',
  55: 'Banco Consorcio',
  504: 'BBVA Banco Bhif',
  507: 'Banco del Desarrollo',
  53: 'Banco Ripley',
  9: 'Banco Internacional',
  11: 'Dresdner Bank Leteinamerika',
  17: 'Banco Do Brasil S.A.',
  31: 'HSBC Bank Chile',
  41: 'JP Morgan Chase Bank',
  43: 'Banco de la Nación Argentina',
  45: 'The Bank of Tokyo – Mitsubishi',
  46: 'Abn Amro Bank (Chile)',
  52: 'Deutsche Bank (Chile)',
  54: 'HNS Banco',
  734: 'Banco Conosur',
  57: 'Banco Paris'
}

export default {
  name: 'CreditsTransactions',
  mixins: [ListMixin],
  props: ['payrollId'],
  data () {
    return {
      banks,
      query: false,
      payroll: null,
      transactions: [],
      filters: this.getFilters(),

      objectsKey: 'transactions',
      slide: EditCreditsTransaction,

      canCreate: true
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
    isEditable (transaction) {
      return transaction &&
        transaction.order_id === null &&
        transaction.sale_id === null &&
        transaction.transfer_status === null
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
