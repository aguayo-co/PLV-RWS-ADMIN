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
      // Pager
      Pager(
        :currentItems="items",
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
          td.crud__cell {{ payment.created_at | date-time }}
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
import PagerMixin from '@/mixins/PagerMixin'
import EditTransfer from '@/components/EditTransfer'
import transfersAPI from '@/api/transfer'
import ordersAPI from '@/api/order'

export default {
  name: 'Transfers',
  mixins: [PagerMixin],
  components: {
    UserAvatar,
    EditTransfer
  },
  data () {
    return {
      payments: [],
      selectedTransfer: {},
      parameters: {
        'filter[gateway]': 'Transfer',
        'orderby': '-id'
      },
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      transfersAPI.get({...this.parameters, items: this.items, page: this.page})
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.payments = response.data.data
        })
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
  }
}
</script>
