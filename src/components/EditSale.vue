<template lang="pug">
  div
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar ventas
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label Id
        p {{ sale.id }}
      .form__row
        label.form__label Productos
        p(v-for="product in sale.products") {{ product.title }}
      .form__row
        label.form__label Vendedora
        p {{ sale.user.full_name }}
      .form__row
        label.form__label Compradora
        p {{ sale.order.user.full_name }}
      .form__row
        label.form__label Total
        p {{ sale.total | currency }}
      .form__row
        label.form__label Estado
        p {{ statuses[sale.status] }}
      .form__row
        label.form__label(
          for="sale-status") Nuevo estado
        select.form__control(v-model="field_status" id="sale-status")
          option(v-for="(status, index) in availableStatuses" :value="index") {{ status }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import saleAPI from '@/api/sale'
import EditFormMixin from '@/mixins/EditFormMixin'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  status: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditSale',
  data () {
    return {
      apiMethod: saleAPI.update,
      statuses: saleAPI.statuses
    }
  },
  computed: {
    availableStatuses () {
      const statuses = {}
      const minimumStatus = this.sale.status === 41 ? 40 : this.sale.status
      const allowed = [40, 41, 99]
      allowed.forEach(status => {
        if (status >= minimumStatus) {
          statuses[status] = this.statuses[status]
        }
      })
      return statuses
    },
    sale () {
      return this.object
    }
  }
}
</script>
