<template lang="pug">
  .edit__slide_large
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar producto
    form.slide__form(@submit.prevent="submit")
      // .form__row
      //   .form__label Imagen para Instashop
      //   .upfile__small
      //     .upfile__item
      //       .upfile__label
      //         .upfile__text.i-upload Arrastra una foto o
      //         .upfile__btn Sube una imagen
      //       croppa(
      //         v-model="image_instagram",
      //         :width="300",
      //         :height="300",
      //         :quality="2",
      //         placeholder="",
      //         :prevent-white-space="true")
      //         img(
      //           slot="initial",
      //           :src="product.image_instagram")
      .form__row(v-if="field_status < 10")
        label.form__label(for="product-admin_notes") Este producto se rechazó porque:
        input.form__control(
          v-model="field_admin_notes",
          id="product-admin_notes",
          type="text")
      .form__row
        label.form__label Estado
        p {{ statuses[product.status] }}
      .form__row
        label.form__label(
          for="product-status") Nuevo estado
        select.form__control(v-model="field_status" id="product-status")
          option(v-for="(status, index) in availableStatuses" :value="index") {{ status }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import Croppa from 'vue-croppa'
import productAPI from '@/api/product'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  admin_notes: null,
  status: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  props: ['object'],
  name: 'EditProduct',
  components: {
    croppa: Croppa.component
  },
  data () {
    return {
      apiMethod: productAPI.update,
      statuses: productAPI.statuses
    }
  },
  computed: {
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
