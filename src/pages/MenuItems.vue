<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Menús
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Menús')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditMenuItems(
      :menu="selectedMenu",
      :active="editActive",
      @closeEdit="slideEdit",
      @updateItems="updateList")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      // Pager
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Crear item de categoria
    ul.content-actions
      li
        button.btn.btn_solid.btn_auto.i-plus(@click="create") Crear item de categoria
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell.crud__cell_check
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__title.crud__cell_30 Categoria
          th.crud__title.crud__cell_22 Url
          th.crud__title.crud__cell_22 Creación
          th.crud__title.crud__cell_22 Modificación
      tbody.crud__tbody
        tr.crud__row
          td(colspan="5")
            table.crud(
              v-for="(parent, index) in menus")
              tr.crud__row
                th.crud__cell.crud__cell_check
                  input.form__input-check(
                    type="checkbox",
                    id="all"
                    name="all",
                    value="selectAll")
                  label.form__label_check.i-ok(
                    for="all")
                th.crud__cell.crud__cell_30.crud__row_open(@click="loadMenu(index)") {{ parent.name }}
                th.crud__cell.crud__cell_22(v-if="parent.slug") {{ parent.slug }}
                th.crud__cell.crud__cell_22(v-else) &nbsp;
                th.crud__cell.crud__cell_22 {{ parent.created_at | moment("D [de] MMM YY") }}
                th.crud__cell.crud__cell_22 {{ parent.updated_at | moment("D [de] MMM YY") }}
              tbody.crud__tbody
                tr.crud__row(
                  v-for="(children, subIndex) in parent.items")
                  td(colspan="5")
                    table.crud
                      thead.crud__tbody
                        th.crud__cell
                          input.form__input-check(
                            type="checkbox",
                            name="all",
                            value="selectAll")
                          label.form__label_check.i-ok
                        th.crud__cell.crud__cell_30.crud__row_open(@click="loadMenuItem(children.id)") &nbsp;&nbsp;&nbsp; {{ '&#8735; ' + children.name }}
                        th.crud__cell.crud__cell_22(v-if="children.url") {{ children.url }}
                        th.crud__cell.crud__cell_22(v-else) &nbsp;
                        th.crud__cell.crud__cell_22 {{ children.created_at | moment("D [de] MMM YY") }}
                        th.crud__cell.crud__cell_22 {{ children.updated_at | moment("D [de] MMM YY") }}
                      tbody
                        tr(v-for="(item, index) in children.children")
                          td(colspan="5")
                            table.crud
                              thead
                                th.crud__cell
                                  input.form__input-check(
                                    type="checkbox",
                                    name="all",
                                    value="selectAll")
                                  label.form__label_check.i-ok
                                th.crud__cell.crud__cell_30.crud__row_open(@click="loadMenuItem(item.id)") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ '&#8735; ' + item.name }}
                                th.crud__cell.crud__cell_22 {{ item.url }}
                                th.crud__cell.crud__cell_22 {{ item.created_at | moment("D [de] MMM YY") }}
                                th.crud__cell.crud__cell_22 {{ item.updated_at | moment("D [de] MMM YY") }}
                              tbody
                                tr(v-for="(itemChildren, index) in item.children")
                                  td.crud__cell
                                    input.form__input-check(
                                      type="checkbox",
                                      name="all",
                                      value="selectAll")
                                    label.form__label_check.i-ok
                                  td.crud__cell.crud__cell_30.crud__row_open(@click="loadMenuItem(itemChildren.id)") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ '&#8735; ' + itemChildren.name }}
                                  td.crud__cell.crud__cell_22 {{ itemChildren.url }}
                                  td.crud__cell.crud__cell_22 {{ itemChildren.created_at | moment("D [de] MMM YY") }}
                                  td.crud__cell.crud__cell_22 {{ itemChildren.updated_at | moment("D [de] MMM YY") }}
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
import menuItemsAPI from '@/api/menuItem'
import Pager from '@/components/Pager'
import EditMenuItems from '@/components/EditMenuItems'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'MenuItems',
  components: {
    Pager,
    UserAvatar,
    EditMenuItems
  },
  data () {
    return {
      menus: [],
      menuItem: {},
      selectedMenu: {},
      index: 0,
      subIndex: 0,
      totalPages: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      menuItemsAPI.getAll(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.categories = response.data.data
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
    },
    slideEdit: function () {
      this.editActive = !this.editActive
      console.log('ok')
    },
    loadMenu: function (index) {
      console.log('index: ' + index)
      this.selectedMenu = this.menus[index]
      this.slideEdit()
    },
    loadMenuItem: function (itemId) {
      menuItemsAPI.get(itemId)
        .then(response => {
          this.selectedMenu = response.data
        })
      console.log(this.selectedMenu)
      this.slideEdit()
    },
    create: function () {
      this.selectedMenu = {}
      this.slideEdit()
    }
  },
  created: function () {
    menuItemsAPI.getAll()
      .then(response => {
        this.menus = response.data.data
      })
  }
}

</script>
