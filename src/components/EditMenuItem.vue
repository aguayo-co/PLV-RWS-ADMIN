<template lang="pug">
  .edit__slide
    h3.slide__header.i-close(
      @click.stop="$emit('close')") Editar item de menú
    form.slide__form(@submit.prevent="submit")
      .form__row
        label.form__label(
          for="menu_item-name") Nombre
        span.help(
          v-if="errorLog.name") {{ errorLog.name }}
        input.form__control(
          id="menu_item-name",
          v-model="field_name",
          type="text")
      .form__row
        span.help(
          v-if="errorLog.parent_id") {{ errorLog.parent_id }}
        label.form__label(
          for='menu_item-parent_id') Item padre
        select.form__select(
          id='menu_item-parent'
          v-model='parent')
          option(:value="undefined") Sin padre
          option(v-for="parent in extraData.availableTree" v-if="parent.id !== menuItem.id" :value='parent') {{ parent.name }}
        select.form__select(
          v-if="parent && parent.children"
          id='menu_item-sub_parent'
          v-model='subParent')
          option(:value="undefined") -
          option(v-for="subParent in parent.children" v-if="subParent.id !== menuItem.id" :value='subParent') {{ subParent.name }}
      .form__row
        label.form__label(
          for="menu_item-url") Nombre
        span.help(
          v-if="errorLog.url") {{ errorLog.url }}
        input.form__control(
          id="menu_item-url",
          v-model="field_url",
          type="text")
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(:disabled="saving")
          Dots(v-if="saving")
          template(v-else) Guardar
</template>

<script>
import EditFormMixin from '@/mixins/EditFormMixin'
import menuItemAPI from '@/api/menuItem'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  name: null,
  parent_id: null,
  url: null
}

export default {
  mixins: [EditFormMixin(editableProps)],
  name: 'EditMenuItem',
  computed: {
    payload () {
      const payload = {...this.newData}
      // Siempre que se seleccione un padre, omitimos el menu.
      if (!this.field_parent_id) {
        payload.menu_id = this.extraData.currentMenu
        delete payload.parent_id
      }
      return payload
    },
    parent: {
      set (parent) {
        if (parent) {
          this.field_parent_id = parent.id
          return
        }
        this.field_parent_id = null
      },
      get () {
        const tree = this.extraData.availableTree
        return tree.find(item => {
          // Verifica si hay un subParent y es hijo de este item.
          if (this.subParent && item.id === this.subParent.parent_id) {
            return true
          }

          // Verifica si es el item.
          if (item.id === this.field_parent_id) {
            return true
          }
        })
      }
    },
    subParent: {
      set (parent) {
        if (parent) {
          this.field_parent_id = parent.id
          return
        }
        this.field_parent_id = this.subParent.parent_id
      },
      get () {
        const tree = this.extraData.availableTree
        let subParent = null
        tree.forEach(item => {
          // Verifica si es uno de los hijos del item.
          if (!item.children) {
            return false
          }
          subParent = item.children.find(subItem => {
            if (subItem.id === this.field_parent_id) {
              return true
            }
          })
        })
        return subParent
      }
    },
    apiMethod () {
      return this.object.id ? menuItemAPI.update : menuItemAPI.create
    },
    menuItem () {
      return this.object
    }
  }
}
</script>
