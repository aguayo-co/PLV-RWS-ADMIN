<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Colores
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    EditCategory(
      :category="selectedCategory",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(
          name="numeroItems",
          v-model='items',
          @change='updateCategoryList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(@click.prevent='prevPage', href="#")
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(@click.prevent='nextPage', href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr.crud__row
          th.crud__title.crud__cell_12
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__title.crud__cell_22 Categoria
          th.crud__title.crud__cell_22 Ruta
          th.crud__title.crud__cell_22 Creación
          th.crud__title.crud__cell_22 Modificación
      tbody.crud__tbody
        tr.crud__row
          td(colspan="5")
            table.crud(v-for="(parent, index) in categories.children")
              tr.crud__row
                th.crud__title.crud__cell_12
                  input#all.form__input-check(type="checkbox", name="all", value="selectAll")
                  label.form__label_check.i-ok(for="all")
                th.crud__title.crud__cell_22 {{ parent.name }}
                th.crud__title.crud__cell_22 {{ parent.slug }}
                th.crud__title.crud__cell_22 {{ parent.created_at }}
                th.crud__title.crud__cell_22 {{ parent.updated_at }}
              tbody.crud__tbody
                tr.crud__row(v-for="(children, subIndex) in parent.children")
                  td.crud__cell
                    input.form__input-check( type="checkbox", name="all", value="selectAll")
                    label.form__label_check.i-ok
                  td.crud__cell.crud__cell_22 {{ '—— ' + children.name }}
                  td.crud__cell.crud__cell_22 {{ children.slug }}
                    a(@click="loadCategory(subIndex)")
                  td.crud__cell.crud__cell_22 .
                  td.crud__cell.crud__cell_22 ..
        tr.crud__row
          td(colspan="5")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              select.form__select
                option(value="Pendiente") Pendiente
                option(value="Rechazado") Rechazado
                option(value="Aprobado") Aprobado
                option(value="Disponible") Disponible
                option(value="No disponible") No disponible
                option(value="Vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Tercera fila
        //class para row gris en tabla: .crud__toggle-open

</template>

<script>
import categoriesAPI from '@/api/category'
// import Vue from 'vue'
import EditCategory from '@/components/EditCategory'

export default {
  props: ['category', 'active'],
  name: 'Categories',
  components: {
    EditCategory
  },
  data () {
    return {
      categories: [],
      selectedCategory: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null
    }
  },
  methods: {
    updateCategoryList: function () {
      categoriesAPI.getCategories(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.categories = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateCategoryList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateCategoryList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadCategory: function (index) {
      this.selectedCategory = this.categories[index]
      this.slideEdit()
    }
  },
  created: function () {
    categoriesAPI.getAll()
      .then(response => {
        this.categories = response.data.data[0]
        this.categories.children.forEach((category, index) => {
          categoriesAPI.getBySlug(category.slug)
            .then(response => {
              this.categories.children[index].children = response.data.children
            })
        })
      })
  }
}

</script>
