<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('vehicle_color_code')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('vehicle_color_type')">
      <span>{{ form.type }}</span>
    </el-form-item>
    <el-form-item :label="$t('vehicle_color_name')">
      <span>{{ form.name }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in')">
      <span>{{ form.ecn_in }}</span>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_out')">
      <span>{{ form.ecn_out }}</span>
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
  mixins: [previewMixin()],
  // eslint-disable-next-line vue/order-in-components
  name: 'Preview',
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth']
}
</script>

