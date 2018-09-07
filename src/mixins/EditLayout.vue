<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$parent.$emit('close')")
        slot(name="title") Editar
    slot(name="form")
      form.slide__form(@submit.prevent="$parent.submit")
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(:disabled="$parent.saving")
            Dots(v-if="$parent.saving")
            template(v-else) Guardar
        slot
        .form__row.form__row_away
          button.btn.btn_solid.btn_block(:disabled="$parent.saving")
            Dots(v-if="$parent.saving")
            template(v-else) Guardar
</template>
