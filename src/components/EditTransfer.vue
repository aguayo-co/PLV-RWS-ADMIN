<template lang="pug">
.admin__edit(v-if="selectedTransfer.request_data"
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Aprobar transferencia
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Comprobante
          img.form__img(v-if="selectedTransfer.transfer_receipt",
            :src="selectedTransfer.transfer_receipt",
            alt="")
          p ¿Es un comprobante por ${{ selectedTransfer.request_data.amount | currency }} realizado en {{ selectedTransfer.created_at | moment("MMMM, DD YYYY") }} por {{ selectedTransfer.order.user.first_name + selectedTransfer.order.user.last_name }} ?
          input#approved.form__input-check(
            type="checkbox",
            value="algo",
            v-model="checked")
          label.form__label_check.i-ok(for="approved") {{ checked }}
          button.btn(
            :class="{'hola': checked}",
            @click.prevent="save") Aprobar
          .break
            span.break__txt O
          a.link_underline(href="#") Rechazar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import transfersAPI from '@/api/transfer'
Vue.component('croppa', Croppa.component)

export default {
  props: ['transfer', 'active'],
  name: 'EditTransfer',
  data () {
    return {
      selectedTransfer: {},
      checked: false
    }
  },
  methods: {
    save: function () {
      transfersAPI.update(this.selectedTransfer)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  },
  watch: {
    transfer: function () {
      this.selectedTransfer = this.transfer
    }
  }
}
</script>
