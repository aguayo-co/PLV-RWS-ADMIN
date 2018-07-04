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
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems | unempty }}</strong>  {{ (totalItems === 1) ? 'marca' : 'marcas' }}
      // Paginador
      Pager(
        :currentItems="items",
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
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
          th.crud__title.crud__cell_30 Url
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
          td.crud__cell.crud__cell_30 /{{ brand.slug }}
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
import PagerMixin from '@/mixins/PagerMixin'
import EditBrand from '@/components/EditBrand'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['brand', 'active'],
  name: 'Brands',
  mixins: [PagerMixin],
  components: {
    EditBrand,
    UserAvatar
  },
  data () {
    return {
      brands: [],
      selectedBrand: {},
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      brandsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalPages = response.data.last_page
          this.totalItems = response.data.total
          this.brands = response.data.data
        })
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBrand: function (index) {
      this.selectedBrand = this.brands[index]
      this.slideEdit()
    }
  }
}
</script>
