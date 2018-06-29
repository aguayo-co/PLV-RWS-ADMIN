<template lang="pug">
.page(:class='{ "is-modal": modal, "page-user" : id }')
  //- main content
  main.content-main
    .layout
      .layout-inner
        .content(:class="{'content-grid' : id}")
          AdminMenu(
            v-if="id")
          //- Router Page
          router-view
  ModalMessage(
    v-if='modalWindow.enabled && modalWindow.name == "ModalMessage"',
    :attributes='modalWindow.parameters')

</template>

<script>
import { mapState } from 'vuex'
import AdminMenu from '@/components/AdminMenu'
import ModalMessage from '@/components/ModalMessage'

export default {
  name: 'app',
  components: {
    AdminMenu,
    ModalMessage
  },
  computed: {
    ...mapState('user', ['id', 'roles']),
    modal () {
      return this.$store.getters['ui/modal']
    },
    modalWindow () {
      return this.$store.getters['ui/modalWindow']
    }
  },
  created () {
    this.$store.dispatch('user/loadUser')
  },
  watch: {
    id (id) {
      if (id) {
        this.$store.dispatch('ui/loadProperties')
      }
    }
  }
}
</script>
