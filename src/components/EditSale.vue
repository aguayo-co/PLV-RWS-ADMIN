<template lang="pug">
.admin__edit(
  v-if="selectedSale",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar ventas
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Id
          p(v-model="selectedSale.name") {{ selectedSale.id }}
        //- .form__row
        //-   label.form__label(
        //-     for="sale-name") Nombre
        //-   input.form__control(
        //-     id="sale-name",
        //-     v-model="selectedSale.name",
        //-     type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import salesAPI from '@/api/sale'

export default {
  props: ['sale', 'active'],
  name: 'EditSale',
  computed: {
    selectedSale: function () {
      return this.sale
    }
  },
  methods: {
    save: function () {
      salesAPI.update(this.selectedSale)
        .then(response => {
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
