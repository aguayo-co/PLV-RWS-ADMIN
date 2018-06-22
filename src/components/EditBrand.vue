<template lang="pug">
.admin__edit(
  v-if="selectedBrand",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar marca
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Id
          p(v-model="selectedBrand.name") {{ selectedBrand.id }}
        .form__row
          label.form__label(
            for="color-name") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedBrand.name",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import brandsAPI from '@/api/brand'
Vue.component('croppa', Croppa.component)

export default {
  props: ['brand', 'active'],
  name: 'EditBrand',
  computed: {
    selectedBrand: function () {
      return this.brand
    }
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      brandsAPI.update(this.selectedBrand)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
          event.target.disabled = false
        })
    }
  }

}
</script>
