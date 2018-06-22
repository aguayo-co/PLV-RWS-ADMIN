<template lang="pug">
.admin__edit(
  v-if="selectedCondition",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") {{ selectedCondition.id ? 'Editar condición' : 'Crear condición' }}
      form.slide__form
        .form__row(v-if="selectedCondition.id")
          label.form__label(
            for="id-condition") Id
          p(v-model="selectedCondition.name") {{ selectedCondition.id }}
        .form__row
          label.form__label(
            for="condition-name") Nombre
          input.form__control(
            id="condition-name",
            v-model="selectedCondition.name",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import conditionsAPI from '@/api/condition'
Vue.component('croppa', Croppa.component)

export default {
  props: ['condition', 'active'],
  name: 'EditCondition',
  methods: {
    save: function (event) {
      event.target.disabled = true
      // If condition has id we are updating else creating
      this.selectedCondition.id ? this.update(event) : this.create(event)
    },
    create: function (event) {
      let newCondition = this.selectedCondition
      conditionsAPI.create(newCondition)
        .then(response => {
          this.$emit('closeEdit')
          this.$emit('updateItems')
          event.target.disabled = false
        })
    },
    update: function (event) {
      conditionsAPI.update(this.selectedCondition)
        .then(response => {
          this.$emit('closeEdit')
          event.target.disabled = false
        })
    }
  },
  computed: {
    selectedCondition: function () {
      return this.condition
    },
    editActive: function () {
      return this.active
    }
  }

}
</script>
