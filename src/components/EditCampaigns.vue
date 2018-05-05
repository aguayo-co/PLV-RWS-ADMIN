<template lang="pug">
.admin__edit(
  v-if="selectedCampaign",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") Editar campañas
      form.slide__form
        .form__row
          label.form__label(
            for="size-category") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedCampaign.name",
            type="text")
        .form__row
          label.form__label(
            for="color-name") Fecha de creación
          p(v-model="selectedCampaign.created_at") {{ selectedCampaign.created_at }}
        .form__row
          label.form__label(
            for="color-id") Fecha de actualización
          p(v-model="selectedCampaign.updated_at") {{ selectedCampaign.updated_at }}
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

import Vue from 'vue'
import Croppa from 'vue-croppa'
import campaignAPI from '@/api/campaign'
Vue.component('croppa', Croppa.component)

export default {
  props: ['campaign', 'active'],
  name: 'EditCampaigns',
  computed: {
    selectedCampaign: function () {
      return this.campaign
    }
  },
  methods: {
    save: function () {
      campaignAPI.update(this.selectedCampaign)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    }
  }

}
</script>
