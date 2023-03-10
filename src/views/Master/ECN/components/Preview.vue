<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('ecn_no')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_page_number')">
      <span>{{ form.page_number }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_line_number')">
      <span>{{ form.line_number }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_description')">
      <span>{{ form.description }}</span>
    </el-form-item>
    <el-form-item :label="$t('mandatory_level')">
      <span>{{ form.mandatory_level }}</span>
    </el-form-item>
    <el-form-item :label="$t('production_interchangeability')">
      <span>{{ form.production_interchangeability }}</span>
    </el-form-item>
    <el-form-item :label="$t('service_interchangeability')">
      <span>{{ form.service_interchangeability }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_released_party')">
      <span>{{ form.released_party }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_released_date')">
      <span>{{ form.released_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('planned_inspection_line_off_effective_date')">
      <span>{{ form.planned_line_off_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('actual_inspection_line_off_effective_date')">
      <span>{{ form.actual_line_off_date | formatDateTime('d/m/y') }}</span>
    </el-form-item>
    <el-form-item :label="$t('planned_packing_effective_date')">
      <span>{{ form.planned_packing_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('actual_packing_effective_date')">
      <span>{{ form.actual_packing_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('first_implementation_vin')">
      <span>{{ form.vin }}</span>
    </el-form-item>
    <el-form-item :label="$t('first_implementation_ckd_contract_no')">
      <span>{{ form.complete_knockdown }}</span>
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
