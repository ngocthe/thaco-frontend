<template>
  <SystemRun
    :title="'MRP System Run'"
    :title_submit="'MRP System Run'"
    :width="'884px'"
    @close="emitClose()"
    @submit="submit()"
  >
    <el-form ref="form" label-position="left" label-width="280px" :model="form" :rules="rules">
      <el-form-item :label="$t('Production Plan Select')" prop="import_id">
        <el-select
          v-model="form.import_id"
          style="margin-right: 20px; float:right"
          class="production-selection"
          clearable
          :no-match-text="$t('no_data2')"
          remote
          reserve-keyword
          filterable
          :placeholder="$t('Production Plan Select')"
          :loading="loading_search"
          :remote-method="remoteInputFileName"
          @visible-change="remoteInputFileName('')"
        >
          <el-option
            v-for="item in options.input_file_name"
            :key="item.id"
            :label="item.original_file_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </SystemRun>
</template>

<script>
import SystemRun from '@/components/Dialog/PopupCommon'
import { statusFileImport } from '@/utils/constant'
import { fillAttributeToMessage } from '@/utils/validate'

export default {
  name: 'SystemRunMRP',
  components: { SystemRun },
  props: ['options', 'isRunMRP', 'loading_search', 'params'],
  data() {
    return {
      rules: {
        import_id: [
          { required: true, message: fillAttributeToMessage(this.$t('Production Plan Select'), 10080), trigger: 'change' }
        ]
      },
      form: {
        import_id: ''
      }
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate()
      if (!this.valid) {
        const fileName = this.getOriginalFileName()
        this.$emit('handleMRPSystemRun', { import_id: this.form.import_id, file_name: fileName })
        this.$emit('update:isRunMRP', false)
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    },
    emitClose() {
      this.$emit('update:isRunMRP', false)
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
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
    },
    remoteInputFileName(query) {
      this.options.input_file_name = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'input_file_name', params: { original_file_name: query, mrp_or_status: statusFileImport.CHECKED_SHORTAGE }})
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  margin-left: auto;
  display: flex;
}

::v-deep .el-select {
  width: 100% !important;
  margin-right: 0;
}
</style>
