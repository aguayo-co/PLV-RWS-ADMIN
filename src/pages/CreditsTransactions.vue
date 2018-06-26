<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Transacciones de créditos
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
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Tabla de contenido

    div
      p(v-if="!checked.length") Selecciona una o más transacciones para generar una nómina de pago.
      div(v-else)
        span ¿Generar nómina de {{ checked.length }} transaccione spor un total de ${{ sumChecked | currency }} CLP?
        button.crud__btn(@click="createPayroll") Generar nómina

    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_10
            div Nómina
            input.form__input-check(
              type="checkbox"
              id="all"
              name="all"
              :disabled="!payableTransactions.length"
              v-model="checkAll")
            label.form__label_check.i-ok(
              for="all")
          th.crud__title Fecha de solicitud
          th.crud__title Destinatario
          th.crud__title Banco
          th.crud__title Número de Cuenta
          th.crud__title Tipo de cuenta
          th.crud__title Monto
          th.crud__title Rut
      tbody.crud__tbody
        tr.crud__row(
          v-for="transaction in transactions")
          td.crud__cell.crud__cell_10
            template(
              v-if="!transaction.payroll_id")
              input.form__input-check(
                type="checkbox"
                :id="'transaction-' + transaction.id"
                :name="'transaction-' + transaction.id"
                :value="transaction"
                v-model="checked")
              label.form__label_check.i-ok(:for="'transaction-' + transaction.id")
            template(v-else) {{ transaction.payroll_id }}
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
import Pager from '@/components/Pager'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'CreditsTransactions',
  components: {
    Pager,
    UserAvatar
  },
  data () {
    return {
      transactions: [],
      checked: [],
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {
        transfer_status: '0,99'
      },
      order: '-id'
    }
  },
  computed: {
    checkAll: {
      set (value) {
        if (!value) {
          this.checked = []
          return
        }

        this.payableTransactions.forEach(transaction => {
          this.$set(this.checked, this.checked.length, transaction)
        })
      },
      get () {
        return this.checked.length && this.payableTransactions.every(transaction => {
          return this.checked.some(checkedTransaction => checkedTransaction.id === transaction.id)
        })
      }
    },
    sumChecked () {
      return this.checked.reduce((total, transaction) => total + transaction.amount, 0)
    },
    payableTransactions () {
      return this.transactions.filter(transaction => transaction.payroll_id === null)
    }
  },
  methods: {
    bankInfo (transfer, key) {
      return this.$getNestedObject(transfer, ['extra', 'bank_account', key])
    },
    updateList () {
      creditsAPI.get(this.page, this.items, this.filter)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.transactions = response.data.data
        })
    },
    onPageChanged (direction) {
      if (direction === 'next' && this.page < this.totalPages) {
        this.page += 1
      } else if (direction === 'prev' && this.page > 1) {
        this.page -= 1
      }
      this.updateList()
    },
    onItemsChanged (items) {
      this.items = items
      this.updateList()
    },
    createPayroll () {
      const transactionsIds = this.checked.map(transaction => transaction.id)
      payrollsAPI.create(transactionsIds).then(response => {
        this.$router.push({ name: 'Payrolls' })
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'positive',
            title: 'Tu nómina ' + response.data.id + ' fue creada exitósamente.'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
      })
    }
  },
  created () {
    this.updateList()
  }
}
</script>
