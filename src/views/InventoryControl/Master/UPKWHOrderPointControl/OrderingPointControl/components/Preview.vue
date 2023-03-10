<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('standard_stock_part_box')">
      <span>{{ form.standard_stock }}</span>
    </el-form-item>
    <el-form-item :label="$t('ordering_lot_number_of_boxes')">
      <span>{{ form.ordering_lot }}</span>
    </el-form-item>
    <el-form-item :label="$t('box_type_code')">
      <span>{{ form.box_type_code }}</span>
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
