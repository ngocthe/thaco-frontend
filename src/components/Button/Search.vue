<template>
  <el-button
    type="primary"
    class="btn-search blue-btn"
    size="small"
    icon="el-icon-search"
    @click="handleSearch"
  >
    {{ $t('search') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonSearch',
  methods: {
    handleSearch() {
      this.$emit('handleSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-search {
  width: 116px !important;
  height: 40px;
  color: white;
}
</style>
