<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialogDefect" :close-on-click-modal="false" :title="'Defect Status'" :visible.sync="showDialogDefect" class="form-submit">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <!-- contract_code -->
      <el-form-item :label="$t('contract_no')" :label-width="formLabelWidth">
        <el-input v-model="form.contract_code" :placeholder="$t('contract_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- invoice_no -->
      <el-form-item :label="$t('invoice_no')" :label-width="formLabelWidth">
        <el-input v-model="form.invoice_code" :placeholder="$t('invoice_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- bl_no -->
      <el-form-item :label="$t('bl_no')" :label-width="formLabelWidth">
        <el-input v-model="form.bill_of_lading_code" :placeholder="$t('bl_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- container_no -->
      <el-form-item :label="$t('container_no')" :label-width="formLabelWidth">
        <el-input v-model="form.container_code" :placeholder="$t('container_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- case_no -->
      <el-form-item :label="$t('case_no')" :label-width="formLabelWidth">
        <el-input v-model="form.case_code" :placeholder="$t('case_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- defect_id -->
      <el-form-item :label="$t('defect_status')" :label-width="formLabelWidth">
        <el-select
          v-model="form.defect_id"
          filterable
          :placeholder="$t('defect_status')"
          class="input-form"
          clearable
        >
          <el-option
            v-for="item in defects"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('remark')" prop="ecn_out" :label-width="formLabelWidth">
        <el-input
          v-model="form.remark"
          class="input-form"
          type="textarea"
          :rows="3"
          :placeholder="$t('remark')"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" size="large" @click="closeDialogDefect">{{ $t('cancel') }}</el-button>
        <el-button
          :disabled="loading"
          size="large"
          type="primary"
          @click="beforeUpdateDefect()"
        >Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { create, update } from '@/api/inventory/bwh_inventory_log'

import dialogMixin from '@/mixins/crud/dialog'

export default {
  props: ['defects', 'showDialogDefect'],
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      rules: {
        defect_id: [
          // { required: true, message: this.$t(10080), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDialogDefect() {
      this.$emit('update:showDialogDefect', false)
    },
    async beforeUpdateDefect() {
      console.log(this.form.defaultDefect, this.form.defect_id)
      if (this.form.defaultDefect !== this.form.defect_id) {
        try {
          const res = await this.$confirm(
            'Update Defect Status does not change Summary quantity, please update by using Warehouse Adjustment',
            {
              dangerouslyUseHTMLString: true,
              title: 'Warning',
              confirmButtonText: this.$t('confirm_yes'),
              cancelButtonText: this.$t('confirm_no'),
              type: 'warning'
            }
          )
          if (res) {
            this.updateDefect()
            console.log('đã pass')
          }
        } catch (error) {
          this.$loader(false)
          if (error !== 'cancel' && error !== 'close') {
            this.$message({
              message: error.message,
              type: 'error'
            })
          }
        }
      } else if (this.form.defaultDefect === null && this.form.defect_id === null) {
        this.updateDefect()
      } else {
        this.updateDefect()
      }
    },
    async updateDefect() {
      this.loading = true
      try {
        await update(this.form.id, this.form)
        this.$message({
          message: this.$t('edit_success'),
          type: 'success'
        })
        this.closeDialogDefect()
        this.$emit('updated')
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } catch (error) {
        this.loading = false
        this.error(error.message)
      }
    }
  }
}
</script>
