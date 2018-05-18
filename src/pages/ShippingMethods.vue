<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Métodos de envío
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditShippingMethods(
      :shipping="selectedShipping",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      p.nav__text.nav__text_wide Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'método de envío' : 'métodos de envío' }}
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_check
            input.form__input-check(
              type="checkbox",
              id="all"
              name="all",
              value="selectAll")
            label.form__label_check.i-ok(
              for="all")
          th.crud__title.crud__cell_22 Nombre
          th.crud__title Descripción vendedora
          th.crud__title Descripción compradora
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadShipping(index)",
          v-for="(shippingMethod, index) in shippingMethods")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          td.crud__cell {{ shippingMethod.name }}
          td.crud__cell.crud__cell_legible {{ shippingMethod.description_seller }}
          td.crud__cell.crud__cell_legible {{ shippingMethod.description_buyer }}
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
import EditShippingMethods from '@/components/EditShippingMethods'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['shipping', 'active'],
  name: 'ShippingMethods',
  components: {
    EditShippingMethods,
    UserAvatar
  },
  data () {
    return {
      shippingMethods: [],
      selectedShipping: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      shippingAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.shippingMethods = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next' && this.page < this.totalPages) {
        this.page += 1
      } else if (direction === 'prev' && this.page > 1) {
        this.page -= 1
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
    loadShipping: function (index) {
      this.selectedShipping = this.shippingMethods[index]
      this.slideEdit()
    }
  },
  created: function () {
    shippingAPI.get(this.page, this.items, this.filter)
      .then(response => {
        this.totalItems = response.data.total
        this.totalPages = response.data.last_page
        this.shippingMethods = response.data.data
      })
  }

}
</script>
