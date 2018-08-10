<template lang="pug">
  ListLayout
    template(slot="title") Banners

    template(slot="columns")
      th.crud__th.crud__title Imagen
      th.crud__th.crud__title Nombre
      th.crud__th.crud__title Título
      th.crud__th.crud__title Subtítulo
      th.crud__th.crud__title Botón

    template(
      v-for="banner in banners"
      :slot="'row-' + banner.id")
      td.crud__cell
        img.crud__cell-img(
          v-if="banner.image",
          :src="banner.image")
        span(v-else) -
      td.crud__cell {{ banner.name }}
      td.crud__cell {{ banner.title }}
      td.crud__cell {{ banner.subtitle }}
      td.crud__cell {{ banner.button_text }}
</template>

<script>

import bannerAPI from '@/api/banner'
import EditBanner from '@/components/EditBanner'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Banners',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditBanner,

      objectsKey: 'banners',
      loaderMethod: bannerAPI.get,
      deleterMethod: bannerAPI.delete,

      banners: [],

      canCreate: true
    }
  }
}
</script>
