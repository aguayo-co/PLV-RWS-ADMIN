<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Ventas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en ventas')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    // EditSale(
      :banner="selectedSale",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      // Pager
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__th.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th.crud__title Imagen
          th.crud__th.crud__title Nombre
          th.crud__th.crud__title Título
          th.crud__th.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row(v-for="(sale, index) in sales")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell
            img.crud__cell-img(
              v-if="sale.image",
              :src="sale.image",
              :alt="sale.image")
            span(v-else) -
          td.crud__cell
            a(@click="loadBanner(index)") {{ sale.name }}
          td.crud__cell {{ sale.title }}
          td.crud__cell {{ sale.created_at }}
        tr
          td(colspan="12")
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

import salesAPI from '@/api/sale'
// import EditSale from '@/components/EditSale'

export default {
  name: 'Sales',
  components: {
  },
  data () {
    return {
      sales: [],
      selectedSale: {},
      page: 1,
      items: 20,
      filter: {},
      order: '-id',
      editActive: false,
      picture: null
    }
  },
  methods: {
    updateBannerList: function () {
    },
    onPageChanged: function (direction) {
      if (direction === 'next') {
        this.page += 1
      } else {
        if (this.page > 1) this.page -= 1
      }
    },
    onItemsChanged: function (items) {
      this.items = items
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBanner: function (index) {
      this.selectedSale = this.sales[index]
      this.slideEdit()
    }
  },
  created: function () {
    salesAPI.get(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.sales = response.data.data
      })
  }

}
</script>
