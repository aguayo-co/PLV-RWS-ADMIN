<template lang="pug">
div.page
  //- main content
  main.content-main
    .layout
      //- Datos personales
      .layout-inner
        .content-grid
          AdminMenu
          //- Router Page
          router-view

</template>

<script>

import AdminMenu from '@/components/AdminMenu'

export default {
  name: 'app',
  components: {
    AdminMenu
  }
}
</script>
