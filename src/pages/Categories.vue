<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Categorias
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        UserAvatar
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
      // Pager
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Crear item de categoria
    ul.content-actions
      li
        button.btn.btn_solid.btn_auto.i-plus(@click="create") Crear item de categoria
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_check
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__title.crud__cell_30 Categoria
          th.crud__title.crud__cell_22 Url
          th.crud__title.crud__cell_22 Creación
          th.crud__title.crud__cell_22 Modificación
      tbody.crud__tbody
        tr.crud__row
          td(colspan="5")
            table.crud(
              v-for="(parent, index) in categories")
              tr.crud__row
                th.crud__cell.crud__cell_check
                  input.form__input-check(
                    type="checkbox",
                    id="all"
                    name="all",
                    value="selectAll")
                  label.form__label_check.i-ok(
                    for="all")
                th.crud__cell.crud__cell_30 {{ parent.name }}
                th.crud__cell.crud__cell_22 {{ '/' + parent.slug }}
                th.crud__cell.crud__cell_22 {{ parent.created_at | date }}
                th.crud__cell.crud__cell_22 {{ parent.updated_at | date }}
              tbody.crud__tbody
                tr.crud__row.crud__row_open(
                  v-for="(children, subIndex) in parent.children",
                  @click="loadCategory(subIndex, index)")
                  td.crud__cell
                    input.form__input-check(
                      type="checkbox",
                      name="all",
                      value="selectAll")
                    label.form__label_check.i-ok
                  td.crud__cell {{ ' &#8735; ' + children.name }}
                  td.crud__cell {{ '/' + children.slug }}
                  td.crud__cell {{ children.created_at | date }}
                  td.crud__cell {{ children.updated_at | date }}
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
// import categoriesAPI from '@/api/category'
import { mapState } from 'vuex'
import Pager from '@/components/Pager'
import EditCategory from '@/components/EditCategory'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['category', 'active'],
  name: 'Categories',
  components: {
    Pager,
    UserAvatar,
    EditCategory
  },
  computed: {
    ...mapState('ui', [
      'categories',
      'colors'
    ])
  },
  data () {
    return {
      selectedCategory: {},
      totalPages: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    create: function () {
      this.selectedCategory = {}
      this.slideEdit()
    },
    onPageChanged: function (page) {
      this.page = page
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadCategory: function (subIndex, index) {
      this.selectedCategory = this.categories[index].children[subIndex]
      this.slideEdit()
    }
  }
}

</script>
