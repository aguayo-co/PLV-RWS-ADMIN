<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar método de envío
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="method-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          required
          id="method-name",
          v-model="field_name",
          type="text")
      .form__row
        label.form__label(
          for="method-description_seller") Descripción para vendedora
        span.help(
          v-if="errorLog.description_seller") {{ errorLog.description_seller }}
        textarea.form__control(
          required
          id="method-description_seller",
          v-model="field_description_seller")
      .form__row
        label.form__label(
          for="method-description_buyer") Descripción para compradora
        span.help(
          v-if="errorLog.description_buyer") {{ errorLog.description_buyer }}
        textarea.form__control(
          required
          id="method-description_buyer",
          v-model="field_description_buyer")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import shippingMethodAPI from '@/api/shippingMethod'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  description_seller: null,
  description_buyer: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditShippingMethod',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? shippingMethodAPI.update : shippingMethodAPI.create
    },
    shippingMethod () {
      return this.object
    }
  }
}
</script>
