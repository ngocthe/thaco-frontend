<template>
  <el-dialog
    class="delete-inventory"
    title="Warning"
    :visible.sync="showFormDelete"
    width="518px"
    style="margin-top: 20vh"
    :before-close="closeDialogDefect"
  >
    <div style="position: relative"><i class="el-icon-warning icon-warning-delete" />
      <span class="text-confirm-delete">{{ $t('confirm_delete') }}
      </span>
    </div>
    <span>
      <el-checkbox v-model="update_summary" :label="$t('confirm_update_summary')" border style="margin-top: 15px" />
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialogDefect">No</el-button>
      <el-button type="primary" @click="$emit('handle-delete', update_summary)">Yes</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['update_summary', 'showFormDelete'],
  methods: {
    closeDialogDefect() {
      this.$emit('update:showFormDelete', false)
    }
  }
}
</script>

<style scoped="">
.icon-warning-delete {
  color:#ffba00;
  font-size: 1.5rem;
}
.text-confirm-delete {
  position: absolute;
  margin-left: 12px;
  margin-top: 5px !important;
}
::v-deep .el-dialog__body {
  padding:15px 25px !important;
}
::v-deep .el-dialog__header .el-dialog__title{
  font-size: 18px;
  line-height: 1;
  color: #303133;
  font-weight: 200;
}
</style>
