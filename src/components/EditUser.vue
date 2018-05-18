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
              a.delete(
                v-show='toggleImageDelete',
                @click='removeImage') Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="picture",
                :width="280",
                :height="280",
                :quality="2",
                placeholder="",
                :prevent-white-space="true",
                :show-remove-button="false",
                :new-image-drawn="addImage")
                img(
                  crossorigin
                  slot="initial",
                  :src="selectedUser.picture + '?d=123'")
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
        .form__row
          .form__label Grupos
          .row(v-for="group in groups")
            input.form__input-check(
              v-model="selectedUser.group_ids"
              :id="'group-' + group.id",
              type="checkbox",
              name="roles",
              :value="group.id")
            label.form__label-checkbox.i-ok(
              :for="'group-' + group.id") {{ group.name }}
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

// import usersAPI from '@/api/user'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import usersAPI from '@/api/user'
Vue.component('croppa', Croppa.component)

const userFields = {
  id: null,
  picture: null,
  first_name: null,
  last_name: null,
  about: null,
  email: null,
  phone: null,
  group_ids: null
}

export default {
  props: ['user', 'active', 'groups'],
  name: 'EditUser',
  data () {
    return {
      picture: null,
      cover: null,
      toggleImageDelete: true,
      imageChanged: false
    }
  },
  computed: {
    selectedUser: function () {
      return this.user
    },
    rol: function () {
      return this.user.roles
    }
  },
  methods: {
    save: function () {
      let user = {}
      Object.keys(userFields).forEach((key) => {
        if (this.selectedUser[key]) user[key] = this.selectedUser[key]
      })

      if (this.imageChanged) {
        if (this.picture.hasImage()) {
          this.picture.generateBlob((blob) => {
            user.picture = blob
            usersAPI.updateWithFile(user)
              .then(response => {
                console.log('Ok with image')
                this.$emit('closeEdit')
              })
          })
        }
      } else {
        delete user.picture
        usersAPI.update(user)
          .then(response => {
            console.log('Ok')
            this.$emit('closeEdit')
          })
      }
    },
    removeImage: function () {
      this.toggleImageDelete = false
      this.picture.remove()
      this.imageChanged = true
    },
    addImage: function () {
      this.toggleImageDelete = true
    }
  }
}
</script>
