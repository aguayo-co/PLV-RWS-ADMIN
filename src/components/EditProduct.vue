<template lang="pug">
.admin__edit(
  v-if="selectedProduct",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide.edit__slide_large(
      v-show="active == true")
      //- .btn_close.modal__btn_close.i-x(
      //-   @click.stop="slideEdit")
      //-   span Cerrar
      //- h3.title Editar usuario
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar producto
      form.slide__form
        .form__row.form__row_grid
          .upfile__small(v-for="(image, index) in selectedProduct.images")
            .upfile__item
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="pictures[index]",
                :width="160",
                :height="240",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
                img(
                  slot="initial",
                  :src="image")
        .form__row
          label.form__label(
            for="product-name") Nombre
          input.form__control(
            v-model="selectedProduct.title",
            id="product-name",
            type="text")
        .form__row(v-if="selectedProduct.brand")
          label.form__label(
            for="product-brand") Marca: {{ selectedProduct.brand.name }}
        .form__row
          label.form__label(
            for="product-originalPrice") Precio original
          input.form__control(
            v-model="selectedProduct.original_price",
            id="product-originalPrice",
            type="text")
        .form__row
          label.form__label(
            for="product-priveSale") Precio de venta
          input.form__control(
            v-model="selectedProduct.price",
            id="product-priveSale",
            type="text")
        .form__row
          label.form__label(
            for="product-commission") Comision
          input.form__control(
            id="product-commission",
            v-model="selectedProduct.commission",
            type="text")
        .form__row
          label.form__label Estado del producto: {{ selectedProduct.status | status_code }}
        .form__row(v-if="enabledStateChange")
          label.form__label(
            for='state') Cambiar estado
          select.form__select(
            ref='state'
            id='state'
            v-model='selectedProduct.status')
            optgroup(label='Cambiar estado de producto')
              option(
                v-for='state in availableStates'
                :value='state.id'
              ) {{ state.name }}
        .form__row(v-if="enabledStateChange")
          .form__label Añadir una nota para el cambio
          input.form__control(
            v-model="selectedProduct.admin_notes",
            id="admin_notes",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import productsAPI from '@/api/product'
Vue.component('croppa', Croppa.component)

export default {
  props: ['product', 'active'],
  name: 'EditProduct',
  data () {
    return {
      pictures: [null, null, null, null],
      status: 0
    }
  },
  watch: {
    product: function () {
      this.pictures.forEach((image) => {
        if (image) image.refresh()
      })
      this.status = this.product.status
    }
  },
  computed: {
    selectedProduct () {
      return this.product
    },
    availableStates () {
      if (this.status === 0) {
        const states = [
          { id: 0, name: 'No publicado' },
          { id: 1, name: 'Rechazado' },
          { id: 10, name: 'Aprobado' }
        ]
        return states
      }
      if (this.status === 19) {
        const states = [
          { id: 2, name: 'Oculto' },
          { id: 19, name: 'Disponible' }
        ]
        return states
      }
      if (this.status === 10) {
        const states = [
          { id: 2, name: 'Oculto' },
          { id: 10, name: 'Disponible' }
        ]
        return states
      }
      if (this.status === 1) {
        const states = [
          { id: 1, name: 'Rechazado' },
          { id: 10, name: 'Aprobado' }
        ]
        return states
      }
    },
    enabledStateChange () {
      if (this.status <= 20) return true
      return false
    }
  },
  methods: {
    save: function () {
      productsAPI.update(this.selectedProduct)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
