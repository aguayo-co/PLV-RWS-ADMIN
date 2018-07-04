<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Tallas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditSize(
      :size="selectedSize",
      :sizeParent="selectedSizes",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems | unempty }}</strong>  {{ (totalItems === 1) ? 'talla' : 'tallas' }}
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
                id="all",
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__title.crud__cell_30 Categoria
          th.crud__title.crud__cell_30 Id
          th.crud__title.crud__cell_30 Nombre
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadShipping(index)",
          v-for="(size, index) in sizes")
          td(colspan="4")
            table.crud__subtable(width="100%")
              tr.crud__row.crud__row_open(
                @click="loadSize(index, childIndex)",
                v-for="(children, childIndex) in size.children")
                td.crud__cell.crud__cell_10
                  input.form__input-check(
                    type="checkbox",
                    :id="'item' + index",
                    :name="'item' + index",
                    :value="index")
                  label.form__label_check.i-ok(
                    :for="'item' + childIndex")
                td.crud__cell.crud__cell_30 {{ size.name }}
                td.crud__cell.crud__cell_30 {{ children.id }}
                td.crud__cell.crud__cell_30 {{ children.name }}
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
import PagerMixin from '@/mixins/PagerMixin'
import EditSize from '@/components/EditSize'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['size', 'sizeParent', 'active'],
  name: 'Sizes',
  mixins: [PagerMixin],
  components: {
    EditSize,
    UserAvatar
  },
  data () {
    return {
      sizes: [],
      sizesChildren: [],
      selectedSize: {},
      selectedSizes: {},
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      sizesAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.sizes = response.data.data
        })
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadSize: function (index, indexChildren) {
      this.selectedSizes = this.sizes[index]
      this.selectedSize = this.sizes[index].children[indexChildren]
      this.slideEdit()
    }
  }
}
</script>
