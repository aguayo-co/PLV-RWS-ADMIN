<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Grupos
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Grupos')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditGroup(
      :group="selectedGroup",
      :active="editActive",
      @closeEdit="slideEdit",
      @updateItems="updateList")
    nav.nav
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems | unempty }}</strong>  {{ (totalItems === 1) ? 'grupo' : 'grupos' }}
      // Paginador
      Pager(
        :currentItems="items",
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    ul.content-actions
      li
        button.btn.btn_solid.btn_auto.i-plus(@click="create") Crear grupo
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_12
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__title.crud__cell_22 Nombre
          th.crud__title.crud__cell_22 Descuento
          th.crud__title.crud__cell_22 Fecha de creación
          th.crud__title.crud__cell_22 Fecha de modificación
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadGroup(index)",
          v-for="(group, index) in groups")
          td.crud__cell.crud__cell_12
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell.crud__cell_22 {{ group.name}}
          td.crud__cell.crud__cell_22 {{ group.discount_value }}
          td.crud__cell.crud__cell_22 {{ group.created_at | date }}
          td.crud__cell.crud__cell_22 {{ group.updated_at | date }}
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
import groupsAPI from '@/api/group'
import PagerMixin from '@/mixins/PagerMixin'
import EditGroup from '@/components/EditGroup'
import UserAvatar from '@/components/UserAvatar'

export default {
  // props: ['group', 'active'],
  name: 'Groups',
  mixins: [PagerMixin],
  components: {
    EditGroup,
    UserAvatar
  },
  data () {
    return {
      groups: [],
      selectedGroup: {},
      filter: {},
      order: '-id',
      editActive: false
    }
  },

  methods: {
    create: function () {
      this.selectedGroup = {}
      this.slideEdit()
    },
    updateList: function () {
      groupsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.groups = response.data.data
        })
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadGroup: function (index) {
      this.selectedGroup = this.groups[index]
      this.slideEdit()
    }
  }
}
</script>
