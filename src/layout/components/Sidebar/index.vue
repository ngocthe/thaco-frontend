<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="true" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.permission_routes.forEach(parent => {
      if (parent.name === 'Inventory Control' && parent.children.length === 1 &&
        parent.children[0].children.length === 1 &&
        parent.children[0].children[0].children.length < 1) {
        parent.hidden = true
      } else if (parent.name === 'Inventory Control' && parent.children.length >= 1) {
        var masterInventory = parent.children.filter(child_f => { return child_f.name === 'Inventory Control Master' })
        if (masterInventory[0].children.length === 1) {
          masterInventory[0].hidden = true
        } else {
          var masterInventoryPoint = masterInventory[0].children.filter(child_s => { return child_s.name === 'UPKWHOrderPointControl' })
          if (masterInventoryPoint[0].children.length === 0) {
            masterInventoryPoint[0].hidden = true
          }
        }
      }
      if (parent.name === 'MRP' && parent.children.length === 0) {
        parent.hidden = true
      }
      if (parent.name === 'Master' && parent.children.length === 0) {
        parent.hidden = true
      }
    })
  }
}
</script>
