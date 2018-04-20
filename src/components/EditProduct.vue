<template lang="pug">
.admin__edit(
  v-if="selectedProduct",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      //- .btn_close.modal__btn_close.i-x(
      //-   @click.stop="slideEdit")
      //-   span Cerrar
      //- h3.title Editar usuario
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar producto
      form.slide__form
        .form__row
          .form__label Foto del producto
          .upfile__small
            .upfile__item
              .upfile__label
                .upfile__text.i-upload Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model="picture",
                :initial-image="selectedProduct.initialImage"
                :width="300",
                :height="300",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
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
            v-model="status")
          label.form__label_radio(
            for="estado-1") Pendiente
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="1",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Rechazado
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="10",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Aprobado
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="1",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Rechazado
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="19",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Disponible
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="30",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Vendido
        .form__row
          input.form__input-radio(
            id="estado-2",
            type="radio",
            name="estados",
            value="31",
            v-model="status")
          label.form__label_radio(
            for="estado-2") Deshabilitado
        //-select form
        //- .form__row
          label.form__label(
            for="select") Select
          select.form__select.form__select_big(
            name="select",
            id="select")
            option(value="1") Item
            option(value="2") Item
            option(value="3") Item
            option(value="4") Item
        .form__row.form__row_away
          button.btn.btn_solid.btn_block Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  props: ['product', 'active'],
  name: 'EditProduct',
  data () {
    return {
      picture: null,
      cover: null
    }
  },
  computed: {
    selectedProduct: function () {
      return this.product
    },
    status: function () {
      return this.product.status
    }
  },
  updated: function () {
    this.picture.refresh()
  }

}
</script>
