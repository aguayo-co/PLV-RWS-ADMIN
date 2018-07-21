<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar producto
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label Foto
        span.help(
          v-if="errorLog.image_picture") {{ errorLog.image_picture }}
        .upfile__small
          uploadPhoto(
            v-model="field_picture"
            :initialImage='field_picture'
            :width="200"
            :square="true")
      .form__row
        label.form__label(
          for="user-first_name") Nombre
        span.help(
          v-if="errorLog.first_name") {{ errorLog.first_name }}
        input.form__control(
          v-model="field_first_name",
          id="user-first_name",
          type="text")
      .form__row
        label.form__label(
          for="user-last_name") Apellido
        span.help(
          v-if="errorLog.last_name") {{ errorLog.last_name }}
        input.form__control(
          v-model="field_last_name",
          id="user-last_name",
          type="text")
      .form__row
        label.form__label(
          for="user-password") Password
        span.help(
          v-if="errorLog.password") {{ errorLog.password }}
        input.form__control(
          v-model="field_password",
          id="user-password",
          type="text")
      .form__row
        label.form__label(
          for="user-about") Acerca de
        span.help(
          v-if="errorLog.about") {{ errorLog.about }}
        textarea.form__textarea(
          v-model="field_about",
          id="user-about",
          name="about")
      .form__row
        label.form__label(
          for="user-email") Correo
        span.help(
          v-if="errorLog.email") {{ errorLog.email }}
        input.form__control(
          id="user-email",
          v-model="field_email",
          type="email")
      .form__row
        label.form__label(
          for="user-phone") Teléfono
        span.help(
          v-if="errorLog.phone") {{ errorLog.phone }}
        input.form__control(
          v-model="field_phone",
          id="user-phone",
          type="tel")
      .form__row
        label.form__label Grupos
        span.help(
            v-if="errorLog.group_ids") {{ errorLog.group_ids }}
        .row(v-for="group in groups")
          input.form__input-check(
            type="checkbox"
            :id="'user-group-' + group.id"
            :value="group.id"
            v-model="field_group_ids")
          label.form__label-checkbox.i-ok(
            :for="'user-group-' + group.id") {{ group.name }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>

import EditFormMixin from '@/mixins/EditFormMixin'
import userAPI from '@/api/user'
import uploadPhoto from './shared/uploadPhoto'
import { mapState } from 'vuex'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  first_name: null,
  last_name: null,
  password: null,
  about: null,
  email: null,
  phone: null,
  group_ids: null,
  picture: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditUser',
  components: {
    uploadPhoto
  },
  data () {
    return {
      apiMethod: userAPI.update
    }
  },
  computed: {
    ...mapState('ui', [
      'groups'
    ]),
    user () {
      return this.object
    }
  }
}
</script>
