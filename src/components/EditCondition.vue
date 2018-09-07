<template lang="pug">
  EditLayout

    template(slot="title") Editar condición

    .form__row
      label.form__label(
        for="condition-name") Nombre
      span.help(
        v-if="errorLog.name") {{ errorLog.name }}
      input.form__control(
        id="condition-name",
        v-model="field_name",
        type="text")
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
