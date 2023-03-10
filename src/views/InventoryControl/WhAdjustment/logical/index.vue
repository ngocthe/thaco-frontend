<template>
  <div>
    <PartLogical v-show="tabActive === TABs.PART" @switch-msc="switchTabMSC()" />
    <MSCLogical v-show="tabActive === TABs.MSC" @switch-part="switchTabPart()" />
  </div>
</template>

<script>
import PartLogical from '@/views/InventoryControl/WhAdjustment/logical/Part/index'
import MSCLogical from '@/views/InventoryControl/WhAdjustment/logical/MSC/index'

const TABs = { PART: 'part-adj', MSC: 'msc-adj' }

export default {
  name: 'Warehouse',
  components: { MSCLogical, PartLogical },
  data() {
    return {
      tabActive: TABs.PART,
      TABs: TABs
    }
  },
  methods: {
    switchTabPart() {
      this.tabActive = TABs.PART
    },
    switchTabMSC() {
      this.tabActive = TABs.MSC
    }
  }
}
</script>

<style type="text/css">

</style>
