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
    .admin__edit(
      :class="{ 'admin__edit_open': editActive == true }")
      p(
        @click.stop='slideEdit') Abrir Editar usuario
      transition(name='slide-right')
        .edit__slide(
          v-show="editActive == true")
          //- .btn_close.modal__btn_close.i-x(
          //-   @click.stop="slideEdit")
          //-   span Cerrar
          //- h3.title Editar usuario
          h3.slide__header.i-close(
            @click.stop="slideEdit") Editar usuario
          form.slide__form
            .form__row
              .form__label Foto de perfil
              .upfile__small
                .upfile__item
                  .upfile__label
                    .upfile__text.i-upload(
                      v-if="mqDesk") Arrastra una foto o
                    .upfile__btn Sube una imagen
                  croppa(
                    :width="300",
                    :height="300",
                    :quality="2",
                    placeholder="",
                    :prevent-white-space="true"
                    v-model="picture")
            .form__row
              //-To Do: Establecer aspect ratio de esta imagen
              .form__label Foto cover
              .upfile__small
                .upfile__item
                  .upfile__label
                    .upfile__text.i-upload(
                      v-if="mqDesk") Arrastra una foto o
                    .upfile__btn Sube una imagen
                  croppa(
                    :width="600",
                    :height="100",
                    :quality="2",
                    placeholder="",
                    :prevent-white-space="true"
                    v-model="cover")
            .form__row
              label.form__label(
                for="user-name") Nombre
              input.form__control(
                id="user-name",
                type="text")
            .form__row
              label.form__label(
                for="user-lastname") Apellido
              input.form__control(
                id="user-lastname",
                type="text")
            .form__row
              label.form__label(
                for="user-lastname") Acerca de
              textarea.form__textarea(
                name="about",
                maxlength="340")
            .form__row
              label.form__label(
                for="user-email") Correo
              input.form__control(
                id="user-email",
                type="email")
            .form__row
              label.form__label(
                for="user-phone") Teléfono
              input.form__control(
                id="user-phone",
                type="tel")
            .form__row
              label.form__label(
                for="user-password") Contraseña
              input.form__control(
                id="user-password",
                type="password")
            .form__row
              .form__label Roles
              input.form__input-radio(
                id="rol-1",
                type="radio",
                name="roles",
                value="1")
              label.form__label_radio(
                for="rol-1") Administradora
            .form__row
              input.form__input-radio(
                id="rol-2",
                type="radio",
                name="roles",
                value="2")
              label.form__label_radio(
                for="grupo-2") Vendedora
            .form__row
              .form__label Grupos
              input.form__input-radio(
                id="grupo-1",
                type="radio",
                name="grupos",
                value="1")
              label.form__label_radio(
                for="grupo-1") Prilover Star
            .form__row
              input.form__input-radio(
                id="grupo-2",
                type="radio",
                name="grupos",
                value="2")
              label.form__label_radio(
                for="grupo-2") Prilover
            //-select form
            .form__row
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
        li.pagination__item.pagination__item_txt de 3
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
            td.crud__title Roles
          th.crud__th
            td.crud__title Grupos
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
Vue.component('croppa', Croppa.component)

export default {
  name: 'Usuaria',
  data () {
    return {
      users: [],
      page: 1,
      items: 20,
      filter: {},
      order: '-id',
      editActive: false,
      picture: null,
      cover: null
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
    }
  },
  created: function () {
    usersAPI.getUsers(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.users = response.data.data
      })
  }

}
</script>
