<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Usuarias
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en productos')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys

    EditUser(
      :user="selectedUser",
      :active="editActive",
      @closeEdit="slideEdit")

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
          @change='updateUserList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(
            @click.prevent="prevPage",
            href="#")
        li.pagination__item {{ page }}
        li.pagination__item.pagination__item_txt de {{totalPages}}
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(
            @click.prevent="nextPage",
            href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__th
            td.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th
            td.crud__title Usuaria
          th.crud__th
            td.crud__title Email
          th.crud__th
            td.crud__title Teléfono
          th.crud__th
            td.crud__title Grupos
          th.crud__th
            td.crud__title Roles
          th.crud__th
            td.crud__title Vaciones
          th.crud__th
            td.crud__title Créditos
          th.crud__th
            td.crud__title Productos<br>publicados
          th.crud__th
            td.crud__title Productos<br>vendidos
          th.crud__th
            td.crud__title Productos<br>comprados
          th.crud__th
            td.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row(v-for="(user, index) in users")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell
            a(@click="loadUser(index)")
              figure.crud__avatar.avatar
                img.avatar__img(v-if="user.picture", :src="user.picture", :alt="user.first_name")
                span.tool-user__letter.avatar__img(
                  v-else
                ) {{ user.first_name.charAt(0).toUpperCase() }}
                figcaption.avatar__txt {{ user.first_name + ' ' + user.last_name }}
          td.crud__cell {{ user.email }}
          td.crud__cell {{ user.phone }}
          td.crud__cell
            ul(v-if='user.groups')
              li(v-for='group in user.groups') {{ group.name }}
          td.crud__cell
            ul(v-if='user.roles')
              li(v-for='role in user.roles') {{ role.name }}
          td.crud__cell.crud__cell_center {{ user.vacation_mode ? "Sí" : "No" }}
          td.crud__cell.crud__cell_center -
          td.crud__cell.crud__cell_center -
          td.crud__cell.crud__cell_center -
          td.crud__cell.crud__cell_center -
          td.crud__cell {{ user.created_at }}
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

import usersAPI from '@/api/user'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import EditUser from '@/components/EditUser'
Vue.component('croppa', Croppa.component)

export default {
  name: 'Usuaria',
  components: {
    EditUser
  },
  data () {
    return {
      users: [],
      selectedUser: {},
      page: 1,
      items: 20,
      filter: {},
      order: '-id',
      editActive: false,
      picture: null,
      cover: null,
      totalPages: null
    }
  },
  methods: {
    updateUserList: function () {
      usersAPI.getUsers(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.users = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateUserList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateUserList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadUser: function (index) {
      this.selectedUser = this.users[index]
      this.slideEdit()
    }
  },
  created: function () {
    usersAPI.getUsers(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.totalPages = response.data.to
        this.users = response.data.data
      })
  }

}
</script>
