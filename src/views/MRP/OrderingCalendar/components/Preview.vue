<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <!-- contract_no -->
    <el-form-item :label="$t('contract_no')">
      <span>{{ form.contract_code }}</span>
    </el-form-item>
    <!-- part_group -->
    <el-form-item :label="$t('part_group')">
      <span>{{ form.part_group }}</span>
    </el-form-item>
    <!-- status -->
    <el-form-item :label="$t('status')">
      <span>{{ form.status | getStatusMRPOrderingCalendar }}</span>
    </el-form-item>
    <!-- etd -->
    <el-form-item :label="$t('etd')">
      <span>{{ form.etd | formatDateTime }}</span>
    </el-form-item>
    <!-- eta -->
    <el-form-item :label="$t('eta')">
      <span>{{ form.eta | formatDateTime }}</span>
    </el-form-item>
    <!-- target_plan_from -->
    <el-form-item :label="$t('target_plan_from')">
      <span>{{ form.target_plan_from }}</span>
    </el-form-item>
    <!-- target_plan_to -->
    <el-form-item :label="$t('target_plan_to')">
      <span>{{ form.target_plan_to }}</span>
    </el-form-item>
    <!-- order_span_from -->
    <el-form-item :label="$t('supplier_order_span_from')">
      <span>{{ form.order_span_from }}</span>
    </el-form-item>
    <!-- order_span_to -->
    <el-form-item :label="$t('supplier_order_span_to')">
      <span>{{ form.order_span_to }}</span>
    </el-form-item>
    <!-- mrp_run_at -->
    <el-form-item :label="$t('mrp_run_at')">
      <span>{{ form.mrp_or_run | formatDateTime }}</span>
    </el-form-item>
    <!-- buffer_span_from -->
    <el-form-item :label="$t('buffer_span_from')">
      <span>{{ form.buffer_span_from }}</span>
    </el-form-item>
    <!-- buffer_span_to -->
    <el-form-item :label="$t('buffer_span_to')">
      <span>{{ form.buffer_span_to }}</span>
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
