<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Usuarias
      //- .data-header__item(v-if="products[0]")
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en productos')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    //- nav.nav(v-if="products[0]")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(
          name="numeroItems",
          v-model='items',
          @change='updateProductList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a(href="#").pagination__arrow.pagination__arrow_prev.i-back(@click.prevent='prevPage')
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item
          a(href="#").pagination__arrow.pagination__arrow_next.i-next(@click.prevent='nextPage')
    //Tabla de contenido
    //- table.crud(v-if="products[0]")
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__th
            td.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th
            td.crud__title Usuaria
          th.crud__th
            td.crud__title Email
          th.crud__th
            td.crud__title Telefono
          th.crud__th
            td.crud__title Roles
          th.crud__th
            td.crud__title Grupos
          th.crud__th
            td.crud__title Vaciones
          th.crud__th
            td.crud__title Creditos
          th.crud__th
            td.crud__title Productos<br>publicados
          th.crud__th
            td.crud__title Productos<br>vendidos
          th.crud__th
            td.crud__title Productos<br>comprados
          th.crud__th
            td.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row(v-for="(product, index) in products")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell
            figure.crud__avatar.avatar
              img.avatar__img(v-if="product.user.picture", :src="product.user.picture", :alt="product.user.first_name")
              span.tool-user__letter.avatar__img(
                v-else
              ) {{ product.user.first_name.charAt(0) }}
              figcaption.avatar__txt {{ product.user.first_name + ' ' + product.user.last_name }}
          td.crud__cell geraldine@diaz.com
          td.crud__cell 3103681000
          td.crud__cell Vendedora
          td.crud__cell Priloverstar
          td.crud__cell.crud__cell_center Si
          td.crud__cell.crud__cell_center 47
          td.crud__cell.crud__cell_center 14
          td.crud__cell.crud__cell_center 8
          td.crud__cell.crud__cell_center 5
          td.crud__cell 10/03/2018
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

import productAPI from '@/api/product'

export default {
  name: 'Producto',
  data () {
    return {
      products: [],
      page: 1,
      items: 10,
      filter: {},
      totalPages: null,
      wide : true
    }
  },
  methods: {
    updateProductList: function () {
      productAPI.getProducts(this.page, this.items, this.filter)
        .then(response => {
          this.products = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateProductList()
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateProductList()
    }
  },
  created: function () {
    productAPI.getProducts(this.page, this.items, this.filter)
      .then(response => {
        this.totalPages = response.data.to
        this.products = response.data.data
      })
  }
}
</script>
