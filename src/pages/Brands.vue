<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Marcas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditBrand(
      :brand="selectedBrand",
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
          @change='updateBrandList')
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
        tr
          th.crud__title.crud__cell_10
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__title.crud__cell_30 Id
          th.crud__title.crud__cell_30 Nombre
          th.crud__title.crud__cell_30 Codigo Hexadecimal
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadBrand(index)",
          v-for="(brand, index) in brands")
          td.crud__cell.crud__cell_10
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          td.crud__cell.crud__cell_30 {{ brand.id }}
          td.crud__cell.crud__cell_30 {{ brand.name }}
          td.crud__cell.crud__cell_30 {{ brand.url }}
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
import brandsAPI from '@/api/brand'
// import Vue from 'vue'
import EditBrand from '@/components/EditBrand'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['brand', 'active'],
  name: 'Brands',
  components: {
    EditBrand,
    UserAvatar
  },
  data () {
    return {
      brands: [],
      selectedBrand: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null
    }
  },
  methods: {
    updateBrandList: function () {
      brandsAPI.getBrand(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.brands = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateBrandList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateBrandList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBrand: function (index) {
      this.selectedBrand = this.brands[index]
      this.slideEdit()
    }
  },
  created: function () {
    brandsAPI.getBrands(this.page, this.items, this.filter)
      .then(response => {
        this.brands = response.data.data
      })
  }

}
</script>
