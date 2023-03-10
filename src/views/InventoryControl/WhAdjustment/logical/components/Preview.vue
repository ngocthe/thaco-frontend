<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('msc_code_code')">
      <span>{{ form.name }}</span>
    </el-form-item>
    <el-form-item :label="$t('old_quantity')">
      <span>{{ form.interior_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('new_quantity')">
      <span>{{ form.vehicle_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('change')">
      <span>{{ form.ecn_in }}</span>
    </el-form-item>
    <el-form-item :label="$t('remark')">
      <span>{{ form.remark }}</span>
    </el-form-item>
    <hr>
    <el-form-item :label="$t('user_code')">
      <span>{{ form.user.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('user_name')">
      <span>{{ form.user.username }}</span>
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
