<template lang="pug">

  div

    .content-data.content-data_wide
      //- Header de la página.
      header.data-header
        h2.data-header__title.title Reporte
        .data-header__item
          UserAvatar

      nav.nav
        label(for="report-groupby") Agrupar por
          select.form__select(form="filter-form" v-model="groupby" id="report-groupby")
            option(value="day") Día
            option(value="week") Semana
            option(value="month") Mes
            option(value="year") Año
        label(for="report-since") Desde
          span.help(
            v-if="errorLog.since") {{ errorLog.since }}
          input.form__control(
            @input="clearError('since')"
            required
            id="report-since"
            form="filter-form"
            v-model="since"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            :placeholder="$moment().format('YYYY-MM-DD')"
            type="text")
        label(for="report-since") Hasta
          span.help(
            v-if="errorLog.until") {{ errorLog.until }}
          input.form__control(
            @input="clearError('until')"
            required
            id="report-until"
            form="filter-form"
            v-model="until"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            :placeholder="$moment().format('YYYY-MM-DD')"
            type="text")
        form(id="filter-form" @submit.prevent="updateList()")
          button.nav__btn.i-filter_after(title="Filtrar") Filtrar

      //- Contenido.
      table.crud.crud_wide

        thead.crud__head
          tr
            //- Columnas
            th.crud__title Item
            template(v-if="!loading && ranges")
              th.crud__title(
                v-for="date in reports.ranges") {{ date }}

        tbody.crud__tbody
          LoadingRow(v-if="loading")
          tr.crud__row(v-else-if="!ranges")
            td.crud__cell(colspan=100) No hay resultados a mostrar.
          //- Filas
          template(v-else)
            tr.crud__row
              td.crud__cell Cash In
              td.crud__cell(v-for="range in ranges") {{ reports.cashIn[range] | currency }}

            tr.crud__row
              td.crud__cell Gross Revenew
              td.crud__cell(v-for="range in ranges") {{ reports.grossRevenue[range] | currency }}
</template>

<script>
import reportAPI from '@/api/report'
import LoadingRow from '@/components/shared/LoadingRow'
import UserAvatar from '@/components/shared/UserAvatar'

export default {
  name: 'Report',
  components: {LoadingRow, UserAvatar},
  data () {
    return {
      errorLog: [],
      reports: null,
      loading: true,
      groupby: 'month',
      since: this.$moment().subtract(1, 'year').utc().format('YYYY-MM-DD'),
      until: this.$moment().utc().format('YYYY-MM-DD')
    }
  },
  computed: {
    ranges () {
      return this.$getNestedObject(this.reports, ['ranges'])
    }
  },
  methods: {
    clearError (field) {
      this.$delete(this.errorLog, field)
    },
    validateRanges () {
      this.$delete(this.errorLog, 'since')
      this.$delete(this.errorLog, 'until')

      const since = this.$moment(this.since).utc()
      const until = this.$moment(this.until).utc()

      if (!since.isValid()) {
        this.$set(this.errorLog, 'since', 'Ingresa una fecha válida.')
        return false
      }

      if (!until.isValid()) {
        this.$set(this.errorLog, 'until', 'Ingresa una fecha válida.')
        return false
      }

      if (until < since) {
        this.$set(this.errorLog, 'until', 'Esta fecha debe ser posterior a "Desde"')
        return false
      }

      const diff = until.diff(since, 'month')

      if (this.groupby === 'day' && diff > 0) {
        this.$set(this.errorLog, 'since', 'Agrupar por días permite ver máximo 1 mes de registros.')
        return false
      }

      if (this.groupby === 'week' && diff > 12) {
        this.$set(this.errorLog, 'since', 'Agrupar por semanas permite ver máximo 1 año de registros.')
        return false
      }

      if (this.groupby === 'month' && diff > 36) {
        this.$set(this.errorLog, 'since', 'Agrupar por semanas permite ver máximo 3 años de registros.')
        return false
      }

      return true
    },
    updateList () {
      if (!this.validateRanges()) {
        return
      }
      let since = null
      let until = null

      if (this.since) {
        since = this.$moment(this.since).utc().format('YYYY-MM-DD 00:00:00')
      }
      if (this.until) {
        until = this.$moment(this.until).utc().format('YYYY-MM-DD 59:59:00')
      }

      const localLoading = this.loading = reportAPI.get(this.groupby, since, until)
        .then(response => {
          // Keep track of last request.
          if (localLoading !== this.loading) {
            return
          }
          this.reports = response.data
        })
        .finally(() => {
          // Keep track of last request.
          if (localLoading !== this.loading) {
            return
          }
          this.loading = false
        })
    }
  },
  created () {
    this.updateList()
  }
}
</script>
