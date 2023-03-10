<template>
  <el-button
    class="btn-download-sample"
    size="small"
    icon="el-icon-download"
    @click="handleDownloadFileSample()"
  >
    {{ $t('download_sample') }}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonDownloadFileSample',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleDownloadFileSample() {
      this.$emit('handleDownloadFileSample')
    }
  }
}
</script>

<style lang="scss" scoped>

.btn-download-sample{
  width: 218px;
  height: 40px;
}

</style>
