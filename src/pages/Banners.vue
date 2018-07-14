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
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems | unempty }}</strong>  {{ (totalItems === 1) ? 'banner' : 'banners' }}
      // Pager
      Pager(
        :currentItems="items",
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
          th.crud__th.crud__title Fecha de creación
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
          td.crud__cell {{ banner.created_at | date }}
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
import PagerMixin from '@/mixins/PagerMixin'
import UserAvatar from '@/components/shared/UserAvatar'

export default {
  name: 'Banners',
  mixins: [PagerMixin],
  components: {
    EditBanner,
    UserAvatar
  },
  data () {
    return {
      banners: [],
      selectedBanner: {},
      filter: {},
      order: '-id',
      editActive: false,
      picture: null
    }
  },
  methods: {
    updateList: function () {
      bannersAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.totalItems = response.data.total
          this.totalPages = response.data.last_page
          this.banners = response.data.data
        })
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
  }
}
</script>
