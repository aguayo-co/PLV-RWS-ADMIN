<template lang="pug">
  ListLayout
    template(slot="title") Items de menú

    template(slot="columns")
      th.crud__title
      th.crud__title
      th.crud__title Nombre
      th.crud__title Subitems
    template(
      v-for="item in menuItems"
      :slot="'row-' + item.id")
      td.crud__cell
        template(v-if="item.children && item.menu_id")
          button(v-if="expanded === item.id" @click="subExpanded = expanded = false") -
          button(v-else @click="expanded = item.id; subExpanded = false") +
      td.crud__cell
        template(v-if="item.children && !item.menu_id")
          button(v-if="subExpanded === item.id" @click="subExpanded = false") -
          button(v-else @click="subExpanded = item.id") +
      td.crud__cell {{ item.name }}
      td.crud__cell {{ item.children ? item.children.length : '' }}
</template>

<script>
import { mapState } from 'vuex'
import menuItemAPI from '@/api/menuItem'
import ListMixin from '@/mixins/ListMixin'
import EditMenuItem from '@/components/EditMenuItem'

export default {
  name: 'MenuItems',
  props: ['menuId'],
  mixins: [ListMixin],
  data () {
    return {
      expanded: null,
      subExpanded: null,

      query: false,
      items: 10000,
      filter: {
        menu_id: this.menuId
      },
      slide: EditMenuItem,

      objectsKey: 'menuItems',
      loaderMethod: menuItemAPI.get,
      deleterMethod: menuItemAPI.delete,

      rawMenuItems: [],

      canCreate: true
    }
  },
  computed: {
    ...mapState('ui', ['menus']),
    slideData () {
      return {
        currentMenu: this.menuId,
        availableTree: this.rawMenuItems
      }
    },
    menuItems: {
      set (menuItems) {
        this.rawMenuItems = menuItems
      },
      get () {
        const menuItems = []
        this.rawMenuItems.forEach(menuItem => {
          menuItems.push(menuItem)
          // Primer nivel de indentación.
          if (menuItem.id === this.expanded) {
            menuItem.children.forEach(subMenuItem => {
              menuItems.push(subMenuItem)
              // Segundo nivel de indentación.
              if (subMenuItem.id === this.subExpanded) {
                Array.prototype.push.apply(menuItems, subMenuItem.children)
              }
            })
          }
        })
        return menuItems
      }
    }
  },
  methods: {
    updateObject () {
      this.objectsChanged()
    },
    objectsChanged () {
      this.updateList()
    }
  }
}
</script>
