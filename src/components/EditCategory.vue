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
          p(v-model="selectedCategory.name") {{ selectedCategory.id }}
        .form__row()
          label.form__label(
            for="categoria") Categoria principal
          select.form__select(
            v-model="selectedCategory.parent_id",
            ref='categoria',
            id='categoria')
            optgroup(label='Categoria principal')
              option(
                v-for='type in theCategories',
                :value='type.id') {{ type.name }}
        .form__row
          label.form__label(
            for="color-name") Nombre
          input.form__control(
            id="color-name",
            v-model="selectedCategory.name",
            type="text")
        .form__row
          label.form__label(
            for="color-id") Url
          input.form__control(
            id="color-id",
            v-model="selectedCategory.slug",
            type="text")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(@click.prevent="save") Guardar
</template>

<script>

// import Vue from 'vue'
import categoriesAPI from '@/api/category'

export default {
  props: ['category', 'active'],
  name: 'EditCategory',
  data () {
    return {
      type: 0,
      theCategories: []
    }
  },
  computed: {
    selectedCategory: function () {
      return this.category
    }
  },
  methods: {
    save: function () {
      // If banner has id we are updating else creating
      this.selectedCategory.id ? this.update() : this.create()
    },
    update: function () {
      categoriesAPI.update(this.selectedCategory)
        .then(response => {
          console.log('Ok')
          this.$emit('closeEdit')
        })
    },
    create: function () {
      const newCategory = this.selectedCategory
      categoriesAPI.create(newCategory)
        .then(response => {
          console.log('Categoria creada')
          this.$emit('closeEdit')
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
