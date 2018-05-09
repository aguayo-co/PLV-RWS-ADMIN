<template lang="pug">
.admin__edit(
  v-if="selectedGroup",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar color
      form.slide__form
        .form__row
          label.form__label(
            for="id-group") Id
          p(v-model="selectedGroup.name") {{ selectedGroup.id }}
        .form__row
          label.form__label(
            for="color-name") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedGroup.name",
            type="text")
        .form__row
          label.form__label(
            for="color-id") Código hexadecimal
          input.form__control(
            id="color-id",
            v-model="selectedGroup.hex_code",
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
  props: ['group', 'active'],
  name: 'EditGroup',
  computed: {
    selectedGroup: function () {
      return this.group
    }
  },
  methods: {
    save: function () {
      colorsAPI.update(this.selectedGroup)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
