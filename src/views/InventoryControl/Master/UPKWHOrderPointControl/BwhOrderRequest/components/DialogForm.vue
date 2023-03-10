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
        :hidden-btn-edit="true"
        :loading="loading"
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
import { create, confirm } from '@/api/inventory/bwh_order_request'

import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create, confirm)],
  props: ['defects'],
  data() {
    return {
      errorDefaults: {
        order_number: null,
        contract_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        invoice_code: null,
        part_code: null,
        part_color_code: null,
        box_quantity: null,
        bonded_warehouse_code: null,
        warehouse_code: null,
        supplier_code: null,
        shelf_location_code: null,
        warehouse_location_code: null,
        defect_id: null,
        received_date: null,
        remark: null,
        plant_code: null
      }
    }
  }
}
</script>
