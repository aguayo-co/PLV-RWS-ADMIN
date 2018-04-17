<template lang="pug">
div.page
  //- main content
  main.content-main
    .layout
      //- Datos personales
      .layout-inner
        .content-grid
          AdminMenu(v-if="userId")
          //- Router Page
          router-view

</template>

<script>

import AdminMenu from '@/components/AdminMenu'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    AdminMenu
  },
  computed: {
    userId: function () {
      return this.$store.getters['user/token']
    }
  }
}
</script>
