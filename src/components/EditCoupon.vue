<template lang="pug">
  EditLayout

    template(slot="title") Editar cupón

    .form__row
      label.form__label(
        for="coupon-code") Código
      span.help(
        v-if="errorLog.code") {{ errorLog.code }}
      input.form__control(
        id="coupon-code",
        v-model="field_code",
        type="text")
    .form__row
      label.form__label(
        for="coupon-description") Descripción
      span.help(
        v-if="errorLog.description") {{ errorLog.description }}
      textarea.form__textarea(
        v-model="field_description",
        id="coupon-description",
        name="description")
    .form__row
      span.help(
        v-if="errorLog.discount_type") {{ errorLog.discount_type }}
      label.form__label(
        for='coupon-discount_type') Tipo de descuento
      select.form__select(
        id='coupon-discount_type'
        v-model='field_discount_type')
        option(value='%') % - Porcentaje
        option(value='$') $ - Exacto
    .form__row
      label.form__label(
        for="coupon-discount_value") Descuento
      span.help(
        v-if="errorLog.discount_value") {{ errorLog.discount_value }}
      input.form__control(
        v-model="field_discount_value"
        id="coupon-discount_value"
        type="number"
        step=1
        min=1)
    .form__row
      label.form__label(
        for="coupon-valid_from") Válido desde
      span.help(
        v-if="errorLog.valid_from") {{ errorLog.valid_from }}
      input.form__control(
        id="coupon-valid_from",
        v-model="field_valid_from",
        type="text"
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2})?"
        :placeholder="$moment().format('YYYY-MM-DD HH:MM')")
    .form__row
      label.form__label(
        for="coupon-valid_to") Válido hasta
      span.help(
        v-if="errorLog.valid_to") {{ errorLog.valid_to }}
      input.form__control(
        id="coupon-valid_to",
        v-model="field_valid_to",
        type="text"
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2})?"
        :placeholder="$moment().format('YYYY-MM-DD HH:MM')")
    .form__row
      label.form__label(
        for="coupon-minimum_price") Precio mínimo
      span.help(
        v-if="errorLog.minimum_price") {{ errorLog.minimum_price }}
      input.form__control(
        required
        v-model="field_minimum_price"
        id="coupon-minimum_price"
        type="number"
        step=1
        min=0)
    .form__row
      label.form__label(
        for="coupon-minimum_commission") Comisión mínima
      span.help(
        v-if="errorLog.minimum_commission") {{ errorLog.minimum_commission }}
      input.form__control(
        required
        v-model="field_minimum_commission"
        id="coupon-minimum_commission"
        type="number"
        step=1
        min=0,
        max=100)
    .form__row
      span.help(
        v-if="errorLog.first_purchase_only") {{ errorLog.first_purchase_only }}
      input.form__input-check(
        type="checkbox"
        id="coupon-first_purchase_only"
        v-model="field_first_purchase_only")
      label.form__label-checkbox.i-ok(
        for="coupon-first_purchase_only") Sólo primera compra
    .form__row
      span.help(
        v-if="errorLog.status") {{ errorLog.status }}
      input.form__input-check(
        type="checkbox"
        id="coupon-status"
        v-model="field_status")
      label.form__label-checkbox.i-ok(
        for="coupon-status") Activo
    .form__row
      label.form__label Campañas
      span.help(
        v-if="errorLog.campaigns_ids") {{ errorLog.campaigns_ids }}
      .row(v-for="campaign in campaigns")
        input.form__input-check(
          type="checkbox"
          :id="'user-campaign-' + campaign.id"
          :value="campaign.id"
          v-model="field_campaigns_ids")
        label.form__label-checkbox.i-ok(
          :for="'user-campaign-' + campaign.id") {{ campaign.name }}
    .form__row
      label.form__label Marcas
      span.help(
        v-if="errorLog.brands_ids") {{ errorLog.brands_ids }}
      .row(v-for="brand in brands")
        input.form__input-check(
          type="checkbox"
          :id="'user-brand-' + brand.id"
          :value="brand.id"
          v-model="field_brands_ids")
        label.form__label-checkbox.i-ok(
          :for="'user-brand-' + brand.id") {{ brand.name }}
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import couponAPI from '@/api/coupon'
import { mapState } from 'vuex'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  code: null,
  description: null,
  discount_value: null,
  discount_type: null,
  valid_from: null,
  valid_to: null,
  minimum_price: null,
  minimum_commission: null,
  status: null,
  first_purchase_only: null,
  brands_ids: null,
  campaigns_ids: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditCampaign',
  computed: {
    ...mapState('ui', [
      'campaigns',
      'brands'
    ]),
    apiMethod () {
      return this.object.id ? couponAPI.update : couponAPI.create
    },
    coupon () {
      return this.object
    },
    payload () {
      const payload = {
        ...this.newData
      }

      // COnvertimos cualquier valor a entero.
      if (typeof payload.status !== 'undefined') {
        payload.status = payload.status ? 1 : 0
      }

      const format = 'YYYY-MM-DD HH:mm:00'

      if (this.newData.valid_from && typeof this.newData.valid_from === 'string') {
        payload.valid_from = this.$moment(this.newData.valid_from).utc().format(format)
        if (typeof this.newData.valid_to === 'undefined' && this.coupon.valid_to) {
          payload.valid_to = this.$moment(this.coupon.valid_to).utc().format(format)
        }
      }

      if (this.newData.valid_to && typeof this.newData.valid_to === 'string') {
        payload.valid_to = this.$moment(this.newData.valid_to).utc().format(format)
        if (typeof this.newData.valid_from === 'undefined' && this.coupon.valid_from) {
          payload.valid_from = this.$moment(this.coupon.valid_from).utc().format(format)
        }
      }

      return payload
    }
  },
  created () {
    if (typeof this.object.status === 'undefined') {
      this.object.status = 1
    }

    // Define valores por defecto para objetos nuevos.
    if (typeof this.object.brands_ids === 'undefined') {
      this.object.brands_ids = []
    }

    if (typeof this.object.campaigns_ids === 'undefined') {
      this.object.campaigns_ids = []
    }
  }
}
</script>
