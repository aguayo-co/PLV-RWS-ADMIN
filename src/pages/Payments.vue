<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Transferencias bancarias
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
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
          @change='updateOrderList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(@click.prevent='prevPage', href="#")
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(@click.prevent='nextPage', href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__th.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th.crud__title Comprobante
          th.crud__th.crud__title Total
          th.crud__th.crud__title # Orden
          th.crud__th.crud__title Usuaria
      tbody.crud__tbody
        tr.crud__row(v-for="(payment, index) in payments")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell
            img.crud__cell-img(
              v-if="payment.transfer_receipt",
              :src="payment.transfer_receipt",
              :alt="'Recibo-' + payment.id")
            span(v-else) -
          td.crud__cell ${{ payment.request_data.amount | currency }}
          td.crud__cell {{ payment.order_id }}
          td.crud__cell
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

import paymentsAPI from '@/api/payment'

export default {
  name: 'Transfers',
  components: {
  },
  data () {
    return {
      payments: [],
      selectedOrder: {},
      page: 1,
      items: 20,
      filter: {
        gateway: 'Transfer'
      },
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updatePaymentList: function () {
      paymentsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.payments = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updatePaymentList()
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updatePaymentList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBanner: function (index) {
      this.selectedOrder = this.orders[index]
      this.slideEdit()
    }
  },
  created: function () {
    paymentsAPI.get(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.payments = response.data.data
      })
  }

}
</script>
