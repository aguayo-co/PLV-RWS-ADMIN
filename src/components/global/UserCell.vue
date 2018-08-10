<template lang="pug">
  .crud__user
    figure.crud__avatar.avatar
      a.crud__user(:href="$store.state.frontUrl + '/closet/' + user.id")
        img.avatar__img(
          v-if="user.picture",
          :src="user.picture",
          :alt="user.first_name")
        span.tool-user__letter.avatar__img(
          v-else) {{ user.first_name.charAt(0) }}
      div
        a.crud__user(:href="$store.state.frontUrl + '/closet/' + user.id")
          figcaption.avatar__txt {{ user.id }}
      div
        a.crud__user(:href="$store.state.frontUrl + '/closet/' + user.id")
          figcaption.avatar__txt {{ user.full_name }}
      div
        a.crud__user(:href="$store.state.frontUrl + '/closet/' + user.id")
          figcaption.avatar__txt {{ user.email }}
</template>

<script>
export default {
  name: 'UserCell',
  props: ['user']
}
</script>
