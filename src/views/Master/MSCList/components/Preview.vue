<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('MSC')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('MSC_description')">
      <span>{{ form.description }}</span>
    </el-form-item>
    <el-form-item :label="$t('interior_color_description')">
      <span>{{ form.interior_color }}</span>
    </el-form-item>
    <el-form-item :label="$t('car_line')">
      <span>{{ form.car_line }}</span>
    </el-form-item>
    <el-form-item :label="$t('model_grade_name')">
      <span>{{ form.model_grade }}</span>
    </el-form-item>
    <el-form-item :label="$t('body_description')">
      <span>{{ form.body }}</span>
    </el-form-item>
    <el-form-item :label="$t('engine_description')">
      <span>{{ form.engine }}</span>
    </el-form-item>
    <el-form-item :label="$t('TM_description')">
      <span>{{ form.transmission }}</span>
    </el-form-item>
    <el-form-item :label="$t('plant_code')">
      <span>{{ form.plant_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('MSC_effective_date_in')">
      <span>{{ form.effective_date_in | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('MSC_effective_date_out')">
      <span>{{ form.effective_date_out | formatDateTime }}</span>
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

