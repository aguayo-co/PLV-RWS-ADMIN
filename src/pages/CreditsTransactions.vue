<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title
        template(v-if="payrollId") Nómina {{ payrollId }}:
        template  Transacciones de créditos
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en créditos')
            input.search__btn(type='submit', value='')
        UserAvatar
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(
        href="#",
        title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'crédito' : 'créditos' }}
      // Paginador
      Pager(
        v-if="!payrollId",
        :currentItems="items",
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Tabla de contenido

    //- Para generación de nómina:
    div(v-if="!payrollId")
      p(v-if="!checked.length") Selecciona una o más transacciones para generar una nómina de pago.
      p(v-else)
        span ¿Generar nómina de {{ checked.length }} transaccione spor un total de ${{ sumChecked | currency }} CLP?
        button.crud__btn(@click="createPayroll") Generar nómina
    //- Para pago de nómina:
    div(v-else)
      p(v-if="!checked.length") Selecciona una o más transacciones para reportar como pagadas.
      p(v-else)
        span ¿Reportar como pagadas {{ checked.length }} de {{ totalItems }} transacciones?
        button.crud__btn(@click="payTransactions") Reportar pagada
        button(@click="rejectTransactions") Reportar rechazada
      p(v-if="payroll && hasPending")
        a.btn(:href="payroll.download_url") Descargar nómina

    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_10
            div Nómina
            input.form__input-check(
              type="checkbox"
              id="all"
              name="all"
              :disabled="!checkableTransactions.length"
              v-model="checkAll")
            label.form__label_check.i-ok(
              for="all")
          th.crud__title Estado
          th.crud__title Fecha de solicitud
          th.crud__title Destinatario
          th.crud__title Banco
          th.crud__title Número de Cuenta
          th.crud__title Tipo de cuenta
          th.crud__title Monto
          th.crud__title Rut
      TBody(:loading="loading" :content="transactions")
        tr.crud__row(
          v-for="transaction in transactions")
          td.crud__cell.crud__cell_10
            template(
              v-if="payrollId || !transaction.payroll_id")
              input.form__input-check(
                type="checkbox"
                :id="'transaction-' + transaction.id"
                :name="'transaction-' + transaction.id"
                :value="transaction"
                v-model="checked")
              label.form__label_check.i-ok(:for="'transaction-' + transaction.id")
            template(v-else) {{ transaction.payroll_id }}
          td.crud__cell(:class="'state-' + transaction.transfer_status") {{ status(transaction) | unempty }}
          td.crud__cell {{ transaction.created_at | date-time | unempty }}
          td.crud__cell {{ bankInfo(transaction, 'fullName') | unempty }}
          td.crud__cell {{ bankInfo(transaction, 'bankName') | unempty }}
          td.crud__cell {{ bankInfo(transaction, 'accountNumber') | unempty }}
          td.crud__cell {{ bankInfo(transaction, 'accountType') | unempty }}
          td.crud__cell {{ transaction.amount | currency | unempty }}
          td.crud__cell {{ bankInfo(transaction, 'rut') | unempty }}

</template>

<script>
import creditsAPI from '@/api/creditTransaction'
import payrollsAPI from '@/api/payrolls'
import UserAvatar from '@/components/UserAvatar'
import TBody from '@/components/TBody'
import PagerMixin from '@/mixins/PagerMixin'

export default {
  name: 'CreditsTransactions',
  props: ['payrollId'],
  mixins: [PagerMixin],
  components: {
    UserAvatar,
    TBody
  },
  data () {
    return {
      loading: true,
      payroll: null,
      transactions: [],
      checked: [],
      filter: {
        transfer_status: '0,99'
      },
      order: '-id'
    }
  },
  computed: {
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
    checkAll: {
      set (value) {
        if (!value) {
          this.checked = []
          return
        }

        this.checkableTransactions.forEach(transaction => {
          this.$set(this.checked, this.checked.length, transaction)
        })
      },
      get () {
        return this.checked.length && this.checkableTransactions.every(transaction => {
          return this.checked.some(checkedTransaction => checkedTransaction.id === transaction.id)
        })
      }
    },
    sumChecked () {
      return this.checked.reduce((total, transaction) => total + transaction.amount, 0)
    },
    checkableTransactions () {
      if (this.payrollId) {
        return this.transactions.filter(transaction => {
          return transaction.payroll_id === parseInt(this.payrollId)
        })
      }
      return this.transactions.filter(transaction => transaction.payroll_id === null)
    }
  },
  methods: {
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
    updateList () {
      this.loading = true
      const promise = this.payrollId ? this.loadPayroll() : this.loadTransactions()
      promise.finally(() => {
        this.loading = false
      })
    },
    loadPayroll () {
      return payrollsAPI.load(this.payrollId).then(response => {
        this.payroll = response.data
        this.transactions = response.data.credits_transactions
        this.totalItems = this.transactions.length
        this.totalPages = null
        this.checked = []
      })
    },
    loadTransactions () {
      return creditsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.transactions = response.data.data
          this.checked = []
        })
    },
    createPayroll () {
      const transactionsIds = this.checked.map(transaction => transaction.id)
      payrollsAPI.create(transactionsIds).then(response => {
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
      const transactionsIds = this.checked.map(transaction => transaction.id)
      payrollsAPI.complete(this.payrollId, transactionsIds).then(response => {
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
      const transactionsIds = this.checked.map(transaction => transaction.id)
      payrollsAPI.reject(this.payrollId, transactionsIds).then(response => {
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
      this.updateList()
    }
  }
}
</script>
