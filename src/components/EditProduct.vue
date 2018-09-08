<template lang="pug">
  EditLayout.edit__slide_large

    template(slot="title") Editar producto

    .form__row
      label.form__label Estado actual
      p {{ statuses[product.status] }}
    .form__row
      label.form__label(for="product-status") Nuevo estado
      span.help(
          v-if="errorLog.status") {{ errorLog.status }}
      select.form__select(
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
    .form__row
      label.form__label Imagen para Instashop
      span.help(
        v-if="errorLog.image_instagram") {{ errorLog.image_instagram }}
      .upfile__small
        uploadPhoto(
          v-model="field_image_instagram"
          :initialImage='product.image_instagram'
          :square="true")
    .form__row
      label.form__label Imágenes
      span.help(
        v-if="errorLog.images") {{ errorLog.images }}
      .upfile__small(v-for="i in 4")
        uploadPhoto(
          v-model="new_images[i - 1]"
          :initialImage='sortedImages[i - 1]')
    .form__row
      label.form__label(
        for="product-title") Título
      span.help(
        v-if="errorLog.title") {{ errorLog.title }}
      input.form__control(
        id="product-title",
        v-model="field_title",
        type="text")
    .form__row
      label.form__label(
        for="product-description") Descripción
      span.help(
        v-if="errorLog.description") {{ errorLog.description }}
      textarea.form__control(
        id="product-description",
        v-model="field_description",
        type="text")
    .form__row
      label.form__label(for="product-category_id") Categoría
      span.help(
          v-if="errorLog.category_id") {{ errorLog.category_id }}
      select.form__select(
        v-model="field_category_id"
        id="product-category_id")
        optgroup(v-for="category in categories" :value="category.id" :label="category.name")
          option(v-for="subcategory in category.children" :value="subcategory.id") {{ subcategory.name }}
    .form__row
      label.form__label Colores
      span.help(
          v-if="errorLog.color_ids") {{ errorLog.color_ids }}
      .row(v-for="color in colors")
        input.form__input-check(
          type="checkbox"
          :id="'product-color-' + color.id"
          :value="color.id"
          v-model="field_color_ids")
        label.form__label-checkbox.i-ok(
          :for="'product-color-' + color.id")
            span(:style="'background-color:' + color.hex_code + '; width: 1em; height: 1em; display: inline-block'")
            span  {{ color.name }}
    .form__row
      label.form__label(for="product-size_id") Talla
      span.help(
          v-if="errorLog.size_id") {{ errorLog.size_id }}
      select.form__select(
        v-model="field_size_id"
        id="product-size_id")
        optgroup(v-for="size in sizes" :value="size.id" :label="size.name")
          option(v-for="subsize in size.children" :value="subsize.id") {{ subsize.name }}
    .form__row
      label.form__label(for="product-brand_id") Marca
      span.help(
          v-if="errorLog.brand_id") {{ errorLog.brand_id }}
      select.form__select(
        v-model="field_brand_id"
        id="product-brand_id")
        option(v-for="brand in brands" :value="brand.id") {{ brand.name }}
    .form__row
      label.form__label(
        for="product-dimensions") Medidas
      span.help(
        v-if="errorLog.dimensions") {{ errorLog.dimensions }}
      input.form__control(
        id="product-dimensions",
        v-model="field_dimensions",
        type="text")
    .form__row
      label.form__label(
        for="product-price") Precio de venta
      span.help(
        v-if="errorLog.price") {{ errorLog.price }}
      input.form__control(
        id="product-price",
        v-model="field_price",
        type="number"
        step="1"
        min="0")
    .form__row
      label.form__label(
        for="product-original_price") Precio original
      span.help(
        v-if="errorLog.original_price") {{ errorLog.original_price }}
      input.form__control(
        id="product-original_price",
        v-model="field_original_price",
        type="number"
        step="1"
        min="0")
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
  original_price: null,
  price: null,
  dimensions: null,
  color_ids: null,
  category_id: null,
  size_id: null,
  brand_id: null,
  title: null,
  description: null,
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
      statuses: productAPI.statuses,
      new_images: []
    }
  },
  computed: {
    ...mapState('ui', [
      'brands',
      'campaigns',
      'categories',
      'colors',
      'sizes'
    ]),
    // Images should come with names like #-@@@@@@@.ext
    // We try to return the images using the index (#) it has in the name.
    // This allows the user to set the images in the order that he/she wants.
    // If the user removes the second image, that field will remain empty.
    sortedImages () {
      // Guarda la imágenes que traen índice válido.
      const indexed = []
      // Guarda la imágenes que no traen índice válido.
      const nonIndexed = []
      this.product.images.forEach(url => {
        const name = url.split('/').slice(-1)[0]
        // Busca imágenes con índice entre 0 y 3
        // Cualquier otro índice, es inválido para nosotros.
        const matches = name.match(/^([0-3])-/)
        if (matches &&
          !indexed[parseInt(matches[1])]) {
          indexed[matches[1]] = url
          return
        }
        nonIndexed.push(url)
      })

      // Buscamos entre las imágenes que no tienen índice y las agregamos
      // al arreglo de las indexadas en la primera posición disponible
      // encontrada.
      let i = 0
      while (nonIndexed.length > 0) {
        if (!indexed[i]) {
          indexed[i] = nonIndexed.shift()
        }
        i++
      }
      return indexed
    },
    payload () {
      const imagesRemove = []
      const images = []
      const payload = {
        ...this.newData
      }
      this.new_images.forEach((image, i) => {
        if (image === this.product.images[i]) {
          return
        }
        if (this.sortedImages[i]) {
          imagesRemove.push(this.sortedImages[i].split('/').slice(-1)[0])
        }
        if (image) {
          images[i] = image
        }
      })

      if (imagesRemove.length) {
        payload.images_remove = imagesRemove
      }

      if (images.length) {
        payload.images = images
      }

      return payload
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
