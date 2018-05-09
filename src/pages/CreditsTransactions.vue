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
          th.crud__title.crud__cell_22 Monto
          th.crud__title.crud__cell_22 Estado de tranferencia
          th.crud__title.crud__cell_22 Fecha de creación
          th.crud__title.crud__cell_22 Fecha de modificación
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
          td.crud__cell.crud__cell_22 {{ credit.amount | currency }}
          td.crud__cell.crud__cell_22(v-if="credit.transfer_status == null") --
          td.crud__cell.crud__cell_22(v-else) {{ credit.transfer_status }}
          td.crud__cell.crud__cell_22(v-if="credit.created_at == null") --
          td.crud__cell.crud__cell_22(v-else) {{ credit.created_at | moment("D [de] MMM YY, h:mm:ss a") }}
          td.crud__cell.crud__cell_22(v-if="credit.updated_at== null") --
          td.crud__cell.crud__cell_22(v-else) {{ credit.updated_at | moment("D [de] MMM YY, h:mm:ss a") }}
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
      filter: {},
      order: '-id',
      editActive: false
    }
  },

  methods: {
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
