<template lang="pug">
  figure.crud__avatar(
    v-if='user.id')
    //-vue variable Notificaciones usuario
    img.avatar__img(
      v-if='user.picture'
      :src='user.picture',
      :alt='user.full_name')
    span.tool-user__letter.avatar__img(
      v-else) {{ user.first_name.charAt(0) }}
    //-vue variable user name
    figcaption.avatar__txt  {{ user.full_name }}
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
