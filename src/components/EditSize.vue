<template lang="pug">
.admin__edit(
  v-if="selectedSize",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar producto
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Categoria
          input.form__control(
            id="size-category",
            v-model="selectedSize.name",
            type="text")
        .form__row
          label.form__label(
            for="size-id") Id
          input.form__control(
            id="size-id",
            v-model="selectedSize.id",
            type="text")
        .form__row
          label.form__label(
            for="size-id") Nombre
          input.form__control(
            id="size-id",
            v-model="selectedSize.name",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import sizesAPI from '@/api/size'
Vue.component('croppa', Croppa.component)

export default {
  props: ['size', 'active'],
  name: 'EditSize',
  // data () {
  //   return {
  //     pictures: [null, null, null, null],
  //     status: 0
  //   }
  // },
  computed: {
    selectedSize: function () {
      return this.size
    }
  },
  methods: {
    save: function () {
      sizesAPI.update(this.selectedSize)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
