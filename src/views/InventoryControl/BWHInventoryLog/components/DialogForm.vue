<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit" :destroy-on-close="true">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      v-loading="loading"
      :errors.sync="errors"
      :defects="defects"
      :editing="editing"
      :form.sync="form"
      :form-label-width="formLabelWidth"
      :options="options"
      :loading_search="loading_search"
      @handle-change-option="$emit('handle-change-search',$event)"
    />
    <Preview
      v-if="preview && showDialog"
      v-loading="loading"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :loading="loading"
        :hidden-btn-edit="!isEdit"
        :preview="preview"
        :editing="editing"
        @handle-close="closeDialog"
        @handle-close-preview="closePreview"
        @handle-show-edit="showEdit"
        @handle-submit-data="submitData"
      />
    </template>
  </el-dialog>
</template>
<script>
import { create, update } from '@/api/inventory/bwh_inventory_log'

import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'

export default {
  components: { CreateOrEdit, Action, Preview },
  props: ['defects'],
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        contract_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        invoice_code: null,
        part_code: null,
        part_color_code: null,
        box_type_code: null,
        box_quantity: null,
        part_quantity: null,
        unit: null,
        supplier_code: null,
        devanned_date: null,
        container_received: null,
        stored_date: null,
        warehouse_code: null,
        warehouse_location_code: null,
        location_code: null,
        shipped_date: null,
        plant_code: null
      }
    }
  }
}
</script>
