<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar color
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="color-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.code }}
        input.form__control(
          id="color-name",
          v-model="field_name",
          type="text")
      .form__row
        label.form__label(
          for="color-hex_code") Código HEX
        span.help(
          v-if="errorLog.hex_code") {{ errorLog.hex_code }}
        input.form__control(
          id="color-hex_code",
          v-model="field_hex_code",
          type="color")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import colorAPI from '@/api/color'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  hex_code: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditColor',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.id ? colorAPI.update : colorAPI.create
    },
    color () {
      return this.object
    }
  }
}
</script>
