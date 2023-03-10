<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('order_status')">
      <span>{{ form.status | translateStatusOrder }}</span>
    </el-form-item>
    <el-form-item :label="$t('contract_no')">
      <span>{{ form.contract_code }}</span>
    </el-form-item>

    <el-form-item :label="$t('eta')">
      <span>{{ form.eta | formatDateTime('d/m/y') }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_group')">
      <span>{{ form.part_group }}</span>
    </el-form-item>
    <el-form-item :label="$t('minimum_order_quantity')">
      <span>{{ form.moq }}</span>
    </el-form-item>
    <el-form-item :label="$t('number_quantity_from_mrp')">
      <span>{{ form.mrp_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('actual_quantity')">
      <span>{{ form.actual_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('procurement_supplier_code')">
      <span>{{ form.supplier_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('plant_code')">
      <span>{{ form.plant_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('input_file_name')">
      <span>{{ form.input_file_name | translateInputFileOrder }}</span>
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth']
}
</script>

