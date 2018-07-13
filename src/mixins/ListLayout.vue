<template lang="pug">
  div
    //- Slide de edición.
    .admin__edit(
      v-if="$parent.slide"
      :class="{admin__edit_open: $parent.showSlide}")
      transition(name='slide-right')
        component.edit__slide(
          v-if="$parent.showSlide"
          v-bind:is="$parent.slide"
          :object="$parent.slideObject"
          @updated="$parent.updateObject($event)"
          @close="$parent.closeSlide")

    .content-data.content-data_wide
      //- Header de la página.
      header.data-header
        h2.data-header__title.title
          slot(name="title")
        .data-header__item(v-if="$parent.query !== false")
          form.search(
            @submit.prevent="$parent.updateList")
            .search__row
              input#searchMain.search__input(
                type='text'
                name='search'
                placeholder='Buscar'
                v-model="$parent.query")
              input.search__btn(type='submit', value='')
          UserAvatar

      //- Navegación
      nav.nav
        p.nav__text Se {{ ($parent.totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ $parent.totalItems | unempty }}</strong>  {{ ($parent.totalItems === 1) ? 'resultado' : 'resultados' }}
        // Paginador
        Pager(
          v-if="$parent.totalPages",
          :currentItems="$parent.items",
          :currentPage="$parent.page",
          :totalPages="$parent.totalPages",
          @pageChanged="$parent.pageChanged",
          @itemsChanged="$parent.itemsChanged")

      //- Cualquier otra cosa que nos encontremos.
      slot

      slot(name="selection" v-if="$parent.isCheckable")
        div
          p Has seleccionado {{ $parent.checkedIds.length }} filas.

      //- Contenido.
      table.crud.crud_wide

        thead.crud__head
          tr
            th.crud__th.crud__title(v-if="$parent.isCheckable")
              input.form__input-check(
                type="checkbox"
                id="all"
                name="all"
                v-model="$parent.checkAll")
              label.form__label_check.i-ok(
                for="all")
            //- Columnas
            slot(name="columns")

        tbody.crud__tbody
          LoadingRow(v-if="$parent.loading")
          tr.crud__row(v-else-if="!$parent.objects || !$parent.objects.length")
            td.crud__cell(colspan=100) No hay resultados a mostrar.
          //- Filas
          tr.crud__row(
            v-else
            v-for="object in $parent.objects")
            td.crud__cell(v-if="$parent.isCheckable")
              template(v-if="$parent.checkable(object)")
                input.form__input-check(
                  type="checkbox"
                  :id="'object-' + object.id"
                  :name="'object-' + object.id"
                  :value="object.id"
                  v-model="$parent.checkedIds")
                label.form__label_check.i-ok(:for="'object-' + object.id")
            slot(:name="'row-' + object.id")
            td.crud__cell(
              v-if="$parent.slide && $parent.isEditable(object)")
              button(@click="$parent.openSlide(object)") Editar
        tfoot
          slot(name="tfoot")
</template>

<script>
import Pager from '@/components/shared/Pager'
import LoadingRow from '@/components/shared/LoadingRow'
import UserAvatar from '@/components/shared/UserAvatar'

export default {
  components: {LoadingRow, Pager, UserAvatar}
}
</script>
