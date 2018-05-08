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
      p.nav__text Se han encontrado {{ campaigns.length }} productos
      ul.pagination
        li.pagination__select
          select.form__select.form__select_small(
          name="numeroItems",
          v-model='items',
          @change='updateCampaignList')
            option(value="10") 10
            option(value="20") 20
            option(value="30") 30
            option(value="50") 50
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(@click.prevent='prevPage', href="#")
        li.pagination__item {{ page }}
        li.pagination__item.pagination__item_txt  de {{ totalPages }}
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(@click.prevent='nextPage', href="#")
    //Tabla de contenido
    table.crud.crud_wide
      thead.crud__head
        tr.crud__row
          th.crud__title.crud__cell_10
              input.form__input-check(
                type="checkbox",
                id="all"
                name="all",
                value="selectAll")
              label.form__label_check.i-ok(
                for="all")
          th.crud__title.crud__cell_30 Nombre
          th.crud__title.crud__cell_30 Fecha de creación
          th.crud__title.crud__cell_30 Fecha de actualización
      tbody.crud__tbody
        tr.crud__row.crud__row_open(
          @click="loadCampaign(index)",
          v-for="(campaign, index) in campaigns")
          td.crud__cell.crud__cell_10
            input.form__input-check(
              type="checkbox",
              :id="'item' + index",
              :name="'item' + index",
              :value="index")
            label.form__label_check.i-ok(
              :for="'campaign' + index")
          td.crud__cell.crud__cell_30 {{ campaign.name }}
          td.crud__cell.crud__cell_30 {{ campaign.created_at }}
          td.crud__cell.crud__cell_30 {{ campaign.updated_at }}
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
// import Vue from 'vue'
import EditCampaigns from '@/components/EditCampaigns'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['campaign', 'active'],
  name: 'Campaigns',
  components: {
    EditCampaigns,
    UserAvatar
  },
  data () {
    return {
      campaigns: [],
      selectedCampaign: {},
      page: 1,
      items: 10,
      filter: {},
      order: '-id',
      editActive: false,
      totalPages: null,
      totalItems: null
    }
  },
  methods: {
    updateCampaignList: function () {
      campaignAPI.getCampaigns(this.page, this.items, this.filter, this.order)
        .then(response => {
          this.campaigns = response.data.data
        })
    },
    nextPage: function () {
      if (this.page < this.totalPages) {
        this.page += 1
        this.updateUserList()
      }
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateCampaignList()
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
    campaignAPI.getCampaigns(this.page, this.items, this.filter)
      .then(response => {
        this.totalPages = response.data.last_page
        this.totalItems = response.data.total
        this.campaigns = response.data.data
      })
  }

}
</script>
