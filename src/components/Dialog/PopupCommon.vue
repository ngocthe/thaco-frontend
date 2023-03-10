<template>
  <el-dialog
    :title="title"
    :visible="true"
    :width="width"
    :before-close="emitClose"
  >
    <span slot="title" class="el-dialog__title">
      <div style="word-break: break-all;max-width: calc(100% - 20px);">{{ title }}</div>
    </span>
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button @click="emitClose()">Cancel</el-button>
      <el-button type="primary" @click="emitSubmit()">{{ title_submit }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'PopupCommon',
  props: {
    title: {
      type: String,
      default: 'Popup'
    },
    title_submit: {
      type: String,
      default: 'Submit'
    },
    width: {
      type: String,
      default: '30%'
    }
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    emitSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__footer {
  box-shadow: inset 0px 1px 0px #F0F0F0;
  padding: 10px;
}
::v-deep .el-dialog__header {
  box-shadow: inset 0px -1px 0px #F0F0F0;
}
::v-deep .el-dialog {
  width: 600px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  margin: 0 !important;
}
</style>
