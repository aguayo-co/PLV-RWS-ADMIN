<template lang="pug">
.admin__edit(
  v-if="selectedMenu",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar item de menú
      form.slide__form
        .form__row
          label.form__label(
            for="menu-id") Id
          p {{ selectedMenu.id }}
        .form__row
          label.form__label(
            for="menu-name") Nombre
          input.form__control(
            id="menu-name",
            v-model="selectedMenu.name",
            type="text")
        .form__row(v-if="selectedMenu.url || selectedMenu.slug")
          label.form__label(
            for="menu-name") Url
          input.form__control(
            id="menu-name",
            v-model="selectedMenu.url",
            type="text")
        //- .form__row
        //-   label.form__label(
        //-     for="sale-name") Nombre
        //-   input.form__control(
        //-     id="sale-name",
        //-     v-model="selectedMenu.name",
        //-     type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
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
  methods: {
    save: function () {
      menuItemsAPI.update(this.selectedMenu)
        .then(response => {
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
