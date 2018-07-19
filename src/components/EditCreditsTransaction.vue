<template lang="pug">
  div
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar Transacción de créditos
    form.slide__form(@submit.prevent="submit")
      .form__row(v-if="!object.id")
        label.form__label(
          for="transaction-user_id") ID de Usuario
        span.help(
          v-show='errorLog.user_id'
        ) {{ errorLog.user_id }}
        input.form__control(v-model="field_user_id" id="transaction-user_id" min=1, step=1)
      .form__row
        label.form__label(
          for="transaction-amount") Cantidad
        span.help(
          v-show='errorLog.amount'
        ) {{ errorLog.amount }}
        input.form__control(v-model="field_amount" id="transaction-amount" step=1)
      .form__row
        label.form__label(
          for="transaction-reason") Razón o motivo:
        span.help(
          v-show='errorLog.extra'
        ) {{ errorLog.extra }}
        textarea.form__control(v-model="field_reason" id="transaction-reason")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import creditsAPI from '@/api/creditsTransaction'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  user_id: null,
  amount: null,
  extra: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  props: ['object'],
  name: 'EditCreditsTRansaction',
  computed: {
    apiMethod () {
      return this.object.id ? creditsAPI.update : creditsAPI.create
    },
    transaction () {
      return this.object
    },
    field_reason: {
      get () {
        return this.$getNestedObject(this.field_extra, ['reason'])
      },
      set (reason) {
        this.field_extra = {reason: reason}
      }
    }
  },
  methods: {
    validate () {
      let isValid = true
      const required = ['extra', 'amount', 'user_id']
      required.forEach(fieldName => {
        if (!this['field_' + fieldName]) {
          isValid = false
          this.$set(this.errorLog, fieldName, 'Este campo es requerido')
        }
      })

      return isValid
    }
  }
}
</script>
