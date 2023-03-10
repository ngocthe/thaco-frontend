<template>
  <div class="app-container">
    <Warehouse
      v-show="activeTab == 'wh_inventory_summary'"
      :title="title"
      @change-tab="changeTabToPart()"
    />
    <Part
      v-show="activeTab == 'part'"
      ref="partTab"
      :title="title"
      @change-tab="changeTabToWH()"
    />
  </div>
</template>

<script>
import Warehouse from '@/views/InventoryControl/WarehouseInventorySummary/Warehouse'
import Part from '@/views/InventoryControl/WarehouseInventorySummary/Part'

export default {
  name: 'WarehouseInventorySummary',
  components: {
    Warehouse,
    Part
  },
  data() {
    return {
      exportFileName: 'warehouse-inventory-summary',
      title: this.$t('warehouse_inventory_summary') + '_' + this.$t('warehouse'),
      activeTab: 'wh_inventory_summary'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    changeTabToWH() {
      this.activeTab = 'wh_inventory_summary'
      this.$refs.partTab.fixedColumnTable = false
      this.title = this.$t('warehouse_inventory_summary') + '_' + this.$t('warehouse')
    },
    changeTabToPart() {
      this.activeTab = 'part'
      this.$refs.partTab.fixedColumnTable = true
      this.title = this.$t('warehouse_inventory_summary') + '_' + this.$t('part')
    }
  }
}
</script>

<style lang="scss">
.el-tabs__header{
  margin: 0px;
}
</style>
