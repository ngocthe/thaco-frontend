<template>
  <el-button
    class="btn-import green-btn ml20"
    type="success"
    size="small"
    icon="el-icon-plus"
    @click="handleAdd()"
  >
    {{ $t('add') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonAdd',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleAdd() {
      this.$emit('handleAdd')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-import  {
  width: 116px !important;
  height: 40px;
  color: white;
}
</style>
