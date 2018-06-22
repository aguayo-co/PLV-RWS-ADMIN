<template lang="pug">
.admin__edit(
  v-if="selectedShipping",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar método de envio
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedShipping.name",
            type="text")
        .form__row
          label.form__label(
            for="color-name") Descripción vendedora
          textarea-autosize.form__textarea.editor__textarea(
            v-model="selectedShipping.description_seller",
            rows="1")
        .form__row
          label.form__label(
            for="color-id") Descripción compradora
          textarea-autosize.form__textarea.editor__textarea(
            v-model="selectedShipping.description_buyer",
            rows="1")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import shippingAPI from '@/api/shippingMethod'
Vue.component('croppa', Croppa.component)

export default {
  props: ['shipping', 'active'],
  name: 'EditShippingMethods',
  computed: {
    selectedShipping: function () {
      return this.shipping
    }
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      shippingAPI.update(this.selectedShipping)
        .then(response => {
          this.$emit('closeEdit')
          event.target.disabled = false
        })
    }
  }

}
</script>
