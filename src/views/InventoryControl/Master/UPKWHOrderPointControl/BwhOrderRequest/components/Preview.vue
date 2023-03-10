<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('order_number')">
      <span>{{ form.order_number }}</span>
    </el-form-item>
    <el-form-item :label="$t('contract_no')">
      <span>{{ form.contract_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('invoice_no')">
      <span>{{ form.invoice_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('bl_no')">
      <span>{{ form.bill_of_lading_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('case_no')">
      <span>{{ form.case_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('order_trigger_part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('quantity_of_box')">
      <span>{{ form.box_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('location_code')">
      <span>{{ form.warehouse_location_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('warehouse_code')">
      <span>{{ form.warehouse_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('plant_code')">
      <span>{{ form.plant_code }}</span>
    </el-form-item>
    <hr>
    <el-form-item :label="$t('user_code')">
      <span>{{ form.user | getUserCodeProfile }}</span>
    </el-form-item>
    <el-form-item :label="$t('user_name')">
      <span>{{ form.user | getUserNameProfile }}</span>
    </el-form-item>
    <el-form-item :label="$t('created_date_time')">
      <span>{{ form.created_at | formatDateTime('d/m/y h:i:s') }}</span>
    </el-form-item>
    <el-form-item :label="$t('data_updated_date_end_time')">
      <span>{{ form.updated_at | formatDateTime('d/m/y h:i:s') }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
import datetimeConvert from '@/mixins/crud/datetimeConvert'

export default {
  name: 'Preview',
  mixins: [datetimeConvert()],
  props: ['form', 'formLabelWidth']
}
</script>
