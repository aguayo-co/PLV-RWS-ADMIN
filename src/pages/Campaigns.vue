<template lang="pug">
  .content-data
    header.data-header
      h2.data-header__title.title Campañas
      .data-header__item
        form.search(action='', method='GET')
          .search__row
            input#searchMain.search__input(type='text', name='search', placeholder='Buscar campañas')
            input.search__btn(type='submit', value='')
        UserAvatar
    EditCampaigns(
      :campaign="selectedCampaign",
      :active="editActive",
      @closeEdit="slideEdit")
    nav.nav
      select.form__select(name="acciones en lote")
        option(value="Acciones en lote") Acciones en lote
        option(value="Publicado") Publicado
        option(value="No disponible") No disponible
      a.nav__btn.i-filter_after(href="#", title="Filtrar") Filtrar
      p.nav__text Se {{ (totalItems === 1) ? 'ha' : 'han' }} encontrado <strong>{{ totalItems }}</strong>  {{ (totalItems === 1) ? 'campaña' : 'campañas' }}
      // Paginador
      Pager(
        :currentPage="page",
        :totalPages="totalPages",
        @pageChanged="onPageChanged",
        @itemsChanged="onItemsChanged")
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
          th.crud__title.crud__cell_30 Nombre
          th.crud__title Fecha de creación
          th.crud__title Fecha de actualización
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadCampaign(index)",
          v-for="(campaign, index) in campaigns")
          td.crud__cell
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'campaign' + index")
          td.crud__cell {{ campaign.name }}
          td.crud__cell {{ campaign.created_at | moment("D [de] MMM YY") }}
          td.crud__cell {{ campaign.updated_at | moment("D [de] MMM YY") }}
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
import campaignAPI from '@/api/campaign'
import Pager from '@/components/Pager'
import EditCampaigns from '@/components/EditCampaigns'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['campaign', 'active'],
  name: 'Campaigns',
  components: {
    Pager,
    EditCampaigns,
    UserAvatar
  },
  data () {
    return {
      campaigns: [],
      selectedCampaign: {},
      totalPages: null,
      totalItems: null,
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false
    }
  },
  methods: {
    updateList: function () {
      campaignAPI.get(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.campaigns = response.data.data
        })
    },
    onPageChanged: function (direction) {
      if (direction === 'next') {
        this.page += 1
      } else {
        if (this.page > 1) this.page -= 1
      }
      this.updateList()
    },
    onItemsChanged: function (items) {
      this.items = items
      this.updateList()
    },
    slideEdit: function () {
      this.editActive = !this.editActive
    },
    loadCampaign: function (index) {
      this.selectedCampaign = this.campaigns[index]
      this.slideEdit()
    }
  },
  created: function () {
    campaignAPI.get(this.page, this.items, this.filter)
      .then(response => {
        this.totalPages = response.data.last_page
        this.totalItems = response.data.total
        this.campaigns = response.data.data
      })
  }

}
</script>
