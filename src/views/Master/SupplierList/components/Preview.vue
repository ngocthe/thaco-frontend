<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('procurement_supplier_code')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('procurement_supplier_code_description')">
      <span>{{ form.description }}</span>
    </el-form-item>
    <el-form-item :label="$t('address_procurement_supplier')">
      <span>{{ form.address }}</span>
    </el-form-item>
    <el-form-item :label="$t('phone_no_procurement_supplier')">
      <span>{{ form.phone }}</span>
    </el-form-item>
    <el-form-item :label="$t('number_of_forecast_by_week')">
      <span>{{ form.forecast_by_week }}</span>
    </el-form-item>
    <el-form-item :label="$t('number_of_forecast_by_month')">
      <span>{{ form.forecast_by_month }}</span>
    </el-form-item>
    <el-form-item :label="$t('receiver')">
      <el-tag v-for="item in form.receiver" :key="item" class="pr-tag">{{ item }}</el-tag>
    </el-form-item>
    <el-form-item :label="$t('bcc')">
      <el-tag v-for="item in form.bcc" :key="item" class="pr-tag">{{ item }}</el-tag>
    </el-form-item>
    <el-form-item :label="$t('cc')">
      <el-tag v-for="item in form.cc" :key="item" class="pr-tag">{{ item }}</el-tag>
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

