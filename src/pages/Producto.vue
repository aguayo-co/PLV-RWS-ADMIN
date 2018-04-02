<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Productos
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar en productos')
            input.search__btn(type='submit', value='')
        figure.avatar
          img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
          figcaption.avatar__txt Damarys
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter(href="#", title="Filtrar") Filtrar
      p.nav__text Se han encontrado 56 productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(name="numeroItems")
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item.arrow-left.i-back
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de 3
        li.pagination__item.arrow-rigth.i-next
    //Tabla de contenido
    table.crud
      thead.crud__head
        tr
          th.crud__th
            td.crud__title 
              input#all.form__input-check(type="checkbox", name="all", value="selectAll")
              label.form__label_check.i-ok(for="all")
          th.crud__th
            td.crud__title Foto
          th.crud__th
            td.crud__title Nombre
          th.crud__th
            td.crud__title Marca
          th.crud__th
            td.crud__title P.&nbsp;Original
          th.crud__th
            td.crud__title P.&nbsp;Venta
          th.crud__th
            td.crud__title Comisión
          th.crud__th
            td.crud__title Usuaria
          th.crud__th
            td.crud__title Estado
      tbody.crud__tbody
        //Primera fila
        tr.crud__row
          td.crud__cell
            input#item1.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item1")
          td.crud__cell
            img.crud__cell-img(src="static/img/product-001.jpg", alt="Producto 1")
          td.crud__cell Blusa negra de seda
          td.crud__cell Zara
          td.crud__cell $&nbsp;25.000
          td.crud__cell $&nbsp;15.000
          td.crud__cell 20% 
            small.crud__cell-small ($ 3.000)
          td.crud__cell 
            figure.crud__avatar.avatar
              img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
              figcaption.avatar__txt Daniela Villanueva
          td.crud__cell
            p.crud__state.crud__state_pending Pendiente
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
        tr
          td(colspan="9")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              .crud__form-group
                input#pendiente.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente") Pendiente
              .crud__form-group
                input#rechazado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado") Rechazado
              .crud__form-group
                input#aprobado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado") Aprobado
              .crud__form-group
                input#disponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible") Disponible
              .crud__form-group
                input#noDisponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible") No disponible
              .crud__form-group
                input#vendido.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Segunda fila
        tr.crud__row
          td.crud__cell
            input#item1.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item1")
          td.crud__cell
            img.crud__cell-img(src="static/img/product-001.jpg", alt="Producto 1")
          td.crud__cell Blusa negra de seda
          td.crud__cell Zara
          td.crud__cell $&nbsp;25.000
          td.crud__cell $&nbsp;15.000
          td.crud__cell 20% 
            small.crud__cell-small ($ 3.000)
          td.crud__cell 
            figure.crud__avatar.avatar
              img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
              figcaption.avatar__txt Daniela Villanueva
          td.crud__cell
            p.crud__state.crud__state_published Publicado
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
        tr
          td(colspan="9")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              .crud__form-group
                input#pendiente.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente") Pendiente
              .crud__form-group
                input#rechazado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado") Rechazado
              .crud__form-group
                input#aprobado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado") Aprobado
              .crud__form-group
                input#disponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible") Disponible
              .crud__form-group
                input#noDisponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible") No disponible
              .crud__form-group
                input#vendido.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Tercera fila
        tr.crud__row.crud__toggle-open
          td.crud__cell
            input#item1.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item1")
          td.crud__cell
            img.crud__cell-img(src="static/img/product-001.jpg", alt="Producto 1")
          td.crud__cell Blusa negra de seda
          td.crud__cell Zara
          td.crud__cell $&nbsp;25.000
          td.crud__cell $&nbsp;15.000
          td.crud__cell 20% 
            small.crud__cell-small ($ 3.000)
          td.crud__cell 
            figure.crud__avatar.avatar
              img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
              figcaption.avatar__txt Daniela Villanueva
          td.crud__cell
            p.crud__state.crud__state_published Publicado
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
        tr.crud__toggle-open
          td(colspan="9")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              .crud__form-group
                input#pendiente.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente") Pendiente
              .crud__form-group
                input#rechazado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado") Rechazado
              .crud__form-group
                input#aprobado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado") Aprobado
              .crud__form-group
                input#disponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible") Disponible
              .crud__form-group
                input#noDisponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible") No disponible
              .crud__form-group
                input#vendido.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Cuarta fila
        tr.crud__row
          td.crud__cell
            input#item1.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item1")
          td.crud__cell
            img.crud__cell-img(src="static/img/product-001.jpg", alt="Producto 1")
          td.crud__cell Blusa negra de seda
          td.crud__cell Zara
          td.crud__cell $&nbsp;25.000
          td.crud__cell $&nbsp;15.000
          td.crud__cell 20% 
            small.crud__cell-small ($ 3.000)
          td.crud__cell 
            figure.crud__avatar.avatar
              img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
              figcaption.avatar__txt Daniela Villanueva
          td.crud__cell
            p.crud__state.crud__state_published Publicado
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
        tr
          td(colspan="9")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              .crud__form-group
                input#pendiente.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente") Pendiente
              .crud__form-group
                input#rechazado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado") Rechazado
              .crud__form-group
                input#aprobado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado") Aprobado
              .crud__form-group
                input#disponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible") Disponible
              .crud__form-group
                input#noDisponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible") No disponible
              .crud__form-group
                input#vendido.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Quinta fila
        tr.crud__row
          td.crud__cell
            input#item1.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item1")
          td.crud__cell
            img.crud__cell-img(src="static/img/product-001.jpg", alt="Producto 1")
          td.crud__cell Blusa negra de seda
          td.crud__cell Zara
          td.crud__cell $&nbsp;25.000
          td.crud__cell $&nbsp;15.000
          td.crud__cell 20% 
            small.crud__cell-small ($ 3.000)
          td.crud__cell 
            figure.crud__avatar.avatar
              img.avatar__img(src="static/img/user-avatar.jpg", alt="Avatar")
              figcaption.avatar__txt Daniela Villanueva
          td.crud__cell
            p.crud__state.crud__state_published Publicado
            a.crud__toggle.i-next
              span.crud__toggle_btn-txt.hidden botón
        tr
          td(colspan="9")
            form.crud__form(action="")
              p.crud__legend Cambiar estado
              .crud__form-group
                input#pendiente.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente") Pendiente
              .crud__form-group
                input#rechazado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado") Rechazado
              .crud__form-group
                input#aprobado.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado") Aprobado
              .crud__form-group
                input#disponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible") Disponible
              .crud__form-group
                input#noDisponible.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible") No disponible
              .crud__form-group
                input#vendido.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido") Vendido
              input.crud__btn(type="submit", value="Guardar")

</template>

<script>
// import UserMenu from '@/components/UserMenu'

export default {
  name: 'Producto'
  // components: {
  //   UserMenu
  // }
}
</script>
