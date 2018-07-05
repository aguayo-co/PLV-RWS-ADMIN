<template lang="pug">
tbody.crud__tbody
  LoadingRow(v-if="loading")
  tr.crud__row(v-else-if="!content.length")
    td.crud__cell(colspan=100) No hay resultados a mostrar.
  slot(v-else)
</template>

<script>
export default {
  name: 'TBody',
  props: ['loading', 'content']
}
</script>
