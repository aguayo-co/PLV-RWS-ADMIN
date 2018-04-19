<template lang="pug">
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
        @click.stop="slideEdit") Editar usuario
      form.slide__form
        .form__row
          .form__label Foto de perfil
          .upfile__small
            .upfile__item
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="picture",
                :initial-image="selectedUser.picture"
                :width="300",
                :height="300",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
        .form__row
          label.form__label(
            for="user-name") Nombre
          input.form__control(
            v-model="selectedUser.first_name",
            id="user-name",
            type="text")
        .form__row
          label.form__label(
            for="user-lastname") Apellido
          input.form__control(
            v-model="selectedUser.last_name",
            id="user-lastname",
            type="text")
        .form__row
          label.form__label(
            for="user-lastname") Acerca de
          textarea.form__textarea(
            v-model="selectedUser.about",
            name="about",
            maxlength="340")
        .form__row
          label.form__label(
            for="user-email") Correo
          input.form__control(
            id="user-email",
            v-model="selectedUser.email",
            type="email")
        .form__row
          label.form__label(
            for="user-phone") Teléfono
          input.form__control(
            v-model="selectedUser.phone",
            id="user-phone",
            type="tel")
        .form__row(v-if="selectedUser.roles")
          .form__label Roles
          .row(v-for="role in selectedUser.roles")
            input.form__input-radio(
              :id="'rol-' + role.id",
              type="radio",
              name="roles[]",
              value="1")
            label.form__label_radio(
              :for="'rol-' + role.id") {{ role.name }}
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
      selectedUser: {},
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
    },
    loadUser: function (index) {
      this.selectedUser = this.users[index]
      this.picture.refresh()
      this.slideEdit()
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
