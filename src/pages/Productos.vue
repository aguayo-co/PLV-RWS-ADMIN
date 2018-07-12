<template lang="pug">
  ListLayout
    template(slot="title") Productos

    template(slot="columns")
      th.crud__th.crud__title Foto
      th.crud__th.crud__title Nombre
      th.crud__th.crud__title Marca
      th.crud__th.crud__title Precio original
      th.crud__th.crud__title Precio venta
      th.crud__th.crud__title Comisión
      th.crud__th.crud__title Usuaria
      th.crud__th.crud__title Estado

    template(
      v-for="product in products"
      :slot="'row-' + product.id")
      td.crud__cell
        img.crud__cell-img(:src="product.images[0]", :alt="product.title")
      td.crud__cell {{ product.title }}
      td.crud__cell {{ product.brand.name }}
      td.crud__cell ${{ product.original_price | currency }}
      td.crud__cell(:class='{ "danger": product.price > product.original_price - ( product.original_price * 0.1 ) }') ${{ product.price | currency }}
      td.crud__cell {{ product.commission }} %
        small.crud__cell-small (${{ product.price * product.commission/100 | currency }})
      td.crud__cell
        figure.crud__avatar.avatar
          img.avatar__img(v-if="product.user.picture", :src="product.user.picture", :alt="product.user.first_name")
          span.tool-user__letter.avatar__img(
            v-else
          ) {{ product.user.first_name.charAt(0) }}
          figcaption.avatar__txt {{ product.user.first_name + ' ' + product.user.last_name }}
      td.crud__cell
        p.crud__state.crud__state_detail(:class='"state-" + product.status') {{ product.status | status_code }}

    template(slot="tfoot")
      tr
        td(colspan="9")
          form.crud__form(action="")
            p.crud__legend Cambiar estado
            select.form__select
              option(value="Pendiente") Pendiente
              option(value="Rechazado") Rechazado
              option(value="Aprobado") Aprobado
              option(value="Disponible") Disponible
              option(value="No disponible") No disponible
              option(value="Vendido") Vendido
            input.crud__btn(type="submit", value="Guardar")

</template>

<script>

import productAPI from '@/api/product'
import EditProduct from '@/components/EditProduct'
import ListMixin from '@/mixins/ListMixin'

import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'Productos',
  mixins: [ListMixin],
  data () {
    return {
      slide: EditProduct,

      objectsKey: 'products',
      loaderMethod: productAPI.get,

      products: [],
      picture: null,
      cover: null
    }
  }
}
</script>
