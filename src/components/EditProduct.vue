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
            for="product-brand") Marca
          input.form__control(
            v-model="selectedProduct.brand.name",
            id="product-brand",
            type="text")
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
        .form__row(v-if="selectedProduct.user")
          label.form__label(
            for="product-user") Usuaria
          input.form__control(
            v-model="selectedProduct.user.first_name",
            id="product-user",
            type="text")
        .form__row
          .form__label Estado
          input.form__input-radio(
            id="estado-1",
            type="radio",
            name="estados",
            value="0",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-1") Pendiente
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="1",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-2") Rechazado
        .form__row
          input.form__input-radio(
            id="estado-3",
            type="radio",
            name="estados",
            value="10",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-3") Aprobado
        .form__row
          input.form__input-radio(
            id="estado-4",
            type="radio",
            name="estados",
            value="19",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-4") Disponible
        .form__row
          input.form__input-radio(
            id="estado-5",
            type="radio",
            name="estados",
            value="30",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-5") Vendido
        .form__row
          input.form__input-radio(
            id="estado-6",
            type="radio",
            name="estados",
            value="31",
            v-model.number="selectedProduct.status")
          label.form__label_radio(
            for="estado-6") Deshabilitado
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
    selectedProduct: function () {
      return this.product
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
