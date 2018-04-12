<template lang="pug">
  .content-data.content-data_wide
    header.data-header
      h2.data-header__title.title Banners
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en banners')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
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
          @change='updateUserList')
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
          th.crud__th
            td.crud__title
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th
            td.crud__title Imagen
          th.crud__th
            td.crud__title Nombre
          th.crud__th
            td.crud__title Título
          th.crud__th
            td.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row(v-for="(banner, index) in banners")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell(v-if="banner.image")
            img.crud__cell-img(:src="banner.image", :alt="banner.image")
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
        //Tercera fila
        //class para row gris en tabla: .crud__toggle-open

</template>

<script>

import bannersAPI from '@/api/banner'

export default {
  name: 'Banners',
  data () {
    return {
      banners: [],
      page: 1,
      items: 20,
      filter: {},
      order: '-id'
    }
  },
  methods: {
    updateBannerList: function () {
      bannersAPI.getBanners(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.banners = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateBannerList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateBannerList()
    }
  },
  created: function () {
    bannersAPI.getBanners(this.page, this.items, this.filter, this.order)
      .then(response => {
        this.banners = response.data.data
      })
  }

}
</script>
