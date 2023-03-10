<template>
  <el-button
    class="ml20 btn-download"
    size="small"
    icon="el-icon-download"
    @click="handleDownload()"
  >
    {{ $t('download') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonDownload',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleDownload() {
      this.$emit('handleDownload')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-download {
  width: 138px;
  height: 40px;
}
</style>
