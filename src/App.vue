<template lang="pug">
.page
  //- main content
  main.content-main
    .layout
      .layout-inner
        .content(:class="{'content-grid' : userId}")
          AdminMenu(
            v-if="userId")
          //- Router Page
          router-view

</template>

<script>

import AdminMenu from '@/components/AdminMenu'

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
