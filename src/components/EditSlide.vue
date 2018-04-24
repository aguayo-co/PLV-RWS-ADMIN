<template lang="pug">
.admin__edit.banner(
  :class="{ 'admin__edit_open': editActive == true }")
  transition(name='slide-right')
    .edit__slide.edit__slide_large(
      v-show="active == true")
      //- .btn_close.modal__btn_close.i-x(
      //-   @click.stop="slideEdit")
      //-   span Cerrar
      //- h3.title Editar usuario
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar Slide
      form.slide__form
        .form__row(v-show="!imageChanged.desktop && selectedSlide.image")
          .form__label Imagen para Desktop
          .upfile.slide__desktop
            .upfile__item
              a.delete(
                v-show="toggleImageDelete.desktop",
                @click="removeImage('desktop')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="desktopPicture",
                :width="1280",
                :height="720",
                :quality="2",
                placeholder="",
                new-image-drawn="addImage('desktop')",
                :prevent-white-space="true")
                img(
                  slot="initial",
                  :src="selectedSlide.image")
        .form__row(v-show="imageChanged.desktop")
          .form__label Nueva imagen para Desktop
          .upfile.slide__desktop
            .upfile__item
              a.delete(
                v-show="toggleImageDelete.desktop",
                @click="removeImage('desktop')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="desktopPicture",
                :width="1280",
                :height="720",
                :quality="2",
                placeholder="",
                new-image-drawn="addImage('desktop')",
                :prevent-white-space="true")
        .form__row(v-show="!imageChanged.mobile && selectedSlide.image_mobile")
          .form__label Imagen para Mobile
          .upfile.slide__desktop
            .upfile__item
              a.delete(
                v-show="toggleImageDelete.desktop",
                @click="removeImage('mobile')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="desktopPicture",
                :width="640",
                :height="950",
                :quality="2",
                placeholder="",
                new-image-drawn="addImage('mobile')",
                :prevent-white-space="true")
                img(
                  slot="initial",
                  :src="selectedSlide.image_mobile")
        .form__row(v-show="imageChanged.mobile")
          .form__label Nueva imagen para Mobile
          .upfile.slide__desktop
            .upfile__item
              a.delete(
                v-show="toggleImageDelete.desktop",
                @click="removeImage('mobile')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="desktopPicture",
                :width="640",
                :height="950",
                :quality="2",
                placeholder="",
                new-image-drawn="addImage('mobile')",
                :prevent-white-space="true")
        .form__row
          label.form__label(
            for="name") Nombre
          input.form__control(
            v-model="selectedSlide.name",
            id="name",
            type="text")
        .form__row
          label.form__label(
            for="priority") Prioridad
          input.form__control(
            v-model="selectedSlide.priority",
            id="priority",
            type="text")
        .form__row
          label.form__label(
            for='orientation') Orientación del banner
          select.form__select(
            ref='orientation'
            id='orientation'
            v-model='selectedSlide.orientation')
            optgroup(label='Orientación')
              option(value='left') Izquierda
              option(value='right') Derecha
        .form__row
          label.form__label(
            for="main_text") Título
          input.form__control(
            v-model="selectedSlide.main_text",
            id="main_text",
            type="text")
        .form__row
          label.form__label(
            for="small_text") Letra chica
          input.form__control(
            v-model="selectedSlide.small_text",
            id="small_text",
            type="text")
        .form__row
          label.form__label(
            for='font_color') Color del texto
          select.form__select(
            ref='font_color'
            id='font_color'
            v-model='selectedSlide.font_color')
            optgroup(label='Color')
              option(value='bg_white') Negro
              option(value='bg_black') Blanco
        .form__row
          label.form__label(
            for="button_text") Texto del botón
          input.form__control(
            id="button_text",
            v-model="selectedSlide.button_text",
            type="text")
        .form__row
          label.form__label(
            for="url") URL
          input.form__control(
            v-model="selectedSlide.url",
            id="url",
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

import slidersAPI from '@/api/slider'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  props: ['slide', 'active'],
  name: 'EditSlide',
  data () {
    return {
      desktopPicture: null,
      newDesktopPicture: null,
      mobilePicture: null,
      newMobilePicture: null,
      toggleImageDelete: {
        mobile: false,
        desktop: false
      },
      imageChanged: {
        mobile: false,
        desktop: false
      },
      imagesToUpload: {
        desktop: null,
        mobile: null
      }
    }
  },
  watch: {
    slide: function () {
      if (!this.slide.image) this.imageChanged.desktop = true
      if (!this.slide.image_mobile) this.imageChanged.mobile = true
    }
  },
  methods: {
    save: function () {
      slidersAPI.update(this.selectedSlide)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    },
    removeImage: function (type) {
      this.toggleImageDelete[type] = false
      type === 'dektop' ? this.desktopPicture.remove() : this.mobilePicture.remove()
      type === 'dektop' ? this.newDesktopPicture.remove() : this.newMobilePicture.remove()
      this.imageChanged[type] = true
    },
    addImage: function (type) {
      this.toggleImageDelete[type] = true
    }
  },
  computed: {
    selectedSlide: function () {
      return this.slide
    },
    editActive: function () {
      return this.active
    }
  }
}
</script>
