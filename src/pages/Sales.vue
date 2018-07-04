<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Ventas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en ventas')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditSale(
      :sale="selectedSale",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'venta' : 'ventas' }}
      // Paginador
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
            input.form__input-check(
              type="checkbox",
              id="all",
              name="all",
              value="selectAll")
            label.form__label_check.i-ok(
              for="all")
          th.crud__th.crud__title #Orden
          th.crud__th.crud__title #Venta
          th.crud__th.crud__title Fecha
          th.crud__th.crud__title Productos
          th.crud__th.crud__title Comisión
          th.crud__th.crud__title Compradora/Vendedora
          th.crud__th.crud__title Subtotal
          th.crud__th.crud__title Envío
          th.crud__th.crud__title Método
          th.crud__th.crud__title Créditos
          th.crud__th.crud__title Cupón
          th.crud__th.crud__title Estado
      TBody(:loading="loading" :content="sales")
        tr.crud__row.crud__row_open(
          @click="loadSale(index)",
          v-for="(sale, index) in sales")
          //- Checkbox #1
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          //- Id Orden #2
          td.crud__cell {{ sale.order_id }}
          //- Id Ventas #3
          td.crud__cell {{ sale.id }}
          //- Fecha #4
          td.crud__cell {{ sale.created_at | date }}
          //- Productos #5
          td.crud__cell.crud__cell_14
            ul.crud__list
              li(v-for="product in sale.products")
                img.crud__cell-img(
                  :src="product.images[0]",
                  :alt="product.title")
                .crud__text
                  p.crud__text_small {{ product.title }}
                  p.crud__text_small ${{ product.price | currency}}
          //- Comisión #6
          td.crud__cell {{ sale.commission }}% / ${{ sale.total_commission | currency }}
          //- Compradora / Vendedora #7
          td.crud__cell
            .crud__user
              figure.crud__avatar.avatar
                img.avatar__img(
                  v-if="sale.user.picture",
                  :src="sale.user.picture",
                  :alt="sale.user.first_name")
                span.tool-user__letter.avatar__img(
                  v-else) {{ sale.user.first_name.charAt(0) }}
                figcaption.avatar__txt Compradora <br> {{ sale.user.first_name + ' ' + sale.user.last_name }}
            .crud__user
              figure.crud__avatar.avatar
                img.avatar__img(
                  v-if="sale.order.user.picture",
                  :src="sale.order.user.picture",
                  :alt="sale.order.user.first_name")
                span.tool-user__letter.avatar__img(
                  v-else) {{ sale.order.user.first_name.charAt(0) }}
                figcaption.avatar__txt Vendedora <br> {{ sale.order.user.first_name + ' ' + sale.order.user.last_name }}
          //- Subtotal #8
          td.crud__cell ${{ sale.total - sale.shipping_cost | currency}}
          //- Envío #9
          td.crud__cell
            template(v-if="sale.is_chilexpress") ${{ sale.shipping_cost | currency }}
            template(v-else) {{ | unempty }}
          //- Metodo #10
          td.crud__cell {{ sale.shipping_method.name }}
          //- Credito amount #11
          td.crud__cell ${{ sale.used_credits | currency }}
          //- Cupon #12
          td.crud__cell
            template(
              v-if="sale.coupon") {{ sale.coupon.code }}
            template(v-else) {{ | unempty }}
          //- Estado #13
          td.crud__cell
            p.crud__state.crud__state_detail(:class='"state-" + sale.status') {{ sale.status | sale_status }}
        tr
          td(colspan="13")
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
                option(value="Completada con devolución") Devolución
                option(value="Completada con devolución parcial") Devolución parcial
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
import Pager from '@/components/Pager'
import EditSale from '@/components/EditSale'
import UserAvatar from '@/components/UserAvatar'
import TBody from '@/components/TBody'

export default {
  name: 'Sales',
  components: {
    Pager,
    EditSale,
    UserAvatar,
    TBody
  },
  data () {
    return {
      loading: true,
      rawSales: [],
      selectedSale: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 20,
      filter: {
        status: '11,99'
      },
      order: '-id',
      editActive: false,
      picture: null
    }
  },
  computed: {
    sales: {
      set (sales) {
        this.rawSales = sales
      },
      get () {
        return this.rawSales.map(sale => {
          [sale.total_commission, sale.commission] = this.getCommission(sale.products)
          return sale
        })
      }
    }
  },
  methods: {
    getCommission (products) {
      const sum = products.reduce((sum, product) => {
        return product.commission * product.sale_price / 100
      }, 0)

      const percentege = sum * 100 / products.reduce((sum, product) => {
        return product.price
      }, 0)

      return [sum, parseInt(percentege)]
    },
    updateList: function () {
      const localLoading = this.loading = salesAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          if (localLoading !== this.loading) {
            return
          }
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.sales = response.data.data
        })
        .finally(() => {
          if (localLoading !== this.loading) {
            return
          }
          this.loading = false
        })
    },
    onPageChanged: function (page) {
      this.page = page
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
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
    this.updateList()
  }

}
</script>
