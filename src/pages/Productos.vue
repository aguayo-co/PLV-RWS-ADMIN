<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Productos
      //- .data-header__item(v-if="products[0]")
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en productos')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditProduct(
      :product="selectedProduct",
      :active="editActive",
      @closeEdit="slideEdit")

    //- nav.nav(v-if="products[0]")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'producto' : 'productos' }}
      // Paginador
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Tabla de contenido
    //- table.crud(v-if="products[0]")
    table.crud
      thead.crud__head
        tr
          th.crud__th
            td.crud__title
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__th
            td.crud__title Foto
          th.crud__th
            td.crud__title Nombre
          th.crud__th
            td.crud__title Marca
          th.crud__th
            td.crud__title P.&nbsp;Original
          th.crud__th
            td.crud__title P.&nbsp;Venta
          th.crud__th
            td.crud__title Comisión
          th.crud__th
            td.crud__title Usuaria
          th.crud__th
            td.crud__title Estado
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadProduct(index)",
          v-for="(product, index) in products")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
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
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
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
        //Tercera fila
        //class para row gris en tabla: .crud__toggle-open

</template>

<script>

import productAPI from '@/api/product'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import Pager from '@/components/Pager'
import EditProduct from '@/components/EditProduct'
import UserAvatar from '@/components/UserAvatar'
Vue.component('croppa', Croppa.component)

export default {
  name: 'Productos',
  components: {
    Pager,
    EditProduct,
    UserAvatar
  },
  data () {
    return {
      products: [],
      selectedProduct: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      picture: null,
      cover: null
    }
  },
  methods: {
    updateList: function () {
      productAPI.get(this.page, this.items, this.filter)
        .then(response => {
          this.products = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next') {
        this.page += 1
      } else {
        if (this.page > 1) this.page -= 1
      }
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadProduct: function (index) {
      this.selectedProduct = this.products[index]
      this.slideEdit()
    }
  },
  created: function () {
    productAPI.get(this.page, this.items, this.filter)
      .then(response => {
        this.totalItems = response.data.total
        this.totalPages = response.data.last_page
        this.products = response.data.data
      })
  }
}
</script>
