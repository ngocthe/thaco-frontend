<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('part_no')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_group')">
      <span>{{ form.group }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_name')">
      <span>{{ form.name }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in')">
      <span>{{ form.ecn_in }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in_date')">
      <span>{{ form.ecn_in_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_out')">
      <span>{{ form.ecn_out }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_out_date')">
      <span>{{ form.ecn_out_date | formatDateTime }}</span>
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth']
}
</script>
