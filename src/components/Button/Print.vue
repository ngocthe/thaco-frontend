<template>
  <el-button
    class="btn-print btn-common"
    size="medium"
    icon="el-icon-printer"
    type="default"
    @click="handlePrint"
  >{{ $t('print') }}</el-button>
</template>

<script>
export default {
  name: 'ButtonPrint',
  methods: {
    handlePrint() {
      this.$emit('handlePrint')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-print  {
  width: 116px !important;
  height: 40px;
}
</style>
