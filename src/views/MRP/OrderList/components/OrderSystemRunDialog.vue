<template>
  <el-dialog width="880px" :before-close="closeDialog" :title="title" :visible.sync="isShow" :close-on-click-modal="false" class="form-submit">
    <el-form ref="form" :label-position="'left'" :model="form" :rules="rules">
      <el-form-item :label="$t('production_plan_select')" prop="import_id" :error="errors.import_id">
        <el-select
          v-model="form.import_id"
          reserve-keyword
          filterable
          :placeholder="$t('production_plan_select')"
          :no-match-text="$t('no_data2')"
          style="width: 100%"
          remote
          clearable
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

      <el-form-item :label="$t('contract_no')" prop="contract_code" :error="errors.contract_code">
        <el-select
          v-model="form.contract_code"
          clearable
          filterable
          :placeholder="$t('contract_no')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteContracts"
          :loading="loading_search"
          @visible-change="remoteContracts('')"
        >
          <el-option
            v-for="item in options.contract_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('part_group')" prop="part_group" :error="errors.part_group">
        <el-select
          v-model="form.part_group"
          clearable
          filterable
          :placeholder="$t('part_group')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePartGroups"
          :loading="loading_search"
          @visible-change="remotePartGroups('')"
        >
          <el-option
            v-for="item in options.part_group"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:isShow', false)">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleOrderSystemRun">{{ $t('order_system_run') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { statusFileImport } from '@/utils/constant'
import { checkShortagePart, system_run } from '@/api/mrp/order-list'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['isShow', 'title', 'params', 'options', 'loading_search'],
  data() {
    return {
      rules: {
        import_id: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('production_plan_select') }), trigger: 'change' }
        ],
        part_group: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('part_group') }), trigger: 'change' }
        ],
        contract_code: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('contract_no') }), trigger: 'change' }
        ]
      },
      form: {
        import_id: '',
        part_group: '',
        contract_code: ''
      },
      errors: {
        contract_code: '',
        part_group: '',
        import_id: ''
      },
      errorDefaults: {
        contract_code: '',
        part_group: '',
        import_id: ''
      }
    }
  },
  methods: {
    remoteContracts(query) {
      this.options.contract_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'contract_code', params: { column: 'contract_code', keyword: query, part_group: this.form.part_group }})
      }, 100)
    },
    closeDialog() {
      this.$emit('update:isShow', false)
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    async handleOrderSystemRun() {
      this.errors = { ... this.errorDefaults }
      await this.$refs.form.validate()
      if (!this.valid) {
        const formPayload = { ...this.form }
        try {
          const { data } = await checkShortagePart(formPayload)
          if (data?.total_shortage_part !== 0) {
            this.$confirm(this.$t('warning_shortage') + '', 'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(async() => {
              await system_run(formPayload)

              this.$message({
                message: this.$t('request_received'),
                type: 'success'
              })

              this.$emit('update:isShow', false)
              this.$refs.form.resetFields()
              this.$refs.form.clearValidate()
              this.errors = { ... this.errorDefaults }
              setTimeout(() => {
                location.reload()
              }, 1000)
            }).catch((e) => {
              return 1
            })
          } else {
            await system_run(formPayload)

            this.$message({
              message: this.$t('request_received'),
              type: 'success'
            })

            this.$emit('update:isShow', false)
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
            this.errors = { ... this.errorDefaults }
            setTimeout(() => {
              location.reload()
            }, 1000)
          }
        } catch (e) {
          if (e.data) {
            for (const [key, value] of Object.entries(e.data)) {
              const columnArray = key.split('.')
              this.errors[columnArray[0]] = value.message
            }
          } else {
            this.$message({
              message: e.message,
              type: 'error'
            })
          }
        }
      }
    },
    getOriginalFileName() {
      const optionFiltered = this.options.input_file_name.filter(file => {
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
        this.$emit('handle-change-search', { model: 'input_file_name', params: { original_file_name: query, mrp_or_status: statusFileImport.RAN_MRP }})
      }, 100)
    },
    remotePartGroups(query) {
      this.options.part_group = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_group', params: { column: 'part_group', keyword: query, contract_code: this.form.contract_code }})
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
@media(max-width: 940px) {
  .form-submit .el-select {
    width: 100% !important;
  }
}
::v-deep .el-form-item {
  display: flex;
}
</style>
