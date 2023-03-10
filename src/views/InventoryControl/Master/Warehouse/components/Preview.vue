<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('warehouse_code')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('warehouse_description')">
      <span>{{ form.description }}</span>
    </el-form-item>
    <el-form-item :label="$t('wh_type')">
      <span>{{ keyToValue(form.warehouse_type, whType) }}</span>
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
import { keyToValue } from '@/utils/filter'
import { unit } from '@/utils/unit'

export default {
  name: 'Preview',
  mixins: [previewMixin(), keyToValue, unit],
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth'],
  created() {
    console.log(this.form)
  }
}
</script>

