<template lang="pug">
  figure.avatar(
    v-if='user.id')
    //-vue variable Notificaciones usuario
    img.avatar__img(
      v-if='user.picture'
      :src='user.picture',
      :alt='user.first_name')
    span.avatar__letter(
      v-else) {{ user.first_name.charAt(0) }}
    //-vue variable user name
    figcaption.avatar__txt  {{ user.first_name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserAvatar',
  computed: {
    ...mapState(['user'])
  }
}
</script>
