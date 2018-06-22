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
          .form__approved
            p.form__txt-approved
              input#approved.form__input-check(
                type="checkbox",
                value="algo",
                v-model="checked")
              label.form__label_check.i-ok(for="approved")
              | ¿Es un comprobante por ${{ selectedTransfer.request_data.amount | currency }} realizado en {{ selectedTransfer.created_at | moment("MMMM, DD YYYY") }} por {{ selectedTransfer.order.user.first_name + selectedTransfer.order.user.last_name }} ?
            button.btn(
              :class="{'btn_enabled': checked, 'btn_disabled': checked == false || null}",
              @click.prevent="approved($event)") Aprobar
            .break
              span.break__txt O
            .form__rejected
              a.link_underline(
                @click='toggleBox') Rechazar
              transition(name='toggle-scale')
                .toggle-box.toggle-box_rejected(
                    v-show='rejectedCheck')
                  p ¿estas seguro que deseas rechazar esta transferencia?
                  button.form__btn-rejected.link_underline(
                    href="#",
                    @click.prevent="rejected") si
                  a.form__btn-rejected.link_underline(href="#",
                    @click.prevent="$emit('closeEdit')") no
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
      checked: false,
      rejectedCheck: false
    }
  },
  methods: {
    save: function (event) {
      transfersAPI.update(this.selectedTransfer)
        .then(response => {
          this.$emit('closeEdit')
        })
    },
    toggleBox: function () {
      this.rejectedCheck = !this.rejectedCheck
    },
    approved: function (event) {
      event.target.disabled = true
      const data = {
        reference: this.selectedTransfer.request_data.reference,
        status: 'approved'
      }
      transfersAPI.approved(data)
        .then(response => {
          this.$emit('closeEdit')
          event.target.disabled = false
          this.checked = false
        })
    },
    rejected: function () {
      const data = {
        reference: this.selectedTransfer.request_data.reference,
        status: 'rejected'
      }
      transfersAPI.rejected(data)
        .then(response => {
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
