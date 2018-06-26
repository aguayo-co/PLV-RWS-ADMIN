<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Nóminas
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
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title Estado
          th.crud__title Fecha de solicitud
          th.crud__title Monto de transferencia
          th.crud__title Nº de transacciones
          th.crud__title Acciones
      tbody.crud__tbody
        tr.crud__row(
          v-for="payroll in payrolls")
          td.crud__cell
          td.crud__cell {{ payroll.created_at | date | unempty }}
          td.crud__cell {{ payrollTotal(payroll) | unempty }}
          td.crud__cell {{ payroll.credits_transactions.length | unempty }}
          td.crud__cell
</template>

<script>
// import creditsAPI from '@/api/creditTransaction'
import payrollsAPI from '@/api/payrolls'
import Pager from '@/components/Pager'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'Payrolls',
  components: {
    Pager,
    UserAvatar
  },
  data () {
    return {
      payrolls: [],
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id'
    }
  },

  methods: {
    payrollTotal (payroll) {
      return payroll.credits_transactions.reduce((total, transaction) => total + transaction.amount, 0)
    },
    updateList: function () {
      payrollsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.payrolls = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next' && this.page < this.totalPages) {
        this.page += 1
      } else if (direction === 'prev' && this.page > 1) {
        this.page -= 1
      }
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
    }
  },
  created: function () {
    this.updateList()
  }
}
</script>
