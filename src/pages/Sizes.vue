<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Tallas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    EditSize(
      :size="selectedSize",
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
          @change='updateSizeList')
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
          th.crud__title.crud__cell_10
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__title.crud__cell_30 Categoria
          th.crud__title.crud__cell_30 Id
          th.crud__title.crud__cell_30 Nombre
      tbody.crud__tbody
        tr.crud__row(v-for="(size, index) in sizes")
          td(colspan="4")
            table.crud__subtable(width="100%")
              tr.crud__row(v-for="(children, childIndex) in size.children")
                td.crud__cell.crud__cell_10
                  input.form__input-check(:id="'item' + childIndex", type="checkbox", name="all", value="selectAll")
                  label.form__label_check.i-ok(:for="'item' + childIndex")
                td.crud__cell.crud__cell_30 {{ size.name }}
                td.crud__cell.crud__cell_30 {{ children.id }}
                td.crud__cell.crud__cell_30
                  a(@click="loadSize(index)") {{ children.name }}
        tr.crud__row
          td(colspan="4")
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
import sizesAPI from '@/api/size'
// import Vue from 'vue'
import EditSize from '@/components/EditSize'

export default {
  props: ['size', 'active'],
  name: 'Sizes',
  components: {
    EditSize
  },
  data () {
    return {
      sizes: [],
      selectedSize: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null
    }
  },
  methods: {
    updateSizeList: function () {
      sizesAPI.getSizes(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.sizes = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateSizeList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateSizeList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadSize: function (index) {
      this.selectedSize = this.sizes[index]
      this.slideEdit()
    }
  },
  created: function () {
    sizesAPI.getSizes(this.page, this.items, this.filter)
      .then(response => {
        this.sizes = response.data.data
      })
  }

}
</script>
