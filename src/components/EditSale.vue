<template lang="pug">
  div
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar ventas
    form.slide__form
      .form__row
        label.form__label(
          for="size-category") Id
        p(v-model="sale.name") {{ sale.id }}
      //- .form__row
      //-   label.form__label(
      //-     for="sale-name") Nombre
      //-   input.form__control(
      //-     id="sale-name",
      //-     v-model="sale.name",
      //-     type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import salesAPI from '@/api/sale'

export default {
  props: ['data'],
  name: 'EditSale',
  computed: {
    sale () {
      return this.data
    }
  },
  methods: {
    save: function () {
      salesAPI.update(this.sale)
        .then(response => {
          this.$emit('close')
        })
    }
  }
}
</script>
