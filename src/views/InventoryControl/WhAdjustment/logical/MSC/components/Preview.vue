<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('msc_code')">
      <span>{{ form.msc_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('exterior_color_code')">
      <span>{{ form.vehicle_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('adjustment_quantity')">
      <span>{{ form.adjustment_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('production_date')">
      <span>{{ form.production_date | formatDateTime('d/m/y') }}</span>
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
