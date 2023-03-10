<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialogDefect" :close-on-click-modal="false" :title="'Defect Status'" :visible.sync="showDialogDefect" class="form-submit">
    <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
      <!-- part_code -->
      <el-form-item :label="$t('part_no')" :label-width="formLabelWidth">
        <el-input v-model="form.part_code" :placeholder="$t('part_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- part_color_code -->
      <el-form-item :label="$t('part_color_code')" :label-width="formLabelWidth">
        <el-input v-model="form.part_color_code" :placeholder="$t('part_color_code')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- date_received_at_assembly_plant -->
      <el-form-item :label="$t('date_received_at_assembly_plant')" prop="received_date" :error="errors.received_date" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.received_date"
          class="input-form"
          :disabled="true"
          type="date"
          :placeholder="$t('date_received_at_assembly_plant')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-form-item>
      <!-- <el-form-item :label="$t('date_received_at_assembly_plant')" :label-width="formLabelWidth">
        <el-input v-model="form.received_date" :placeholder="$t('date_received_at_assembly_plant')" disabled clearable class="input-form" />
      </el-form-item> -->
      <!-- number_of_boxes_received_UPKWH -->
      <el-form-item :label="$t('number_of_boxes_received_UPKWH')" :label-width="formLabelWidth">
        <el-input v-model="form.received_box_quantity" :placeholder="$t('number_of_boxes_received_UPKWH')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- defect_id -->
      <el-form-item :label="$t('defect_status')" :label-width="formLabelWidth">
        <el-select
          v-model="form.defect_id"
          filterable
          :placeholder="$t('defect_status')"
          class="input-form"
          :disabled="true"
        >
          <el-option
            v-for="item in searchDefects"
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
import { updateDefect as update } from '@/api/inventory/plant_wh_inventory_log'

import dialogMixin from '@/mixins/crud/dialog'
import DefectList from './DefectList'

export default {
  components: { DefectList },
  mixins: [dialogMixin(null, update)],
  props: ['defects', 'showDialogDefect', 'searchDefects'],
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
        // defect_id: this.form.defect_id === 0 ? null : '',
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
        if (error.message) {
          error.message = this.changeMessPartDefectQuantity(error.message, error.data)
        }
        this.error(error.message)
      }
    },
    changeMessPartDefectQuantity(message, data) {
      let result = message
      if (result.search('box_list') !== -1) {
        result = result.replace('must be at least 0', 'must be a positive number')
        const number_position = parseInt(result.replace(/[^0-9]/g, ''))
        result = result.replace(number_position, number_position + 1)
      } else if (result.search('Defect data') !== -1) {
        result = Object.values(data)[0].message
        const number_position = parseInt(result.replace(/[^0-9]/g, ''))
        result = result.replace(number_position, number_position + 1)
      }
      return result
    }
  }
}
</script>
