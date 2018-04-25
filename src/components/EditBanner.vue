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
        @click.stop="$emit('closeEdit')") Editar banner
      form.slide__form
        .form__row
          label.form__label(
            for='tipo') Tipo de Banner
          select.form__select(
            ref='tipo'
            id='tipo'
            v-model='type')
            optgroup(label='Tipo de banner')
              option(
                v-for='type in types'
                :value='type.id'
              ) {{ type.name }}
        .form__row(v-show="type !== 0 && !imageChanged")
          .form__label Imagen del banner
          .upfile(:class="'type-'+type")
            .upfile__item
              a.delete(
                v-show='toggleImageDelete',
                @click='removeImage') Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-if="type !== 0",
                v-model="picture",
                :width="types[type].width",
                :height="types[type].height",
                :quality="2",
                placeholder="",
                new-image-drawn="addImage",
                :prevent-white-space="true")
                img(
                  slot="initial",
                  :src="selectedBanner.image")
        .form__row(v-show="type !== 0 && imageChanged")
          .form__label Nueva imagen
          .upfile(:class="'type-'+type")
            .upfile__item
              a.delete(
                v-show='toggleImageDelete',
                @click='removeImage') Eliminar
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-if="type !== 0",
                v-model="newpicture",
                :width="types[type].width",
                :height="types[type].height",
                :quality="2",
                placeholder="",
                :new-image-drawn="addImage",
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
      picture: null,
      newpicture: null,
      type: 0,
      types: [
        { id: 0, name: 'Sin imagen' },
        { id: 1, name: 'Banner para categoría', width: 1280, height: 400 },
        { id: 2, name: 'Home #3', width: 594, height: 356 },
        { id: 3, name: 'Home #2', width: 524, height: 354 },
        { id: 4, name: 'Home #1', width: 360, height: 417 },
        { id: 5, name: 'Banner de menú', width: 410, height: 250 }
      ],
      toggleImageDelete: true,
      imageChanged: false
    }
  },
  watch: {
    banner: function () {
      this.imageChanged = false
      if (this.banner.name.includes('top')) this.type = 0
      if (this.banner.name.includes('categoria')) this.type = 1
      if (this.banner.name.includes('sm')) this.type = 4
      if (this.banner.name.includes('md')) this.type = 3
      if (this.banner.name.includes('wide')) this.type = 2
      if (this.banner.name.includes('campaign')) this.type = 5
    }
  },
  methods: {
    save: function () {
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Estamos cargando la nueva imagen'
        }
      }
      if (this.imageChanged) {
        if (this.newpicture.hasImage()) {
          this.$store.dispatch('ui/showModal', modal)
          this.newpicture.generateBlob((blob) => {
            this.banner.image = blob
            bannersAPI.updateWithImage(this.selectedBanner)
              .then(response => {
                console.log('Ok with image')
                this.$store.dispatch('ui/closeModal')
                this.$emit('closeEdit')
              })
          })
        }
      } else {
        bannersAPI.update(this.selectedBanner)
          .then(response => {
            console.log('Ok')
            this.$emit('closeEdit')
          })
      }
    },
    removeImage: function (index) {
      this.toggleImageDelete = false
      this.picture.remove()
      this.imageChanged = true
    },
    addImage: function (index) {
      this.toggleImageDelete = true
    }
  },
  computed: {
    selectedBanner: function () {
      return this.banner
    },
    editActive: function () {
      return this.active
    }
  }
}
</script>
