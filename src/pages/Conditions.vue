<template lang="pug">
  ListLayout
    template(slot="title") Condiciones

    template(slot="columns")
      th.crud__title Nombre
    template(
      v-for="condition in conditions"
      :slot="'row-' + condition.id")
      td.crud__cell {{ condition.name }}
</template>

<script>
import conditionAPI from '@/api/condition'
import ListMixin from '@/mixins/ListMixin'
import EditCondition from '@/components/EditCondition'

export default {
  name: 'Sizes',
  mixins: [ListMixin],
  data () {
    return {
      expanded: null,

      query: false,
      slide: EditCondition,

      objectsKey: 'conditions',
      loaderMethod: conditionAPI.get,
      deleterMethod: conditionAPI.delete,

      conditions: [],

      canCreate: true
    }
  }
}
</script>
