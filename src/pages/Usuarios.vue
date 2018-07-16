<template lang="pug">
  ListLayout
    template(slot="title") Usuarias

    template(slot="columns")
      th.crud__th.crud__title Usuaria
      th.crud__th.crud__title Email
      th.crud__th.crud__title Teléfono
      th.crud__th.crud__title Grupos
      th.crud__th.crud__title Roles
      th.crud__th.crud__title Vaciones
      th.crud__th.crud__title Créditos
      th.crud__th.crud__title Productos<br>publicados
      th.crud__th.crud__title Productos<br>vendidos
      th.crud__th.crud__title Productos<br>comprados
      th.crud__th.crud__title Fecha de<br>creación

    template(
      v-for="user in users"
      :slot="'row-' + user.id")
      td.crud__cell
        figure.crud__avatar.avatar
          img.avatar__img(v-if="user.picture", :src="user.picture", :alt="user.first_name")
          span.tool-user__letter.avatar__img(
            v-else
          ) {{ user.first_name.charAt(0).toUpperCase() }}
          figcaption.avatar__txt {{ user.first_name + ' ' + user.last_name }}
      td.crud__cell.crud__cell_wbreak.crud__cell_130.small-txt {{ user.email }}
      td.crud__cell {{ user.phone }}
      td.crud__cell
        ul(v-if='user.groups_ids')
          li(v-for='group_id in user.groups_ids') {{ group_id }}
      td.crud__cell
        ul(v-if='user.roles')
          li(v-for='role in user.roles') {{ role.name }}
      td.crud__cell.crud__cell_center {{ user.vacation_mode ? "Sí" : "No" }}
      td.crud__cell.crud__cell_center {{ user.credits }}
      td.crud__cell.crud__cell_center {{ user.published_products_count }}
      td.crud__cell.crud__cell_center {{ user.sold_products_count }}
      td.crud__cell.crud__cell_center {{ user.purchased_products_count }}
      td.crud__cell {{ user.created_at | date }}
</template>

<script>

import userAPI from '@/api/user'
import EditUser from '@/components/EditUser'
import ListMixin from '@/mixins/ListMixin'

export default {
  name: 'Usuaria',
  mixins: [ListMixin],
  data () {
    return {
      slide: EditUser,
      users: [],

      objectsKey: 'users',
      loaderMethod: userAPI.get
    }
  }
}
</script>
