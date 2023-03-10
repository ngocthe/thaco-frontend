<template>
  <div>
    <MSC v-if="tabActive === 'msc'" @switch-part="switchTabPart()" />
    <Part v-if="tabActive ==='part'" @switch-msc="switchTabMSC()" />
  </div>
</template>

<script>
import Part from '@/views/MRP/MRPResult/part/index'
import MSC from '@/views/MRP/MRPResult/msc/index'

const TABs = { PART: 'part', MSC: 'msc' }

export default {
  name: 'MrpResult',
  components: { Part, MSC },
  data() {
    return {
      tabActive: TABs.MSC,
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
