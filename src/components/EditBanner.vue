<template lang="pug">
  .edit__slide_large
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar banner
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for='banner-type') Tipo de banner
        select.form__select(
          id='banner-type'
          v-model='type')
          option(v-for="type in types" :value="type") {{ type.label }}
      .form__row(v-if="type && type.extraName")
        label.form__label(
          for="banner-extra-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          required
          id="banner-extra-name",
          v-model="extraName",
          type="text")
      .form__row(v-if="type.width")
        label.form__label Imagen ({{ type.width }}x{{ type.height }})
        .upfile.slide__desktop
          uploadPhoto(
            :errorLog="errorLog.image"
            :width="type.width",
            :height="type.height",
            v-model="field_image"
            :initialImage='banner.image')
      .form__row
        label.form__label(
          for="banner-title") Título
        span.help(
          v-if="errorLog.title") {{ errorLog.title }}
        input.form__control(
          v-model="field_title",
          id="banner-title",
          type="text")
      .form__row
        label.form__label(
          for="banner-subtitle") Sub título
        span.help(
          v-if="errorLog.subtitle") {{ errorLog.subtitle }}
        input.form__control(
          v-model="field_subtitle",
          id="banner-subtitle",
          type="text")
      .form__row
        label.form__label(
          for="banner-button_text") Texto del botón
        span.help(
          v-if="errorLog.button_text") {{ errorLog.button_text }}
        input.form__control(
          id="banner-button_text",
          v-model="field_button_text",
          type="text")
      .form__row
        label.form__label(
          for="banner-url") URL
        span.help(
          v-if="errorLog.url") {{ errorLog.url }}
        input.form__control(
          v-model="field_url",
          id="banner-url",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import bannerAPI from '@/api/banner'
import uploadPhoto from './shared/uploadPhoto'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  title: null,
  subtitle: null,
  button_text: null,
  url: null,
  image: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditBanner',
  components: {
    uploadPhoto
  },
  data () {
    return {
      types: [
        { name: 'Top ', label: 'Top - Sin imagen', extraName: true },
        { name: 'Campana ', label: 'Banner para Campaña', width: 1280, height: 380, extraName: true },
        { name: 'Categoria ', label: 'Banner para Categoría', width: 1280, height: 380, extraName: true },
        { name: 'Grupo ', label: 'Banner para Grupo', width: 1280, height: 380, extraName: true },
        { name: 'Marca ', label: 'Banner para Marca', width: 1280, height: 380, extraName: true },
        { name: 'Home 1', label: 'Home #1', width: 360, height: 417, extraName: false },
        { name: 'Home 2', label: 'Home #2', width: 524, height: 354, extraName: false },
        { name: 'Home 3', label: 'Home #3', width: 594, height: 356, extraName: false },
        { name: 'Menu campaign', label: 'Banner de menú', width: 410, height: 250, extraName: false }
      ],
      idPropertyName: 'slug'
    }
  },
  computed: {
    extraName: {
      set (extraName) {
        this.field_name = this.type.name + extraName
      },
      get () {
        if (!this.type.extraName) {
          return ''
        }
        if (!this.field_name) {
          return ''
        }
        const typeLength = this.type.name.length
        return this.field_name.slice(typeLength)
      }
    },
    type: {
      set (type) {
        this.field_name = type.name + (type.extraName ? this.extraName : '')
        if (!type.width) {
          this.field_image = ''
        } else if (this.field_image === '') {
          this.field_image = this.banner.image
        }
      },
      get () {
        if (!this.field_name) {
          return this.types[0]
        }

        const currentType = this.types.find(type => {
          return type.name && this.field_name.indexOf(type.name) === 0
        })

        if (currentType) {
          return currentType
        }

        return this.types[0]
      }
    },
    apiMethod () {
      return this.object.slug ? bannerAPI.update : bannerAPI.create
    },
    banner () {
      return this.object
    }
  },
  methods: {
    validate () {
      if (this.type.width && !this.field_image) {
        this.$set(this.errorLog, 'image', 'La imagen es obligatoria.')
        return false
      }
      return true
    }
  }
}
</script>
