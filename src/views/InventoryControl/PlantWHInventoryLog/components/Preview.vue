<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <!-- part_no -->
    <el-form-item :label="$t('part_no')">
      <span>{{ form.part_code }}</span>
    </el-form-item>
    <!-- part_color_code -->
    <el-form-item :label="$t('part_color_code')">
      <span>{{ form.part_color_code }}</span>
    </el-form-item>
    <!-- box_type_code -->
    <el-form-item :label="$t('box_type_code')">
      <span>{{ form.box_type_code }}</span>
    </el-form-item>
    <!-- date_received_at_assembly_plant -->
    <el-form-item :label="$t('date_received_at_assembly_plant')">
      <span>{{ form.received_date | formatDateTime }}</span>
    </el-form-item>
    <!-- number_of_boxes_received_UPKWH -->
    <el-form-item :label="$t('number_of_boxes_received_UPKWH')">
      <span>{{ form.received_box_quantity }}</span>
    </el-form-item>
    <!-- part_quantity_in_box -->
    <el-form-item :label="$t('parts_quantity')">
      <span>{{ form.quantity }}</span>
    </el-form-item>
    <!-- unit -->
    <el-form-item :label="$t('unit')">
      <span>{{ form.unit }}</span>
    </el-form-item>
    <!-- warehouse_code -->
    <el-form-item :label="$t('warehouse_code')">
      <span>{{ form.warehouse_code }}</span>
    </el-form-item>
    <!-- plant_code -->
    <el-form-item :label="$t('plant_code')">
      <span>{{ form.plant_code }}</span>
    </el-form-item>
    <!-- plant_code -->
    <el-form-item :label="$t('defect_status')">
      <span>{{ fillDefectTwoCase(form.defect_id) }}</span>
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
    fillDefectTwoCase(id) {
      if (id === null || id === '') {
        return 'OK'
      } else {
        return 'Has Defect'
      }
    },
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
