<template lang="pug">
  ListLayout
    template(slot="title") Cupones

    template(slot="columns")
      th.crud__title Cupón
      th.crud__title Descripción
      th.crud__title Válido desde
      th.crud__title Válido hasta
      th.crud__title Precio mínimo
      th.crud__title Comisión mínima
      th.crud__title Descuento
      th.crud__title Sólo primera compra
      th.crud__title Activo
      th.crud__title Campañas
      th.crud__title Marcas
    template(
      v-for="coupon in coupons"
      :slot="'row-' + coupon.id")
      td.crud__cell {{ coupon.code }}
      td.crud__cell {{ coupon.description }}
      td.crud__cell {{ coupon.valid_from  }}
      td.crud__cell {{ coupon.valid_to }}
      td.crud__cell {{ coupon.minimum_price | currency | unempty }}
      td.crud__cell {{ coupon.minimum_commission | unempty }}
      td.crud__cell
        template(v-if="coupon.discount_type === '%'") {{ coupon.discount_value }}%
        template(v-else) {{ coupon.discount_value | currency }}
      td.crud__cell(v-html="coupon.first_purchase_only ? 'Si' : 'No'")
      td.crud__cell(v-html="coupon.status ? 'Si' : 'No'")
      td.crud__cell
        ul(v-if="coupon.campaigns_ids.length")
          li(v-for="campaign in coupon.campaigns") {{ campaign.name }}
      td.crud__cell
        ul(v-if="coupon.brands_ids.length")
          li(v-for="brand in coupon.brands") {{ brand.name }}
</template>

<script>
import couponAPI from '@/api/coupon'
import ListMixin from '@/mixins/ListMixin'
import EditCoupon from '@/components/EditCoupon'

export default {
  name: 'Campaigns',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditCoupon,

      objectsKey: 'rawCoupons',
      loaderMethod: couponAPI.get,

      rawCoupons: [],

      canCreate: true
    }
  },
  computed: {
    coupons () {
      return this.rawCoupons.map(coupon => {
        coupon.valid_to = coupon.valid_to ? this.$moment(coupon.valid_to).format('YYYY-MM-DD HH:mm') : null
        coupon.valid_from = coupon.valid_from ? this.$moment(coupon.valid_from).format('YYYY-MM-DD HH:mm') : null
        return coupon
      })
    }
  }
}
</script>
