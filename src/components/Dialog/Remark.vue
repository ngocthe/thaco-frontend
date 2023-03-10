<template>
  <el-dialog
    class="dialog-remark"
    :close-on-click-modal="false"
    title="Remark"
    :visible.sync="isShowRemark"
    :before-close="handleCloseDialogRemark"
    width="790px"
  >
    <div class="dialog-body">
      <div v-for="item in dataRemarks" :key="item.id" style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee">
        <h4 style="word-break: break-word;  white-space: pre-wrap; margin-top: 0; line-height: 1.5">{{ item.content }}</h4>
        <div class="d-flex" style="justify-content: space-between">
          <div>{{ item.created_at | formatDateTime('d/m/y h:i:s') }}</div>
          <div>{{ item.user.username }}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-form ref="formRemark" :model="form" :rules="rules">
        <el-form-item :label="$t('remark')" prop="remark" style="margin-bottom: 0">
          <el-input v-model="form.remark" class="textarea-remark" type="textarea" rows="3" :placeholder="this.$t('remark')" no-resize />
        </el-form-item>
      </el-form>
      <div class="btn-remark">
        <el-button @click="handleCloseDialogRemark">{{ this.$t('cancel') }}</el-button>
        <el-button :loading="loading" type="primary" @click="handleCreateRemark">{{ this.$t('add') }}</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import { create as createRemark } from '@/api/remark/remark'

export default {
  mixins: [datetimeConvert()],
  // eslint-disable-next-line vue/require-prop-types
  props: ['current', 'modelableType', 'isShowRemark', 'dataRemarks', 'form'],
  data() {
    var checkTrimValue = (rule, value, callback) => {
      if (value.trim().length > 0) {
        callback()
      } else {
        callback(new Error(this.$t('input_required')))
      }
    }
    return {
      loading: false,
      rules: {
        remark: [
          { required: true, message: 'The ' + this.$t('remark') + ' field is required.', trigger: 'blur' },
          { whitespace: true, message: 'The ' + this.$t('remark') + ' field is required.', trigger: 'blur' },
          { max: 255, message: this.$t('the') + this.$t('remark') + ' ' + this.$t('max_length').toLowerCase() + '255 ' + this.$t('characters'), trigger: 'blur' },
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'isShowRemark': {
      handler: function() {
        if (this.isShowRemark) {
          setTimeout(() => {
            this.scrollRemarkToBottom()
          }, 200)
        }
      }
    }
  },
  methods: {
    async handleCreateRemark() {
      const data = {
        modelable_type: this.modelableType,
        modelable_id: this.current,
        remark: this.form.remark
      }
      try {
        await this.$refs.formRemark.validate()
        if (this.valid) return
        this.loading = true
        await createRemark(data)
        this.$message({
          message: this.$t('created_success'),
          type: 'success'
        })
        this.dataRemarks.push({
          content: this.form.remark.trim(),
          created_at: new Date(),
          updated_at: new Date(),
          user: { username: this.$store.state.user.username }
        })
        this.$refs['formRemark'].resetFields()
        this.loading = false
        setTimeout(() => {
          this.scrollRemarkToBottom()
        }, 500)
      } catch (error) {
        this.loading = false
        this.$loader(false)
        if (error.message) {
          this.$message({
            message: error.message,
            type: 'error'
          })
        }
      }
    },
    handleCloseDialogRemark() {
      const textarea = document.querySelector('textarea')
      textarea.style.height = 'auto'
      this.$refs['formRemark'].resetFields()
      this.$emit('handle-close-remark')
    },
    scrollRemarkToBottom() {
      var bodyRemark = document.getElementsByClassName('el-dialog__body')
      bodyRemark[0].scrollTop = bodyRemark[0].scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-remark {
  margin-top: 20px;
  padding: 0 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f1f1 !important;
}
.el-form {
  padding: 0 20px;
}
::v-deep {
  .el-dialog__body {
    padding: 20px;
    max-height: 50vh;
    overflow-x: hidden;
  }
  .el-dialog__header {
    border-bottom: 1px solid #f1f1f1 !important;
  }
  .el-dialog__footer {
    padding: 0 0 20px;
  }
}
</style>
