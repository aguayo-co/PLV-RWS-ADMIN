<template lang="pug">
  .content-data
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
      .admin__edit(
        :class="{ 'admin__edit_open': editActive == true }")
        transition(name='slide-right')
          .edit__slide(
            v-show="editActive == true")
            //- .btn_close.modal__btn_close.i-x(
            //-   @click.stop="slideEdit")
            //-   span Cerrar
            //- h3.title Editar usuario
            h3.slide__header.i-close(
              @click.stop="slideEdit") Editar banner
            form.slide__form
              .form__row
                .form__label Foto de perfil
                .upfile__small
                  .upfile__item
                    .upfile__label
                      .upfile__text.i-upload Arrastra una foto o
                      .upfile__btn Sube una imagen
                    croppa(
                      v-model="picture",
                      :initial-image="selectedBanner.image"
                      :width="300",
                      :height="300",
                      :quality="2",
                      placeholder="",
                      :prevent-white-space="true")
              .form__row
                label.form__label(
                  for="user-name") Nombre
                input.form__control(
                  v-model="selectedBanner.name",
                  id="user-name",
                  type="text")
              .form__row
                label.form__label(
                  for="user-lastname") Título
                input.form__control(
                  v-model="selectedBanner.title",
                  id="user-lastname",
                  type="text")
              .form__row
                label.form__label(
                  for="user-lastname") Subtítulo
                textarea.form__textarea(
                  v-model="selectedBanner.subtitle",
                  name="text")
              .form__row
                label.form__label(
                  for="user-email") Texto del botón
                input.form__control(
                  id="user-email",
                  v-model="selectedBanner.button_text",
                  type="email")
              .form__row
                label.form__label(
                  for="user-phone") URL
                input.form__control(
                  v-model="selectedBanner.url",
                  id="user-phone",
                  type="text")
              //-select form
              //- .form__row
                label.form__label(
                  for="select") Select
                select.form__select.form__select_big(
                  name="select",
                  id="select")
                  option(value="1") Item
                  option(value="2") Item
                  option(value="3") Item
                  option(value="4") Item
              .form__row.form__row_away
                button.btn.btn_solid.btn_block Guardar
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
          @change='updateBannerList')
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
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th.crud__title Imagen
          th.crud__th.crud__title Nombre
          th.crud__th.crud__title Título
          th.crud__th.crud__title Fecha de<br>creación
      tbody.crud__tbody
        tr.crud__row(v-for="(banner, index) in banners")
          td.crud__cell
            input.form__input-check(:id="'item' + index", type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(:for="'item' + index")
          td.crud__cell
            img.crud__cell-img(
              v-if="banner.image",
              :src="banner.image",
              :alt="banner.image")
            span(v-else) -
          td.crud__cell
            a(@click="loadBanner(index)") {{ banner.name }}
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
      selectedBanner: {},
      page: 1,
      items: 20,
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
    nextPage: function () {
      this.page += 1
      this.updateBannerList()
      console.log(this.users)
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateBannerList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadBanner: function (index) {
      this.selectedBanner = this.banners[index]
      this.picture.refresh()
      this.slideEdit()
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
