<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar categoría
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="category-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="category-name",
          v-model="field_name",
          type="text")
      .form__row(v-if="!category.children")
        span.help(
          v-if="errorLog.parent_id") {{ errorLog.parent_id }}
        label.form__label(
          for='category-parent_id') Talla padre
        select.form__select(
          id='category-parent_id'
          v-model='field_parent_id')
          option(v-if="!category.id" :value="undefined") Sin padre
          option(v-for="parent in parentCategories" :value='parent.id') {{ parent.name }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import { mapState } from 'vuex'
import EditFormMixin from '@/mixins/EditFormMixin'
import categoryAPI from '@/api/category'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  parent_id: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditCategory',
  data () {
    return {
      idPropertyName: 'slug'
    }
  },
  computed: {
    ...mapState('ui', {
      parentCategories: 'categories'
    }),
    apiMethod () {
      return this.object.slug ? categoryAPI.update : categoryAPI.create
    },
    category () {
      return this.object
    }
  }
}
</script>
