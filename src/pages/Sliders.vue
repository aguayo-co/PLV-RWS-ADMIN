<template lang="pug">
  ListLayout
    template(slot="title") Sliders

    template(slot="columns")
      th.crud__th.crud__title Imagen
      th.crud__th.crud__title Nombre
      th.crud__th.crud__title Título
      th.crud__th.crud__title Botón
      th.crud__th.crud__title Orientación
      th.crud__th.crud__title Color de fuente
      th.crud__th.crud__title Prioridad

    template(
      v-for="sliders in sliders"
      :slot="'row-' + sliders.id")
      td.crud__cell
        img.crud__cell-img(
          v-if="sliders.image",
          :src="sliders.image")
        span(v-else) -
      td.crud__cell {{ sliders.name }}
      td.crud__cell {{ sliders.main_text }}
      td.crud__cell {{ sliders.button_text }}
      td.crud__cell {{ sliders.orientation === 'left' ? "Izquierda" : "Derecha"  }}
      td.crud__cell {{ sliders.font_color === 'bg_white' ? "Negro" : "Blanco"  }}
      td.crud__cell {{ sliders.priority }}
</template>

<script>

import sliderAPI from '@/api/slider'
import EditSlider from '@/components/EditSlide'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Sliders',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditSlider,

      objectsKey: 'sliders',
      loaderMethod: sliderAPI.get,
      deleterMethod: sliderAPI.delete,

      sliders: [],

      canCreate: true
    }
  }
}
</script>
