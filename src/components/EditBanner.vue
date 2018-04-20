<template lang="pug">
.admin__edit.banner(
  :class="{ 'admin__edit_open': editActive == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      //- .btn_close.modal__btn_close.i-x(
      //-   @click.stop="slideEdit")
      //-   span Cerrar
      //- h3.title Editar usuario
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar banner
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
                :initial-image="selectedBanner.image"
                :width="300",
                :height="300",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
        .form__row
          label.form__label(
            for="user-name") Nombre
          input.form__control(
            v-model="selectedBanner.name",
            id="user-name",
            type="text")
        .form__row
          label.form__label(
            for="user-lastname") Título
          input.form__control(
            v-model="selectedBanner.title",
            id="user-lastname",
            type="text")
        .form__row
          label.form__label(
            for="user-lastname") Subtítulo
          textarea.form__textarea(
            v-model="selectedBanner.subtitle",
            name="text")
        .form__row
          label.form__label(
            for="user-email") Texto del botón
          input.form__control(
            id="user-email",
            v-model="selectedBanner.button_text",
            type="email")
        .form__row
          label.form__label(
            for="user-phone") URL
          input.form__control(
            v-model="selectedBanner.url",
            id="user-phone",
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
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import bannersAPI from '@/api/banner'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  props: ['banner', 'active'],
  name: 'EditBanner',
  data () {
    return {
      picture: null
    }
  },
  methods: {
    save: function () {
      bannersAPI.update(this.selectedBanner)
        .then(response => {
          console.log('Ok')
        })
    }
  },
  computed: {
    selectedBanner: function () {
      return this.banner
    }
  },
  updated: function () {
    this.picture.refresh()
  }

}
</script>
