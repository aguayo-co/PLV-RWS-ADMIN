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
import EditColor from '@/components/EditColor'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['color', 'active'],
  name: 'Colors',
  components: {
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
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
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
