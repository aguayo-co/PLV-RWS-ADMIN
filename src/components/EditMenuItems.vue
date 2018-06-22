<template lang="pug">
.admin__edit(
  v-if="selectedMenu",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") {{ selectedMenu.id ? 'Editar item de menú' : 'Crear item de menú' }}
      form.slide__form
        .form__row(v-if="selectedMenu.id")
          label.form__label(
            for="menu-id") Id: {{ selectedMenu.id }}
        .form__select-group(v-if="!selectedMenu.id")
          .form__row
            label.form__label(
              for="menu-id") Menú al que pertenece
            select.form__select(
              v-model="selectedMenu.menu_id",
              ref='menu',
              id='menu-id',
              @change="getMenuId(selectedMenu.menu_id)")
              optgroup(label='Menú perteneciente')
                option(
                  v-for='option in parents',
                  :value='option.id') {{ option.name }}
          .form__row(v-if="selectedMenu.menu_id && result[0].items.length > 0")
            label.form__label(
              for="menu-level2") Padre
            select.form__select(
              v-model="selectedMenu.parent_id",
              ref='menu-level2',
              id='menu-level2',
              @change="getParentId(selectedMenu.parent_id)")
              optgroup(label='Menú perteneciente')
                option(
                  v-for='optionChildren in result[0].items',
                  :value='optionChildren.id') {{ optionChildren.name }}
          .form__row(v-if="selectedMenu.parent_id && resultChildren[0].children.length > 0")
            label.form__label(
              for="menu-level2") Hijo
            select.form__select(
              v-model="selectedMenu.parent_id",
              ref='menu-level2',
              id='menu-level2',
              @change="getMenuItem")
              optgroup(label='Menú perteneciente')
                option(
                  v-for='optionChildren in resultChildren[0].children',
                  :value='optionChildren.id') {{ optionChildren.name }}
        .form__row
          label.form__label(
            for="menu-name") Nombre
          input.form__control(
            id="menu-name",
            v-model="selectedMenu.name",
            type="text")
        .form__row(v-if="selectedMenu.url || selectedMenu.slug || !selectedMenu.id")
          label.form__label(
            for="menu-name") Url
          input.form__control(
            v-if="selectedMenu.url",
            id="menu-name",
            v-model="selectedMenu.url",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

import menuItemsAPI from '@/api/menuItem'

export default {
  props: ['menu', 'active'],
  name: 'EditMenuItems',
  computed: {
    selectedMenu: function () {
      return this.menu
    }
  },
  data () {
    return {
      parents: [],
      result: [],
      resultChildren: [],
      menuChildren: false
    }
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      // If menuItem has id we are updating else creating
      this.selectedMenu.id ? this.update(event) : this.create(event)
    },
    update: function (event) {
      menuItemsAPI.update(this.selectedMenu)
        .then(response => {
          this.$emit('updateItems')
          this.$emit('closeEdit')
          event.target.disabled = true
        })
    },
    create: function (event) {
      const newItem = this.selectedMenu
      menuItemsAPI.create(newItem)
        .then(response => {
          console.log('Item de menú creado')
          this.$emit('updateItems')
          this.$emit('closeEdit')
          event.target.disabled = false
        })
    },
    getMenuId: function (item) {
      this.result = this.parents.filter(x => x.id === item)
      console.log('menu 1')
      console.log(this.result)
    },
    getParentId: function (itemChildren) {
      this.resultChildren = this.result[0].items.filter(i => i.id === itemChildren)
      console.log(this.resultChildren)
    },
    getMenuItem: function (itemChildren) {
      this.menuChildren = true
      console.log(this.resultChildren)
    }
  },
  created: function () {
    menuItemsAPI.getAll()
      .then(response => {
        this.parents = response.data.data
      })
  }
}
</script>
