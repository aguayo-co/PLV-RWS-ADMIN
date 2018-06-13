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
        @click.stop="$emit('closeEdit')") {{ selectedSlide.id ? 'Editar slide' : 'Crear slide' }}
      form.slide__form
        .form__row
          .form__label Imagen para Desktop (1280x472)
          .upfile.slide__desktop
            .upfile__item.type-1
              a.delete(
                v-show="toggleImageDelete.image",
                @click="removeImage('image')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="pictures.image",
                :width="1280",
                :height="472",
                :quality="1",
                placeholder="",
                new-image-drawn="addImage('image')",
                :prevent-white-space="true")
                img(
                  crossorigin,
                  slot="initial",
                  :src="selectedSlide.image + '?d=123'")
        .form__row
          .form__label Imagen para Mobile (600x800)
          .upfile.slide__desktop
            .upfile__item
              a.delete(
                v-show="toggleImageDelete.image_mobile",
                @click="removeImage('image_mobile')") Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="pictures.image_mobile",
                :width="600",
                :height="800",
                :quality="1",
                placeholder="",
                new-image-drawn="addImage('image_mobile')",
                :prevent-white-space="true")
                img(
                  crossorigin,
                  slot="initial",
                  :src="selectedSlide.image_mobile + '?d=123'")
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
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
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
      errorLog: {},
      pictures: {
        image: null,
        image_mobile: null
      },
      toggleImageDelete: {
        image: false,
        image_mobile: false
      },
      imageChanged: {
        image: false,
        image_mobile: false
      }
    }
  },
  watch: {
    slide: function () {
      if (this.slide.id) {
        this.toggleImageDelete.image_mobile = true
        this.toggleImageDelete.image = true
      }
    }
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      // If slide has id we are updating else creating
      this.selectedSlide.id ? this.update(event) : this.create(event)
    },
    create: function (event) {
      let newSlide = this.selectedSlide
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Estamos cargando las imagenes del slider'
        }
      }
      this.$store.dispatch('ui/showModal', modal)
      this.pictures.image.generateBlob((blobDesktop) => {
        newSlide.image = blobDesktop
        this.pictures.image_mobile.generateBlob((blobMobile) => {
          newSlide.image_mobile = blobMobile
          slidersAPI.create(newSlide)
            .then(response => {
              this.$store.dispatch('ui/closeModal')
              this.$emit('closeEdit')
              event.target.disabled = false
            })
        })
      })
    },
    update: function (event) {
      let imagesToLoad = []
      Object.keys(this.imageChanged).forEach((key) => {
        // If image changed add to imagesToLoad
        if (this.imageChanged[key]) imagesToLoad.push(key)
      })
      // If not image has changed
      if (imagesToLoad.length === 0) {
        slidersAPI.update(this.selectedSlide)
          .then(response => {
            console.log('Ok')
            this.$emit('closeEdit')
            event.target.disabled = false
          })
      } else {
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'preload',
            title: 'Estamos cargando las imagenes del slider'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
        let updatedSlide = this.selectedSlide
        delete updatedSlide.image
        delete updatedSlide.image_mobile
        // For each imageToLoad
        imagesToLoad.forEach((key, index) => {
          console.log(key)
          if (this.pictures[key].hasImage()) {
            this.pictures[key].generateBlob((blob) => {
              updatedSlide[key] = blob
              // If last image to load
              if (index === imagesToLoad.length - 1) {
                slidersAPI.updateWithImage(updatedSlide)
                  .then((response) => {
                    this.$store.dispatch('ui/closeModal')
                    this.$emit('closeEdit')
                  })
              }
            })
          }
        })
      }
    },
    removeImage: function (type) {
      this.toggleImageDelete[type] = false
      this.pictures[type].remove()
      this.imageChanged[type] = true
    },
    addImage: function (type) {
      this.toggleImageDelete[type] = true
    },
    validateBeforeCreate: function () {
      this.errorLog = {}
      if (!this.selectedSlide.image.hasImage()) this.errorLog.image = 'Debes cargar una imagen Desktop para este slide'
      if (!this.selectedSlide.image_mobile.hasImage()) this.errorLog.image_mobile = 'Debes cargar una imagen Mobile para este slide'
      if (!this.selectedSlide.name) this.errorLog.image = 'Debes ingresar un nombre para este slide'
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
