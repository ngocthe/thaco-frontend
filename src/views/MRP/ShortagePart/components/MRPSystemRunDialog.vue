<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :title="title" :visible.sync="isShow" :close-on-click-modal="false" class="form-submit" :destroy-on-close="true">
    <el-form ref="form" :model="form" :label-width="formLabelWidth" :rules="rules">
      <el-form-item :label="$t('input_file_name')" prop="import_id">
        <el-select
          v-model="form.import_id"
          class="input-form"
          clearable
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteFile"
          filterable
          :placeholder="$t('input_file_name')"
          @visible-change="remoteFile('')"
        >
          <el-option
            v-for="item in options.imports"
            :key="item.id"
            :label="item.original_file_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleMRPSystemRun()">{{ $t('MRP_system_run') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { statusFileImport } from '@/utils/constant'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['isShow', 'title', 'formLabelWidth', 'params', 'options', 'loading_search'],
  data() {
    return {
      rules: {
        import_id: [
          { required: true, message: 'The Input File Name is required', trigger: 'change' }
        ]
      },
      formPopupWidth: '884px',
      form: {
        import_id: null
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:isShow', false)
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    remoteFile(query) {
      this.options.imports = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'imports', params: { original_file_name: query, mrp_or_status: statusFileImport.NOT_YET_RUN }})
      }, 100)
    },
    async handleMRPSystemRun() {
      await this.$refs.form.validate()
      if (!this.valid) {
        const file_name = this.getOriginalFileName()
        this.$emit('handleMRPSystemRun', { import_id: this.form.import_id, file_name: file_name })
        this.$emit('update:isShow', false)
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    },
    getOriginalFileName() {
      const optionFiltered = this.options.imports.filter(file => {
        return file.id === this.form.import_id
      })

      if (optionFiltered.length) {
        return optionFiltered[0].original_file_name
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-submit .el-select {
    width: 100% !important;
}
::v-deep .form-submit {
  .el-form-item__label {
    float: none;
    width: 100% !important;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
