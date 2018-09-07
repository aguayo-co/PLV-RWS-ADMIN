<template lang="pug">
  EditLayout

    template(slot="title") Editar grupo

    .form__row
      label.form__label(
        for="group-name") Nombre
      span.help(
        v-if="errorLog.name") {{ errorLog.name }}
      input.form__control(
        id="group-name",
        v-model="field_name",
        type="text")
    .form__row
      label.form__label(
        for="group-discount_value") Descuento
      span.help(
        v-if="errorLog.discount_value") {{ errorLog.discount_value }}
      input.form__control(
        id="group-discount_value",
        v-model="field_discount_value",
        type="number"
        min=0
        max=100
        step=1)
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import groupAPI from '@/api/group'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  discount_value: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditGroup',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? groupAPI.update : groupAPI.create
    },
    group () {
      return this.object
    }
  }
}
</script>
