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
            input#item6.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item6")
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
            input#item2.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item2")
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
                input#pendiente1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente1") Pendiente
              .crud__form-group
                input#rechazado1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado1") Rechazado
              .crud__form-group
                input#aprobado1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado1") Aprobado
              .crud__form-group
                input#disponible1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible1") Disponible
              .crud__form-group
                input#noDisponible1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible1") No disponible
              .crud__form-group
                input#vendido1.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido1") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Tercera fila
        tr.crud__row.crud__toggle-open
          td.crud__cell
            input#item3.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item3")
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
                input#pendiente2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente2") Pendiente
              .crud__form-group
                input#rechazado2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado2") Rechazado
              .crud__form-group
                input#aprobado2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado2") Aprobado
              .crud__form-group
                input#disponible2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible2") Disponible
              .crud__form-group
                input#noDisponible2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible2") No disponible
              .crud__form-group
                input#vendido2.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido2") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Cuarta fila
        tr.crud__row
          td.crud__cell
            input#item4.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item4")
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
                input#pendiente3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente3") Pendiente
              .crud__form-group
                input#rechazado3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado3") Rechazado
              .crud__form-group
                input#aprobado3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado3") Aprobado
              .crud__form-group
                input#disponible3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible3") Disponible
              .crud__form-group
                input#noDisponible3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible3") No disponible
              .crud__form-group
                input#vendido3.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido3") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Quinta fila
        tr.crud__row
          td.crud__cell
            input#item5.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item5")
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
                input#pendiente4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente4") Pendiente
              .crud__form-group
                input#rechazado4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado4") Rechazado
              .crud__form-group
                input#aprobado4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado4") Aprobado
              .crud__form-group
                input#disponible4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible4") Disponible
              .crud__form-group
                input#noDisponible4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible4") No disponible
              .crud__form-group
                input#vendido4.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido4") Vendido
              input.crud__btn(type="submit", value="Guardar")
        //Sexta fila
        tr.crud__row
          td.crud__cell
            input#item6.form__input-check(type="checkbox", name="all", value="selectAll")
            label.form__label_check.i-ok(for="item6")
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
                input#pendiente5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="pendiente5") Pendiente
              .crud__form-group
                input#rechazado5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="rechazado5") Rechazado
              .crud__form-group
                input#aprobado5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="aprobado5") Aprobado
              .crud__form-group
                input#disponible5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="disponible5") Disponible
              .crud__form-group
                input#noDisponible5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="noDisponible5") No disponible
              .crud__form-group
                input#vendido5.form__input-radio(type="radio", name="state")
                label.crud__form-label.form__label_radio(for="vendido5") Vendido
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
