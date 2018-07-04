<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Condiciones
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en condiciones')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditCondition(
      :condition="selectedCondition",
      :active="editActive",
      @closeEdit="slideEdit",
      @updateItems="updateList")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(
        href="#",
        title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'condición' : 'condiciones' }}
      // Paginador
      Pager(
        :currentItems="items",
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    ul.content-actions
      li
        button.btn.btn_solid.btn_auto.i-plus(@click="create") Crear condiciones
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
          th.crud__title.crud__cell_30 Nombre
          th.crud__title.crud__cell_30 Fecha de creación
          th.crud__title.crud__cell_30 Fecha de modificación
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadGroup(index)",
          v-for="(group, index) in conditions")
          td.crud__cell.crud__cell_10
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell.crud__cell_30 {{ group.name}}
          td.crud__cell.crud__cell_30 {{ group.created_at | date }}
          td.crud__cell.crud__cell_30 {{ group.updated_at | date }}
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
import conditionsAPI from '@/api/condition'
import PagerMixin from '@/mixins/PagerMixin'
import EditCondition from '@/components/EditCondition'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'Conditions',
  mixins: [PagerMixin],
  components: {
    EditCondition,
    UserAvatar
  },
  data () {
    return {
      conditions: [],
      selectedCondition: {},
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    create: function () {
      this.selectedCondition = {}
      this.slideEdit()
    },
    updateList: function () {
      conditionsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.conditions = response.data.data
        })
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadGroup: function (index) {
      this.selectedCondition = this.conditions[index]
      this.slideEdit()
    }
  }
}
</script>
