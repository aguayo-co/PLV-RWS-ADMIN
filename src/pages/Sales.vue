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
          th.crud__th.crud__title #Orden
          th.crud__th.crud__title #Venta
          th.crud__th.crud__title Fecha
          th.crud__th.crud__title Productos
          th.crud__th.crud__title Comisión
          th.crud__th.crud__title Compradora
          th.crud__th.crud__title Vendedora
          th.crud__th.crud__title Subtotal
          th.crud__th.crud__title Envío
          th.crud__th.crud__title Método
          th.crud__th.crud__title Créditos
          th.crud__th.crud__title Cupón
          th.crud__th.crud__title Estado
      tbody.crud__tbody
        tr.crud__row(
          v-for="(sale, index) in sales")
          //- Checkbox #1
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          //- Id Orden #2
          td.crud__cell {{ sale.order_id }}
          //- Id Ventas #3
          td.crud__cell {{ sale.id }}
          //- Fecha #4
          td.crud__cell {{ sale.created_at }}
          //- Productos #5
          td.crud__cell
            ul
              li(v-for="product in sale.products") 
                img.crud__cell-img(
                  :src="product.images[0]",
                  :alt="product.title")
                p.crud__text_small {{ product.title }}
                p.crud__text_small {{ product.price }}
          //- Comisión #6
          td.crud__cell {{ sale.commission | currency }}
          //- Compradora #7
          td.crud__cell {{ sale.user.first_name }} {{ sale.user.last_name }}
          //- Vendedora #8
          td.crud__cell {{ sale.order.user.first_name }} {{ sale.order.user.last_name }}
          //- Subtotal #9
          td.crud__cell {{ sale.total - sale.shipping_cost | currency}}
          //- Envío #10
          td.crud__cell {{ sale.shipping_cost }}
          //- Metodo #11
          td.crud__cell
            span(v-if="sale.shipping_method") {{ sale.shipping_method.name }}
            span(v-else) -
          //- Credito amount #12 
          td.crud__cell 
            span(
              v-if="sale.credits_transactions.length > 1") {{ sale.credits_transactions.amount }}
            span(v-else) -
          //- Cupon #13
          td.crud__cell 
            span(
              v-if="sale.coupon") {{ sale.coupon.code }}
            span(v-else) -
          //- Estado #14
          td.crud__cell {{ sale.status | sale_status }}
        tr
          td(colspan="14")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              select.form__select
                option(value="Carro de compras") Carro de compras
                option(value="En pago") En pago
                option(value="Pagada") Pagada
                option(value="Enviada") Enviada
                option(value="Entregada") Entregada
                option(value="Recibida") Recibida
                option(value="Completada") Completada
                // red
                option(value="Completada con devolución") Completada con devolución
                // red
                option(value="Completada con devolución parcial") Completada con devolución parcial
                option(value="Enviada") Enviada
                option(value="Entregada") Entregada
                option(value="Cancelada") Cancelada
              input.crud__btn(type="submit", value="Guardar")
        //Tercera fila
        //class para row gris en tabla: .crud__toggle-open
        //-Trash
        // enlaces a panel de edición
        //- a(@click="loadBanner(index)") {{ sale.name }}
        //Imagen condicional
        //- img.crud__cell-img(
        //-   v-if="sale.image",
        //-   :src="sale.image",
        //-   :alt="sale.image")
        //- span(v-else) -

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
    loadSale: function (index) {
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
