<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Transferencias bancarias
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditTransfer(
      :transfer="selectedTransfer",
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
          th.crud__th.crud__title Comprobante
          th.crud__th.crud__title Total
          th.crud__th.crud__title # Orden
          th.crud__th.crud__title Usuaria
          th.crud__th.crud__title Fecha de creación
          th.crud__th.crud__title Estado
      tbody.crud__tbody
        tr.crud__row(v-for="(payment, index) in payments",
          @click="loadTransfer(index)")
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
          td.crud__cell {{ payment.order.user.first_name + ' ' + payment.order.user.last_name }}
          td.crud__cell {{ payment.created_at | moment("D [de] MMM YY, h:mm:ss a") }}
          td.crud__cell
            p.crud__state.crud__state_detail(:class='"state-" + payment.status') {{ payment.status | payment_status }}
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

import UserAvatar from '@/components/UserAvatar'
import Pager from '@/components/Pager'
import EditTransfer from '@/components/EditTransfer'
import transfersAPI from '@/api/transfer'
import ordersAPI from '@/api/order'

export default {
  name: 'Transfers',
  components: {
    Pager,
    UserAvatar,
    EditTransfer
  },
  data () {
    return {
      payments: [],
      selectedTransfer: {},
      totalPages: null,
      page: 1,
      items: 2,
      filter: {
        gateway: 'Transfer'
      },
      // order: null,
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updatePaymentList: function () {
      transfersAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.payments = response.data.data
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
      this.updatePaymentList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadTransfer: function (index) {
      this.selectedTransfer = this.payments[index]
      this.slideEdit()
    },
    getOrderById: async function (orderId) {
      await ordersAPI.getOrderById(orderId)
        .then(response => {
          return response.data
        })
    }
  },
  created: function () {
    transfersAPI.get(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.payments = response.data.data
        // console.log(this.payments)
      })
  }
}
</script>
