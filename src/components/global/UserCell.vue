<template lang="pug">
  a.crud__user(
    :href="$store.state.frontUrl + '/closet/' + user.id")
    figure.crud__avatar.avatar
      img.avatar__img(
        v-if="user.picture",
        :src="user.picture",
        :alt="user.first_name")
      span.tool-user__letter.avatar__img(
        v-else) {{ user.first_name.charAt(0) }}
      figcaption.avatar__txt Id: {{ user.id }} <br> {{ user | full_name }} <br> {{ user.email }}
</template>

<script>
export default {
  name: 'UserCell',
  props: ['user']
}
</script>
