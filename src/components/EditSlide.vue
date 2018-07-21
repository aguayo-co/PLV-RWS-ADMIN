<template lang="pug">
  .edit__slide_large
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar slider
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label Imagen para Desktop (1280x472)
        .upfile.slide__desktop
          uploadPhoto(
            :errorLog="errorLog.image"
            :width="1280",
            :height="472",
            v-model="field_image"
            :initialImage='slider.image')
      .form__row
        label.form__label Imagen para Mobile (600x800)
        .upfile.slide__desktop
          uploadPhoto(
            :errorLog="errorLog.image_mobile"
            :width="600",
            :height="800",
            v-model="field_image_mobile"
            :initialImage='slider.image_mobile')
      .form__row
        label.form__label(
          for="slider-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="slider-name",
          v-model="field_name",
          type="text")
      .form__row
        label.form__label(
          for="slider-priority") Prioridad (posición)
        span.help(
          v-if="errorLog.priority") {{ errorLog.priority }}
        input.form__control(
          v-model="field_priority"
          id="slider-priority"
          type="number"
          step=1
          min=0
          max=100)
      .form__row
        span.help(
          v-if="errorLog.orientation") {{ errorLog.orientation }}
        label.form__label(
          for='slider-orientation') Orientación del banner
        select.form__select(
          id='slider-orientation'
          v-model='field_orientation')
          option(value='left') Izquierda
          option(value='right') Derecha
      .form__row
        label.form__label(
          for="slider-main_text") Título
        span.help(
          v-if="errorLog.main_text") {{ errorLog.main_text }}
        input.form__control(
          v-model="field_main_text",
          id="slider-main_text",
          type="text")
      .form__row
        label.form__label(
          for="slider-small_text") Letra chica
        span.help(
          v-if="errorLog.small_text") {{ errorLog.small_text }}
        input.form__control(
          v-model="field_small_text",
          id="slider-small_text",
          type="text")
      .form__row
        label.form__label(
          for='slider-font_color') Color del texto
        span.help(
          v-if="errorLog.font_color") {{ errorLog.font_color }}
        select.form__select(
          id='slider-font_color'
          v-model='field_font_color')
          option(value='bg_white') Negro
          option(value='bg_black') Blanco
      .form__row
        label.form__label(
          for="slider-button_text") Texto del botón
        span.help(
          v-if="errorLog.button_text") {{ errorLog.button_text }}
        input.form__control(
          id="slider-button_text",
          v-model="field_button_text",
          type="text")
      .form__row
        label.form__label(
          for="slider-url") URL
        span.help(
          v-if="errorLog.url") {{ errorLog.url }}
        input.form__control(
          v-model="field_url",
          id="slider-url",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import sliderAPI from '@/api/slider'
import uploadPhoto from './shared/uploadPhoto'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  main_text: null,
  small_text: null,
  button_text: null,
  url: null,
  image: null,
  image_mobile: null,
  orientation: null,
  font_color: null,
  priority: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditSlide',
  components: {
    uploadPhoto
  },
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? sliderAPI.update : sliderAPI.create
    },
    slider () {
      return this.object
    }
  }
}
</script>
