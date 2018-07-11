<template lang="pug">
.layout_bg
  header.page-header
    .layout-inner
      span.brand
        img.brand__logo(src='/static/img/brand-prilov.svg', alt='Prilov Compra. Usa. Vende')
        span.brand__typo
          strong.brand__name Prilov.com
          span.brand__tagline  Compra. Usa. Vende.
  .modal.modal_scroll
    .modal__slot.content-slot
      .content-slot__inner
        .form-slot(
          v-if="user.id")
          h1.title Panel de administración de Prilov
          p.form__info.i-alert-info(v-if="loginError") Bienvenida
        .form-slot(
          v-else)
          h1.title Panel de administración de Prilov
          p.form__info.i-alert-info(v-if="loginError") No podemos reconocer tu usuario y contraseña.
          form.form(
            @submit.prevent='login'
          )
            .form__row(
              v-bind:class='{ "is-danger": errorLog.email }'
            )
              label.form__label(
                for='email') Correo
              span.help(
                v-if="errorLog.email"
              ) {{ errorLog.email }}
              input.form__control(
                v-model='email',
                id='email',
                type='email')
            .form__row(
              v-bind:class='{ "is-danger": errorLog.password }'
            )
              label.form__label(
                for='password'
              ) Contraseña
              span.help(
                v-if="errorLog.password"
              ) {{ errorLog.password }}
              input.form__control(
                v-model='password',
                id='password',
                type='password')
            .form__row.form__row_away
              button.btn.btn_solid.btn_block(v-if="!loading") Iniciar sesión
              button.btn.btn_solid.btn_block(v-else disabled)
                Dots
</template>

<script>
import { mapState } from 'vuex'
import userAPI from '@/api/user'

export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      errorLog: {},
      loginError: false,
      loading: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validateEmail () {
      if (!this.email) {
        this.$set(this.errorLog, 'email', 'Debes ingresar tu email')
        return
      }

      if (!/^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
        this.$set(this.errorLog, 'email', 'El email que ingresaste no parece válido.')
      }
    },
    validate () {
      this.errorLog = {}
      this.validateEmail()
      if (!this.password) this.$set(this.errorLog, 'password', 'Debes ingresar una contraseña')

      return Object.keys(this.errorLog).length === 0
    },
    login: function () {
      this.loginError = false
      this.loading = true
      if (!this.validate()) {
        this.loading = false
        return
      }

      const payload = {
        email: this.email,
        password: this.password
      }
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
        })
        .catch((e) => {
          this.loginError = true
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
