<template lang="pug">
  EditLayout

    template(slot="title") Editar campaña

    .form__row
      label.form__label(
        for="campaign-name") Nombre
      span.help(
        v-if="errorLog.name") {{ errorLog.name }}
      input.form__control(
        id="campaign-name",
        v-model="field_name",
        type="text")
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
