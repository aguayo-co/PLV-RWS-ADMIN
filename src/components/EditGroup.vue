<template lang="pug">
.admin__edit(
  v-if="selectedGroup",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") {{ selectedGroup.id ? 'Editar grupo' : 'Crear grupo' }}
      form.slide__form
        .form__row(v-if="selectedGroup.id")
          label.form__label(
            for="id-group") Id
          p(v-model="selectedGroup.name") {{ selectedGroup.id }}
        .form__row
          label.form__label(
            for="group-name") Nombre
          input.form__control(
            id="group-name",
            v-model="selectedGroup.name",
            type="text")
        .form__row(v-if="!selectedGroup.id")
          label.form__label(
            for="group-name") Ruta
          input.form__control(
            id="group-name",
            v-model="selectedGroup.slug",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import groupsAPI from '@/api/group'
Vue.component('croppa', Croppa.component)

export default {
  props: ['group', 'active'],
  name: 'EditGroup',
  methods: {
    save: function () {
      // If banner has id we are updating else creating
      this.selectedGroup.id ? this.update() : this.create()
    },
    create: function () {
      let newGroup = this.selectedGroup
      groupsAPI.create(newGroup)
        .then(response => {
          console.log('Grupo creado')
          this.$emit('closeEdit')
          this.$emit('updateItems')
          console.log('Tabla actualizada')
        })
    },
    update: function () {
      groupsAPI.update(this.selectedGroup)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  },
  computed: {
    selectedGroup: function () {
      return this.group
    },
    editActive: function () {
      return this.active
    }
  }

}
</script>
