<template lang="pug">
.admin__edit(
  v-if="selectedSize",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar talla
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Categoria
          //- input.form__control(
          //-   id="size-category",
          //-   v-model="selectedSizes.name",
          //-   type="text")
          p(v-model="selectedSizes.name") {{ selectedSizes.name }}
        .form__row
          label.form__label(
            for="size-id") Id
          //- input.form__control(
          //-   id="size-id",
          //-   v-model="selectedSize.id",
          //-   type="text")
          p(v-model="selectedSize.id") {{ selectedSize.id }}
        .form__row
          label.form__label(
            for="size-id") Nombre
          input.form__control(
            id="size-id",
            v-model="selectedSize.name",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import sizesAPI from '@/api/size'
Vue.component('croppa', Croppa.component)

export default {
  props: ['size', 'sizeParent', 'active'],
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
    },
    selectedSizes: function () {
      return this.sizeParent
    }
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      sizesAPI.update(this.selectedSize)
        .then(response => {
          this.$emit('closeEdit')
          event.target.disabled = false
        })
    }
  }

}
</script>
