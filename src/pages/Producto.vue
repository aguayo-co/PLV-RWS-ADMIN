<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Productos
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en productos')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
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
    table.crud
      thead.crud__head
        tr
          th.crud__th
            td.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
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
        tr.crud__row(v-for="product in products")
          td.crud__cell
            input#item2.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item2")
          td.crud__cell
            img.crud__cell-img(:src="product.images[0]", :alt="product.title")
          td.crud__cell {{ product.title }}
          td.crud__cell {{ product.brand.name }}
          td.crud__cell $ {{ product.original_price | currency }}
          td.crud__cell(:class='{ "danger": product.price > product.original_price - ( product.original_price * 0.1 ) }') $ {{ product.price | currency }}
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

export default {
  name: 'Producto',
  data () {
    return {
      products: [],
      page: 1,
      items: 10,
      filter: {},
      totalPages: null
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
