<template>
  <el-button
    class="btn-edit light-green-btn"
    type="success"
    size="small"
    icon="el-icon-edit"
    @click="handleEdit"
  >
    {{ $t('edit') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonEdit',
  methods: {
    handleEdit() {
      this.$emit('handleEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-edit {
  height: 40px;
  width: 97px;
  border: none;
}
</style>
