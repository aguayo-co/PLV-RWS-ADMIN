<template lang="pug">
  ListLayout
    template(slot="title") Menús

    template(slot="columns")
      th.crud__title Nombre
    template(
      v-for="menu in menus"
      :slot="'row-' + menu.id")
      td.crud__cell {{ menu.name }}

    template(
      v-for="menu in menus"
      :slot="menu.id + '-actions'")
      router-link(
        :to="{name: 'MenuItems', params: {menuId: menu.id}}") Editar items
</template>

<script>
import menuAPI from '@/api/menu'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Menus',
  mixins: [ListMixin],
  data () {
    return {
      query: false,

      objectsKey: 'menus',
      loaderMethod: menuAPI.get,

      menus: [],

      canCreate: true
    }
  }
}
</script>
