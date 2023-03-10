<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('msc')">
      <span>{{ form.msc_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('shop_code')">
      <span>{{ form.shop_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('quantity_per_unit')">
      <span>{{ form.quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_remarks')">
      <span>{{ form.part_remarks }}</span>
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
  name: 'Preview',
  mixins: [previewMixin()],
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth']
}
</script>

