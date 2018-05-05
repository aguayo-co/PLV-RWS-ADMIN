<template lang="pug">
.admin__edit(
  v-if="selectedColor",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar color
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Id
          p(v-model="selectedColor.name") {{ selectedColor.id }}
        .form__row
          label.form__label(
            for="color-name") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedColor.name",
            type="text")
        .form__row
          label.form__label(
            for="color-id") Código hexadecimal
          input.form__control(
            id="color-id",
            v-model="selectedColor.hex_code",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import colorsAPI from '@/api/color'
Vue.component('croppa', Croppa.component)

export default {
  props: ['color', 'active'],
  name: 'EditColor',
  computed: {
    selectedColor: function () {
      return this.color
    }
  },
  methods: {
    save: function () {
      colorsAPI.update(this.selectedColor)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
