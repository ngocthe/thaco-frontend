<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane :label="$t('wh_summary')" name="wh_summary">
        <SummaryIndex />
      </el-tab-pane>
      <el-tab-pane :label="$t('logical_inventory')" name="logical_inventory">
        <LogicalIndex />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import LogicalIndex from '@/views/InventoryControl/WhAdjustment/logical/index.vue'
import SummaryIndex from '@/views/InventoryControl/WhAdjustment/summary/index.vue'

export default {
  name: 'Warehouse',
  components: {
    LogicalIndex,
    SummaryIndex
  },
  data() {
    return {
      activeTab: 'wh_summary'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
.el-tabs__header{
  margin: 0px;
}
</style>
