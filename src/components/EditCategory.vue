<template lang="pug">
.admin__edit(
  v-if="selectedCategory",
  :class="{ 'admin__edit_open': active == true }")
  transition(name='slide-right')
    .edit__slide(
      v-show="active == true")
      h3.slide__header.i-close(
        @click.stop="$emit('closeEdit')") {{ selectedCategory.id ? 'Editar categoría' : 'Crear categoría' }}
      form.slide__form
        //- .form__row(v-if="selectedCategory.id")
        //-   label.form__label(
        //-     for="size-category") Id
        //-   p(v-model="selectedCategory.name") {{ selectedCategory.id }}
        //- .form__row(v-else)
        //-   label.form__label(
        //-     for="categoria") Categoria principal
        //-   select.form__select(
        //-     v-model="type",
        //-     ref='categoria',
        //-     id='categoria')
        //-     optgroup(label='Categoria principal')
        //-       option(
        //-         v-for='type in theCategories',
        //-         :value='type.id') {{ type.name }}

        .form__row()
          label.form__label(
            for="size-category") Id
          p(v-model="selectedCategory.id") {{ selectedCategory.id }}
        .form__row()
          label.form__label(
            for="categoria") Categoria principal
          select.form__select(
            v-model="selectedCategory.parent_id",
            ref='categoria',
            id='categoria')
            optgroup(label='Categoria principal')
              option(
                v-for='type in categories',
                :value='type.id') {{ type.name }}
        .form__row
          label.form__label(
            for="color-name") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedCategory.name",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save($event)") Guardar
</template>

<script>

// import Vue from 'vue'
import categoriesAPI from '@/api/category'
import { mapState } from 'vuex'

export default {
  props: ['category', 'active'],
  name: 'EditCategory',
  data () {
    return {
      type: 0
    }
  },
  computed: {
    selectedCategory: function () {
      return {...this.category}
    },
    ...mapState('ui', [
      'categories'
    ])
  },
  methods: {
    save: function (event) {
      event.target.disabled = true
      // If category has id we are updating else creating
      this.selectedCategory.id ? this.update(event) : this.create(event)
    },
    update: function (event) {
      categoriesAPI.update(this.selectedCategory)
        .then(response => {
          this.$emit('closeEdit')
          this.$store.dispatch('ui/refreshCategories')
          event.target.disabled = false
        })
    },
    create: function (event) {
      const newCategory = this.selectedCategory
      categoriesAPI.create(newCategory)
        .then(response => {
          console.log('Categoria creada')
          this.$emit('closeEdit')
          this.$emit('updateItems')
          event.target.disabled = false
        })
    }
  },
  created: function () {
    categoriesAPI.getAll()
      .then(response => {
        this.theCategories = response.data.data
      })
  }

}
</script>
