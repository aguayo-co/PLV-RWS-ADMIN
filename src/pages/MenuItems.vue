<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Menús
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
            input.search__btn(type='submit', value='')
        UserAvatar
      .admin__edit(
        :class="{ 'admin__edit_open': editActive == true }")
        transition(name='slide-right')
          .edit__slide(
            v-show="editActive == true")
            //- .btn_close.modal__btn_close.i-x(
            //-   @click.stop="slideEdit")
            //-   span Cerrar
            //- h3.title Editar usuario
            h3.slide__header.i-close(
              @click.stop="slideEdit") Editar banner
            form.slide__form
              .form__row
                label.form__label(
                  for="user-name") Nombre
                input.form__control(
                  v-model="selectedItem.name",
                  id="user-name",
                  type="text")
              .form__row
                label.form__label(
                  for="user-lastname") Url
                input.form__control(
                  v-model="selectedItem.url",
                  id="user-lastname",
                  type="text")
              //-select form
              //- .form__row
                label.form__label(
                  for="select") Select
                select.form__select.form__select_big(
                  name="select",
                  id="select")
                  option(value="1") Item
                  option(value="2") Item
                  option(value="3") Item
                  option(value="4") Item
              .form__row.form__row_away
                button.btn.btn_solid.btn_block Guardar
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(
          name="numeroItems",
          v-model='items',
          @change='updateMenuItemsList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(@click.prevent='prevPage', href="#")
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(@click.prevent='nextPage', href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__th
            td.crud__title
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__th
            td.crud__title Nombre
          th.crud__th
            td.crud__title Url
          th.crud__th
            td.crud__title Ícono
          th.crud__th
            td.crud__title Padre
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadItem(index)",
          v-for="(item, index) in menuItems")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          td.crud__cell {{ item.name }}
          td.crud__cell {{ item.url }}
          td.crud__cell {{ item.icon }}
          td.crud__cell {{ item.parent_id }}
        tr
          td(colspan="12")
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

import menusAPI from '@/api/menu'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'MenuItems',
  components: {
    UserAvatar
  },
  data () {
    return {
      menuItems: [],
      selectedItem: {},
      page: 1,
      items: 20,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateMenuItemsList: function () {
      menusAPI.getMenus(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.menuItems = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateMenuItemsList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateMenuItemsList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadItem: function (index) {
      this.selectedItem = this.menuItems[index]
      this.slideEdit()
    }
  },
  created: function () {
    menusAPI.getMenus(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.menuItems = response.data.data
      })
  }

}
</script>
