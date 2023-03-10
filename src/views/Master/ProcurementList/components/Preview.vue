<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('minimum_order_quantity')">
      <span>{{ form.minimum_order_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('standard_number')">
      <span>{{ form.standard_box_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('parts_quantity_in_box')">
      <span>{{ form.part_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('unit')">
      <span>{{ form.unit }}</span>
    </el-form-item>
    <el-form-item :label="$t('procurement_supplier_code')">
      <span>{{ form.supplier_code }}</span>
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
import previewMixin from '@/mixins/crud/preview'

export default {
  name: 'Preview',
  mixins: [previewMixin()],
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth']
}
</script>

