<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Créditos transaccionales
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
          th.crud__title.crud__cell_10
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
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
          v-for="(credit, index) in credits")
          td.crud__cell.crud__cell_10
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell {{ credit.created_at | date-time | unempty }}
          td.crud__cell {{ bankInfo(credit, 'fullName') | unempty }}
          td.crud__cell {{ bankInfo(credit, 'bankName') | unempty }}
          td.crud__cell {{ bankInfo(credit, 'accountNumber') | unempty }}
          td.crud__cell {{ bankInfo(credit, 'accountType') | unempty }}
          td.crud__cell {{ credit.amount | currency | unempty }}
          td.crud__cell {{ bankInfo(credit, 'rut') | unempty }}
        tr.crud__row
          td(colspan="5")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              select.form__select
                option(value="Pendiente") Pendiente
                option(value="Rechazado") Rechazado
                option(value="Aprobado") Aprobado
                option(value="Disponible") Disponible
                option(value="No disponible") No disponible
                option(value="Vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Tercera fila
        //class para row gris en tabla: .crud__toggle-open

</template>

<script>
import creditsAPI from '@/api/creditTransaction'
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
      credits: [],
      selectedCredit: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {
        transfer_status: '0,99'
      },
      order: '-id',
      editActive: false
    }
  },

  methods: {
    bankInfo: function (transfer, key) {
      return this.$getNestedObject(transfer, ['extra', 'bank_account', key])
    },
    updateList: function () {
      creditsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.credits = response.data.data
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
    creditsAPI.get(this.page, this.items, this.filter)
      .then(response => {
        this.totalItems = response.data.total
        this.totalPages = response.data.last_page
        this.credits = response.data.data
      })
  }
}
</script>
