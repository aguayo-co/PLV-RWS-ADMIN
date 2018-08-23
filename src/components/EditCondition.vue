<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar condición
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="condition-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="condition-name",
          v-model="field_name",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import conditionAPI from '@/api/condition'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditCondition',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? conditionAPI.update : conditionAPI.create
    },
    condition () {
      return this.object
    }
  }
}
</script>
