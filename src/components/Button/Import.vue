<template>
  <router-link
    :to="'/import?type=' + type"
  >
    <el-button
      class="btn-import-excel green-btn ml20"
      type="success"
      size="small"
    >
      <svg-icon icon-class="import" style="margin-right: 5px;" />
      {{ $t('import') }}
    </el-button>
  </router-link>
</template>

<script>
export default {
  name: 'ButtonImport',
  props: ['type']
}
</script>

<style lang="scss" scoped>
.btn-import-excel  {
  width: 116px !important;
  height: 40px;
  color: white;
}
</style>
