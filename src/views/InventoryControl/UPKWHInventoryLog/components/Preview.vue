<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('contract_no')">
      <span>{{ form.contract_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('invoice_no')">
      <span>{{ form.invoice_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('bl_no')">
      <span>{{ form.bill_of_lading_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('container_no')">
      <span>{{ form.container_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('case_no')">
      <span>{{ form.case_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('box_type_code')">
      <span>{{ form.box_type_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('quantity_of_box')">
      <span>{{ form.box_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('parts_quantity_in_box')">
      <span>{{ form.part_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('unit')">
      <span>{{ form.unit }}</span>
    </el-form-item>
    <el-form-item :label="$t('procurement_supplier_code')">
      <span>{{ form.supplier_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('date_case_received')">
      <span>{{ form.received_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('warehouse_code')">
      <span>{{ form.warehouse_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('shelf_location_code')">
      <span>{{ form.shelf_location_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('number_of_boxes_shipped_assembly_plant')">
      <span>{{ form.shipped_box_quantity }}</span>
    </el-form-item>
    <el-form-item :label="$t('date_box_shipped_assembly_plant')">
      <span>{{ form.shipped_date | formatDateTime }}</span>
    </el-form-item>
    <el-form-item :label="$t('plant_code')">
      <span>{{ form.plant_code }}</span>
    </el-form-item>
    <el-form-item :label="$t('defect_status')">
      <span>{{ fillDefect(form.defect_id) }}</span>
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
  props: ['form', 'formLabelWidth'],
  methods: {
    fillDefect(id) {
      switch (id) {
        case 'W': return 'Wrong'
          // eslint-disable-next-line no-unreachable
          break
        case 'D': return 'Damage'
          // eslint-disable-next-line no-unreachable
          break
        case 'S': return 'Shortage'
          // eslint-disable-next-line no-unreachable
          break
        case 'N': return 'No good'
          // eslint-disable-next-line no-unreachable
          break
        case 'X': return 'No good'
          // eslint-disable-next-line no-unreachable
          break
        default: return 'OK'
          // eslint-disable-next-line no-unreachable
          break
      }
    }
  }
}
</script>
