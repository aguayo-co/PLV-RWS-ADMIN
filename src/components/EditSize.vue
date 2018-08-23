<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar marca
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="size-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="size-name",
          v-model="field_name",
          type="text")
      .form__row(v-if="!size.children")
        span.help(
          v-if="errorLog.parent_id") {{ errorLog.parent_id }}
        label.form__label(
          for='size-parent_id') Talla padre
        select.form__select(
          id='size-parent_id'
          v-model='field_parent_id')
          option(v-if="!size.id" :value="undefined") Sin padre
          option(v-for="parent in parentSizes" :value='parent.id') {{ parent.name }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import { mapState } from 'vuex'
import EditFormMixin from '@/mixins/EditFormMixin'
import sizeAPI from '@/api/size'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  parent_id: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditSize',
  computed: {
    ...mapState('ui', {
      parentSizes: 'sizes'
    }),
    apiMethod () {
      return this.object.id ? sizeAPI.update : sizeAPI.create
    },
    size () {
      return this.object
    }
  }
}
</script>
