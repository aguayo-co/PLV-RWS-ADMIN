<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar campaña
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="campaign-name") Nombre
        input.form__control(
          id="campaign-name",
          v-model="field_name",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import campaignAPI from '@/api/campaign'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditCampaign',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    apiMethod () {
      return this.object.slug ? campaignAPI.update : campaignAPI.create
    },
    campaign () {
      return this.object
    }
  }
}
</script>
