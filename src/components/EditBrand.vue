<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar marca
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="brand-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="brand-name",
          v-model="field_name",
          type="text")
      .form__row
        label.form__label(
          for="brand-url") URL
        span.help(
          v-if="errorLog.url") {{ errorLog.url }}
        input.form__control(
          id="brand-url",
          v-model="field_url",
          type="brand")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import brandAPI from '@/api/brand'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  url: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditBrand',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? brandAPI.update : brandAPI.create
    },
    brand () {
      return this.object
    }
  }
}
</script>
