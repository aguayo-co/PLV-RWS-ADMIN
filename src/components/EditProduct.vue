<template lang="pug">
  .edit__slide_large
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar producto
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label Imagen para Instashop
        span.help(
          v-if="errorLog.image_instagram") {{ errorLog.image_instagram }}
        .upfile__small
          uploadPhoto(
            v-model="new_image_instagram"
            :initialImage='product.image_instagram'
            :square="true")
      .form__row
        label.form__label Campañas
        span.help(
            v-if="errorLog.campaign_ids") {{ errorLog.campaign_ids }}
        .row(v-for="campaign in campaigns")
          input.form__input-check(
            type="checkbox"
            :id="'product-campaign-' + campaign.id"
            :value="campaign.id"
            v-model="field_campaign_ids")
          label.form__label-checkbox.i-ok(
            :for="'product-campaign-' + campaign.id") {{ campaign.name }}
      .form__row
        label.form__label(for="product-commission") Comisión
        span.help(
            v-if="errorLog.commission") {{ errorLog.commission }}
        input.form__control(
          id="product-commission"
          v-model="field_commission"
          type="number"
          step="1"
          min="0"
          max="100")
      .form__row
        label.form__label Estado actual
        p {{ statuses[product.status] }}
      .form__row
        label.form__label(for="product-status") Nuevo estado
        span.help(
            v-if="errorLog.status") {{ errorLog.status }}
        select.form__control(
          v-model="field_status"
          id="product-status")
          option(v-for="(status, index) in availableStatuses" :value="index") {{ status }}
      .form__row(v-if="field_status < 10")
        label.form__label(for="product-admin_notes") Este producto se rechazó porque:
        span.help(
            v-if="errorLog.admin_notes") {{ errorLog.admin_notes }}
        input.form__control(
          v-model="field_admin_notes",
          id="product-admin_notes",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import productAPI from '@/api/product'
import uploadPhoto from './shared/uploadPhoto'
import { mapState } from 'vuex'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  admin_notes: null,
  status: null,
  image_instagram: null,
  campaign_ids: null,
  commission: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditProduct',
  components: {
    uploadPhoto
  },
  data () {
    return {
      apiMethod: productAPI.update,
      statuses: productAPI.statuses
    }
  },
  computed: {
    ...mapState('ui', [
      'campaigns'
    ]),
    new_image_instagram: {
      get () {
        return this.newData.image_instagram
      },
      set (value) {
        // Si es la misma imagen, no enviamos nada.
        if (value === this.product.image_instagram) {
          this.field_image_instagram = value
          return
        }

        // ELiminamos imagen?
        if (!value) {
          this.field_image_instagram = ''
          return
        }

        // Enviamos imagen, si hay una.
        if (value.hasImage()) {
          value.promisedBlob().then(blob => {
            this.field_image_instagram = blob
          })
        }
      }
    },
    product () {
      return this.object
    },
    getSTatuses (ids) {
      const statuses = {}
      Object.keys(this.statuses).forEach(status => {
        if (ids.indexOf(status) !== -1) {
          statuses[status] = this.statuses[status]
        }
      })
      return statuses
    },
    availableStatuses () {
      // Estado para productos NO vendidos.
      if (this.product.status <= 29) {
        const statuses = {}
        Object.keys(this.statuses).forEach(status => {
          if (status <= 29) {
            statuses[status] = this.statuses[status]
          }
        })
        return statuses
      }

      // Estado para productos vendidos.
      if (this.product.status >= 31) {
        const statuses = {}
        Object.keys(this.statuses).forEach(status => {
          if (status >= 31) {
            statuses[status] = this.statuses[status]
          }
        })
        return statuses
      }

      return {}
    }
  }
}
</script>
