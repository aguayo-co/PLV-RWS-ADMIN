<template lang="pug">
  ListLayout
    template(slot="title") Grupos

    template(slot="columns")
      th.crud__title Nombre
      th.crud__title Descuento

    template(
      v-for="group in groups"
      :slot="'row-' + group.id")
      td.crud__cell {{ group.name }}
      td.crud__cell {{ group.discount_value }}
</template>

<script>
import groupAPI from '@/api/group'
import ListMixin from '@/mixins/ListMixin'
import EditGroup from '@/components/EditGroup'

export default {
  name: 'Groups',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditGroup,

      objectsKey: 'groups',
      loaderMethod: groupAPI.get,

      groups: [],

      canCreate: true
    }
  },
  methods: {
    objectsChanged () {
      this.$store.dispatch('ui/loadGroups')
    }
  }
}
</script>
