<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Colores
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en Tallas')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditColor(
      :color="selectedColor",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(
        href="#",
        title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'color' : 'colores' }}
      // Paginador
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr
          th.crud__title.crud__cell_check
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__title Id
          th.crud__title.crud__cell_30 Nombre
          th.crud__title Codigo Hexadecimal
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadColor(index)",
          v-for="(color, index) in colors")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell {{ color.id }}
          td.crud__cell {{ color.name }}
          td.crud__cell
            span.color-circlespan.color-circle(
              :style='{ backgroundColor: color.hex_code }')
            span {{ color.hex_code }}
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
import { mapState } from 'vuex'
import colorsAPI from '@/api/color'
import Pager from '@/components/Pager'
import EditColor from '@/components/EditColor'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['color', 'active'],
  name: 'Colors',
  components: {
    Pager,
    EditColor,
    UserAvatar
  },
  computed: {
    ...mapState('ui', [
      'colors'
    ])
  },
  data () {
    return {
      selectedColor: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      colorsAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.colors = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next' && this.page < this.totalPages) {
        this.page += 1
      } else if (direction === 'prev' && this.page > 1) {
        this.page -= 1
      }
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadColor: function (index) {
      this.selectedColor = this.colors[index]
      this.slideEdit()
    }
  }

}
</script>
