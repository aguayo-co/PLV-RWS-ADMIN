<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Usuarios
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en usuarias', v-model='inputSearchUser', v-on:keyup.enter="searchUser()", @change="()=>{ if (this.inputSearchUser == '') { this.searchUser() } }")
            input.search__btn(type='button', value='', @click="searchUser")
        UserAvatar

    EditUser(
      :groups="groups",
      :user="selectedUser",
      :active="editActive",
      @closeEdit="slideEdit")

    nav.nav
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems | unempty }}</strong>  {{ (totalItems === 1) ? 'usuaria' : 'usuarias' }}
      // Paginador
      Pager(
        :currentItems="items",
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
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
        tr.crud__row.crud__row_open(
          @click="loadUser(index)",
          v-for="(user, index) in users")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          td.crud__cell
            figure.crud__avatar.avatar
              img.avatar__img(v-if="user.picture", :src="user.picture", :alt="user.first_name")
              span.tool-user__letter.avatar__img(
                v-else
              ) {{ user.first_name.charAt(0).toUpperCase() }}
              figcaption.avatar__txt {{ user.first_name + ' ' + user.last_name }}
          td.crud__cell.crud__cell_wbreak.crud__cell_130.small-txt {{ user.email }}
          td.crud__cell {{ user.phone }}
          td.crud__cell
            ul(v-if='user.groups_ids')
              li(v-for='group_id in user.groups_ids') {{ group_id }}
          td.crud__cell
            ul(v-if='user.roles')
              li(v-for='role in user.roles') {{ role.name }}
          td.crud__cell.crud__cell_center {{ user.vacation_mode ? "Sí" : "No" }}
          td.crud__cell.crud__cell_center {{ user.credits }}
          td.crud__cell.crud__cell_center {{ user.published_products_count }}
          td.crud__cell.crud__cell_center {{ user.sold_products_count }}
          td.crud__cell.crud__cell_center {{ user.purchased_products_count }}
          td.crud__cell {{ user.created_at | date }}
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
import groupsAPI from '@/api/group'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import PagerMixin from '@/mixins/PagerMixin'
import EditUser from '@/components/EditUser'
import UserAvatar from '@/components/shared/UserAvatar'

Vue.component('croppa', Croppa.component)

export default {
  name: 'Usuaria',
  mixins: [PagerMixin],
  components: {
    EditUser,
    UserAvatar
  },
  data () {
    return {
      users: [],
      selectedUser: {},
      filter: {},
      order: '-id',
      editActive: false,
      picture: null,
      cover: null,
      groups: [],
      inputSearchUser: ''
    }
  },
  methods: {
    updateList: function () {
      usersAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalPages = response.data.last_page
          this.totalItems = response.data.total
          this.users = response.data.data
        })
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadUser: function (index) {
      this.selectedUser = this.users[index]
      this.slideEdit()
    },
    searchUser () {
      if (this.inputSearchUser.length > 0) {
        usersAPI.search(this.inputSearchUser)
          .then(response => {
            this.users = response.data.data
          })
      } else {
        this.updateList()
      }
    }
  },
  created: function () {
    groupsAPI.get()
      .then(response => {
        this.groups = response.data.data
      })
  }
}
</script>
