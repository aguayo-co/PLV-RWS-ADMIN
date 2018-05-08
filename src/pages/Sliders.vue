<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Slides de Carousel Principal
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditSlide(
      :slide="selectedSlider",
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
          @change='updateSliderList')
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
          th.crud__th.crud__title
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th.crud__title Imagen
          th.crud__th.crud__title Nombre
          th.crud__th.crud__title Título
          th.crud__th.crud__title Botón
          th.crud__th.crud__title Orientación
          th.crud__th.crud__title Color de fuente
          th.crud__th.crud__title Prioridad
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadSlide(index)",
          v-for="(banner, index) in slides")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'item' + index")
          td.crud__cell
            img.crud__cell-img(
              v-if="banner.image",
              :src="banner.image",
              :alt="banner.image")
            span(v-else) -
          td.crud__cell {{ banner.name }}
          td.crud__cell {{ banner.main_text }}
          td.crud__cell {{ banner.button_text }}
          td.crud__cell {{ banner.orientation === 'left' ? "Izquierda" : "Derecha"  }}
          td.crud__cell {{ banner.font_color === 'bg_white' ? "Negro" : "Blanco"  }}
          td.crud__cell {{ banner.priority }}
        tr
          td(colspan="12")
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

import slidersAPI from '@/api/slider'
import EditSlide from '@/components/EditSlide'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'Sliders',
  components: {
    EditSlide,
    UserAvatar
  },
  data () {
    return {
      slides: [],
      selectedSlider: {},
      page: 1,
      items: 20,
      filter: {},
      order: 'priority',
      editActive: false
    }
  },
  methods: {
    updateSliderList: function () {
      slidersAPI.getBanners(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.slides = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateSliderList()
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateSliderList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadSlide: function (index) {
      this.selectedSlider = this.slides[index]
      this.slideEdit()
    }
  },
  created: function () {
    slidersAPI.get(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.slides = response.data.data
      })
  }

}
</script>
