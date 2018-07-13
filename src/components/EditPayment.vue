<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Aprobar transferencia
    form.slide__form
      .form__row
        label.form__label Comprobante
        img.form__img(
          v-if="payment.transfer_receipt",
          :src="payment.transfer_receipt",
          alt="")
        p(v-else) No hay imagen una imagen cargada.
        .form__approved
          p.form__txt-approved
            input.form__input-check(
              type="checkbox"
              id="valid_receipt"
              v-model="valid_receipt")
            label.form__label_check.i-ok(for="valid_receipt")
            | ¿Es un comprobante por ${{ payment.request_data.amount | currency }} realizado en {{ payment.created_at | date }} por {{ payment.order.user | full_name }} ?
          button.btn(
            :class="[valid_receipt ? 'btn_enabled' : 'btn_disabled']"
            @click.prevent="approve") Aprobar
          .break
            span.break__txt O
          .form__rejected
            a.link_underline(
              @click.prevent='confirm_reject = true') Rechazar
            transition(name='toggle-scale')
              .toggle-box.toggle-box_rejected(
                  v-if='confirm_reject')
                p ¿Estás seguro que deseas rechazar esta transferencia?
                a.form__btn-rejected.link_underline(
                  @click.prevent="reject") Si, rechazar la transferencia
                a.form__btn-rejected.link_underline(
                  @click.prevent="confirm_reject = false") No, dejarla como está
</template>

<script>

import paymentAPI from '@/api/payment'

export default {
  props: ['object'],
  name: 'EditTransfer',
  data () {
    return {
      valid_receipt: false,
      confirm_reject: false,
      statuses: paymentAPI.statuses
    }
  },
  computed: {
    payment () {
      return this.object
    }
  },
  methods: {
    changeStatus (method) {
      paymentAPI[method](this.payment)
        .then(response => {
          return paymentAPI.getById(this.payment.id)
        })
        .then(response => {
          this.$emit('updated', response.data)
          this.$emit('close')
        }).catch(e => {
          this.$handleApiErrors(e)
        })
    },
    approve () {
      this.changeStatus('approve')
    },
    reject () {
      this.changeStatus('reject')
    }
  }
}
</script>
