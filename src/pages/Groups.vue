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
      deleterMethod: groupAPI.delete,

      groups: [],

      canCreate: true
    }
  },
  methods: {
    isDeletable (group) {
      // First 3 groups are not deletable. They are used hardcoded in different places
      // in the front end.
      return group.id && group.id > 3
    },
    objectsChanged () {
      this.$store.dispatch('ui/loadGroups')
    }
  }
}
</script>
