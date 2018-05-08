<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Banners
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditBanner(
      :banner="selectedBanner",
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
    ul.content-actions
      li
        button.btn.btn_solid.btn_auto.i-plus(@click="create") Crear banner
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
              label.form__label_check.i-ok(
                for="all")
          th.crud__th.crud__title Imagen
          th.crud__th.crud__title Nombre
          th.crud__th.crud__title Título
          th.crud__th.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadBanner(index)",
          v-for="(banner, index) in banners")
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
          td.crud__cell {{ banner.title }}
          td.crud__cell {{ banner.created_at }}
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

</template>

<script>

import bannersAPI from '@/api/banner'
import EditBanner from '@/components/EditBanner'
import Pager from '@/components/Pager'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'Banners',
  components: {
    EditBanner,
    Pager,
    UserAvatar
  },
  data () {
    return {
      banners: [],
      selectedBanner: {},
      totalPages: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      picture: null
    }
  },
  methods: {
    updateBannerList: function () {
      bannersAPI.getBanners(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.banners = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next') {
        this.page += 1
      } else {
        if (this.page > 1) this.page -= 1
      }
      this.updateBannerList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateBannerList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBanner: function (index) {
      this.selectedBanner = this.banners[index]
      this.slideEdit()
    },
    create: function () {
      this.selectedBanner = {}
      this.slideEdit()
    }
  },
  created: function () {
    bannersAPI.getBanners(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.banners = response.data.data
        this.totalPages = response.data.last_page
      })
  }
}
</script>
