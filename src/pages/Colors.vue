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
      p.nav__text Se han encontrado 56 productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(
          name="numeroItems",
          v-model='items',
          @change='updateColorList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(
            @click.prevent='prevPage',
            href="#")
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(
            @click.prevent='nextPage',
            href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr.crud__row
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
          @click="loadColor(index)",
          v-for="(color, index) in colors")
          td.crud__cell.crud__cell_10
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell.crud__cell_30 {{ color.id }}
          td.crud__cell.crud__cell_30 {{ color.name }}
          td.crud__cell.crud__cell_30
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
import colorsAPI from '@/api/color'
// import Vue from 'vue'
import EditColor from '@/components/EditColor'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['color', 'active'],
  name: 'Colors',
  components: {
    EditColor,
    UserAvatar
  },
  data () {
    return {
      colors: [],
      selectedColor: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null
    }
  },
  methods: {
    updateColorList: function () {
      colorsAPI.getColors(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.colors = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateColorList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateColorList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadColor: function (index) {
      this.selectedColor = this.colors[index]
      this.slideEdit()
    }
  },
  created: function () {
    colorsAPI.getColors(this.page, this.items, this.filter)
      .then(response => {
        this.colors = response.data.data
      })
  }

}
</script>
