<template lang="pug">
  .upfile__item-wrap
    .upfile__item
      a.upfile__delete.i-x(
        v-show='showCroppa && image && image.hasImage()',
        @click='removeImage')
        span.hide Eliminar
      span.help(
        v-if="errorLog"
      ) {{ errorLog }}
      template(v-if="showCroppa")
        .upfile__label
          .upfile__text.i-upload Arrastra una foto o
          button.upfile__btn(ref="image") Sube una imagen
        croppa(
          crossOrigin='anonymous',
          v-model='image',
          :width="calculatedWidth",
          :height="calculatedHeight",
          :quality="2",
          placeholder="",
          :prevent-white-space="true",
          @draw='updateImage',
          :zoom-speed="10",
          :initial-image="initialImage",
          :disable-scroll-to-zoom="true",
          :show-remove-button="false")
      img.form__img(
        :src="initialImage"
        v-else-if="initialImage")
    .upfile__controls
      template(v-if='showCroppa')
        button.upfile__zoom-out.i-search-less.btn-tag(
          @click.prevent="zoom('out')") Alejar
        button.btn-tag(
          v-if='initialImage'
          @click.prevent="resetOriginal") Cancelar
        button.upfile__zoom-in.i-search-plus.btn-tag(
          @click.prevent="zoom('in')") Acercar
      template(v-else-if='initialImage')
        button.btn-tag(
          @click.prevent="editImage = true") Modificar esta imagen
</template>

<script>
import Croppa from 'vue-croppa'

export default {
  name: 'UploadPhoto',
  components: {croppa: Croppa.component},
  data () {
    return {
      image: null,
      editImage: false,
      timeoutId: null
    }
  },
  props: ['initialImage', 'errorLog', 'width', 'height', 'square'],
  computed: {
    showCroppa () {
      return !this.initialImage || this.editImage
    },
    calculatedWidth () {
      return this.width ? this.width : 300
    },
    calculatedHeight () {
      if (this.height) {
        return this.height
      }
      if (this.square) {
        return this.calculatedWidth
      }
      return 450
    }
  },
  methods: {
    zoom (direction) {
      let image = this.image
      direction === 'in' ? image.zoomIn() : image.zoomOut()
    },
    updateImage (event) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.image.promisedBlob().then(blob => {
          this.$emit('input', blob)
        })
      }, 500)
    },
    removeImage () {
      clearTimeout(this.timeoutId)
      this.image.remove()
      this.$emit('input', '')
    },
    resetOriginal () {
      clearTimeout(this.timeoutId)
      this.editImage = false
      this.$emit('input', this.initialImage)
    }
  }
}
</script>
