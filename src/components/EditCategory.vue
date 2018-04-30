<template lang="pug">
.admin__edit(
  v-if="selectedBrand",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar categorias
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
        .form__row
          label.form__label(
            for="color-id") Url
          input.form__control(
            id="color-id",
            v-model="selectedBrand.url",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

// import Vue from 'vue'
import categoriesAPI from '@/api/category'

export default {
  props: ['brand', 'active'],
  name: 'EditCategory',
  computed: {
    selectedBrand: function () {
      return this.brand
    }
  },
  methods: {
    save: function () {
      categoriesAPI.update(this.selectedBrand)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
