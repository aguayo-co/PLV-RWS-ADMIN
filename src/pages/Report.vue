<template lang="pug">

  div

    .content-data.content-data_wide
      //- Header de la página.
      header.data-header
        h2.data-header__title.title Reporte
        .data-header__item
          UserAvatar

      nav.nav
        label(for="report-groupBy") Agrupar por
          select.form__select(form="filter-form" v-model="groupBy" id="report-groupBy")
            option(value="day") Día
            option(value="week") Semana
            option(value="month") Mes
            option(value="year") Año
        label(for="report-from") Desde
          span.help(
            v-if="errorLog.from") {{ errorLog.from }}
          input.form__control(
            @input="clearError('from')"
            required
            id="report-from"
            form="filter-form"
            v-model="from"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            :placeholder="$moment().format('YYYY-MM-DD')"
            type="text")
        label(for="report-from") Hasta
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
                v-for="header in tableHeaders") {{ header }}

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
      groupBy: 'month',
      from: this.$moment().subtract(1, 'year').utc().format('YYYY-MM-DD'),
      until: this.$moment().utc().format('YYYY-MM-DD')
    }
  },
  computed: {
    ranges () {
      const ranges = this.$getNestedObject(this.reports, ['ranges'])
      return ranges ? Object.keys(ranges) : null
    },
    tableHeaders () {
      if (!this.ranges) {
        return null
      }
      let format = 'LL'
      switch (this.reports.groupBy) {
        case 'month':
          format = 'MMMM YYYY'
          break

        case 'year':
          format = 'YYYY'
      }
      return this.ranges.map(range => {
        return this.$moment(this.reports.ranges[range][0]).format(format)
      })
    }
  },
  methods: {
    clearError (field) {
      this.$delete(this.errorLog, field)
    },
    validateRanges () {
      this.$delete(this.errorLog, 'from')
      this.$delete(this.errorLog, 'until')

      const from = this.$moment(this.from).utc()
      const until = this.$moment(this.until).utc()

      if (!from.isValid()) {
        this.$set(this.errorLog, 'from', 'Ingresa una fecha válida.')
        return false
      }

      if (!until.isValid()) {
        this.$set(this.errorLog, 'until', 'Ingresa una fecha válida.')
        return false
      }

      if (until < from) {
        this.$set(this.errorLog, 'until', 'Esta fecha debe ser posterior a "Desde"')
        return false
      }

      const diff = until.diff(from, 'month')

      if (this.groupBy === 'day' && diff > 0) {
        this.$set(this.errorLog, 'from', 'Agrupar por días permite ver máximo 1 mes de registros.')
        return false
      }

      if (this.groupBy === 'week' && diff > 12) {
        this.$set(this.errorLog, 'from', 'Agrupar por semanas permite ver máximo 1 año de registros.')
        return false
      }

      if (this.groupBy === 'month' && diff > 36) {
        this.$set(this.errorLog, 'from', 'Agrupar por semanas permite ver máximo 3 años de registros.')
        return false
      }

      return true
    },
    updateList () {
      if (!this.validateRanges()) {
        return
      }

      const from = this.$moment(this.from).utc().format('YYYY-MM-DD HH:mm:ss')
      const until = this.$moment(this.until).add(1, 'day').utc().format('YYYY-MM-DD HH:mm:ss')
      const tz = this.$moment().format('Z')

      const localLoading = this.loading = reportAPI.get(this.groupBy, from, until, tz)
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
