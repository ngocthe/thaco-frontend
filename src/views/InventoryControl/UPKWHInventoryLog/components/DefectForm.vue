<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialogDefect" :close-on-click-modal="false" :title="'Defect Status'" :visible.sync="showDialogDefect" class="form-submit" :destroy-on-close="true">
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
      <!-- part_no -->
      <el-form-item :label="$t('part_no')" :label-width="formLabelWidth">
        <el-input v-model="form.part_code" :placeholder="$t('part_code')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- part_color -->
      <el-form-item :label="$t('part_color_code')" :label-width="formLabelWidth">
        <el-input v-model="form.part_color_code" :placeholder="$t('part_color_code')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- box_quantity -->
      <el-form-item :label="$t('quantity_of_box')" :label-width="formLabelWidth">
        <el-input v-model="form.box_quantity" :placeholder="$t('quantity_of_box')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- defect_id -->
      <el-form-item :label="$t('case_defect_status')" :label-width="formLabelWidth">
        <el-select
          v-model="form.defect_id"
          filterable
          :no-match-text="$t('no_data2')"
          :placeholder="$t('case_defect_status')"
          class="input-form"
        >
          <el-option
            v-for="item in defects"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('remark')" prop="remark" :label-width="formLabelWidth">
        <el-input
          v-model="form.remark"
          class="input-form"
          type="textarea"
          :rows="3"
          :placeholder="$t('remark')"
        />
      </el-form-item>
      <p style="border-top: 1px solid #D9D9D9; padding-top: 20px; font-weight: bold">List Box</p>
      <DefectList :form="form" :defects="defects" />
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
import { updateDefect as update } from '@/api/inventory/upk-inventory-log'

import dialogMixin from '@/mixins/crud/dialog'
import DefectList from './DefectList'

export default {
  components: { DefectList },
  props: ['defects', 'showDialogDefect'],
  mixins: [dialogMixin(null, update)],
  data() {
    return {
      rules: {
        defect_id: [
          // { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        remark: [
          { max: 255, message: this.$t('max_length_remark') + '255 ' + this.$t('characters'), trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    closeDialogDefect() {
      this.$emit('update:showDialogDefect', false)
      this.$refs.form.clearValidate()
    },
    async beforeUpdateDefect() {
      if (this.form.defaultBoxList !== JSON.stringify(Object.entries(this.form.box_list))) {
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
      } else {
        this.updateDefect()
      }
    },
    async updateDefect() {
      var data = {
        defect_id: this.form.defect_id,
        box_list: this.form.box_list,
        remark: this.form.remark
      }
      this.loading = true
      try {
        await update(this.form.id, data)
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
