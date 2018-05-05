<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Métodos de envío
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    EditShippingMethods(
      :shipping="selectedShipping",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      p.nav__text.nav__text_wide Se han encontrado {{ shippingMethods.length }} productos
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr.crud__row
          th.crud__title.crud__cell_10
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__title.crud__cell_30 Nombre
          th.crud__title.crud__cell_30 Descripción vendedora
          th.crud__title.crud__cell_30 Descripción compradora
      tbody.crud__tbody
        tr.crud__row(v-for="(shippingMethod, index) in shippingMethods")
          td.crud__cell.crud__cell_10
            input.form__input-check(:id="'shipping' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'shipping' + index")
          td.crud__cell.crud__cell_30
            a(@click="loadShipping(index)") {{ shippingMethod.name }}
          td.crud__cell.crud__cell_30 {{ shippingMethod.description_seller }}
          td.crud__cell.crud__cell_30 {{ shippingMethod.description_buyer }}
        tr.crud__row
          td(colspan="5")
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
import shippingAPI from '@/api/shippingMethod'
// import Vue from 'vue'
import EditShippingMethods from '@/components/EditShippingMethods'

export default {
  props: ['shipping', 'active'],
  name: 'ShippingMethods',
  components: {
    EditShippingMethods
  },
  data () {
    return {
      shippingMethods: [],
      selectedShipping: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null
    }
  },
  methods: {
    updateShippingList: function () {
      shippingAPI.getShippings(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.shippingMethods = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateShippingList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateShippingList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadShipping: function (index) {
      this.selectedShipping = this.shippingMethods[index]
      this.slideEdit()
    }
  },
  created: function () {
    shippingAPI.getShippings(this.page, this.items, this.filter)
      .then(response => {
        this.shippingMethods = response.data.data
      })
  }

}
</script>
