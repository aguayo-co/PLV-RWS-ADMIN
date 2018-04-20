<template lang="pug">
.admin__edit.users(
  v-if="selectedUser"
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      //- .btn_close.modal__btn_close.i-x(
      //-   @click.stop="slideEdit")
      //-   span Cerrar
      //- h3.title Editar usuario
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar usuario
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
                :width="280",
                :height="280",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
                img(
                  slot="initial",
                  :src="selectedUser.picture")
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
          //- .row(v-for="role in selectedUser.roles")
          //-   input.form__input-radio(
          //-     :id="'rol-' + role.id",
          //-     type="radio",
          //-     name="roles",
          //-     value="1")
          //-   label.form__label_radio(
          //-     :for="'rol-' + role.id") {{ role.name }}
          .row
            input.form__input-check(
              id="rol-1",
              type="checkbox",
              name="roles",
              value="null")
            label.form__label-checkbox.i-ok(
              for="rol-1",
              v-model="rol.id") Vendedora
          .row
            input.form__input-check(
              id="rol-2",
              type="checkbox",
              name="roles",
              value="2",
              v-model="rol.id")
            label.form__label-checkbox.i-ok(
              for="rol-2") Compradora
          .row
            input.form__input-check(
            id="rol-3",
            type="checkbox",
            name="roles",
            value="1",
            v-model="rol.id")
            label.form__label-checkbox.i-ok(
              for="rol-3") Administradora
        .form__row(v-if="selectedUser.group")
          .form__label Roles
          .row
            input.form__input-check(
              id="group-1",
              type="checkbox",
              name="groups",
              value="1")
            label.form__label-checkbox.i-ok(
              for="group-1") PriloverStar
          .row
            input.form__input-check(
              id="group-2",
              type="checkbox",
              name="groups",
              value="1",
              v-model="group")
            label.form__label-checkbox.i-ok(
              for="group-2") It Girl
          .row
            input.form__input-check(
              id="group-3",
              type="checkbox",
              name="groups",
              value="1")
            label.form__label-checkbox.i-ok(
              for="group-3") Prilovers We Love
        //-select form
        //- .form__row
        //-   label.form__label(
        //-     for="select") Select
        //-   select.form__select.form__select_big(
        //-     name="select",
        //-     id="select")
        //-     option(value="1") PriloverStar
        //-     option(value="2") It Girl
        //-     option(value="3") Prilovers We Love
        .form__row.form__row_away
          button.btn.btn_solid.btn_block Guardar
</template>

<script>

// import usersAPI from '@/api/user'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  props: ['user', 'active'],
  name: 'EditUser',
  data () {
    return {
      picture: null,
      cover: null
    }
  },
  computed: {
    selectedUser: function () {
      return this.user
    },
    rol: function () {
      return this.user.roles
    },
    group: function () {
      return this.user.groups
    }
  },
  updated: function () {
    this.picture.refresh()
  }

}
</script>
