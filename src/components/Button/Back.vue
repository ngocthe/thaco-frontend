<template>
  <el-button
    class="btn-back btn-back-link"
    size="small"
    icon="el-icon-arrow-left"
    @click="handleBack"
  >
    {{ $t('back') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonBack',
  methods: {
    handleBack() {
      this.$emit('handleBack')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-back {
  height: auto;
  width: auto;
  border: none;
  padding-left: 0;
  pointer-events: none;
  margin-bottom: 20px;
}
</style>
