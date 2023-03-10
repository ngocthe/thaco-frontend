<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      v-loading="loading"
      :errors.sync="errors"
      :editing="editing"
      :loading_search="loading_search"
      :form.sync="form"
      :form-label-width="formLabelWidth"
      :options.sync="options"
      @handle-change-option="$emit('handle-change-search',$event)"
    />
    <Preview
      v-if="preview && showDialog"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :loading="loading"
        :hidden-btn-edit="isHiddenBtnEdit"
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
import { create, update } from '@/api/mrp/order-list'

import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'
import { statusOrder } from '@/utils/constant'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        status: null,
        contract_code: null,
        eta: null,
        part_code: null,
        part_color_code: null,
        part_group: null,
        actual_quantity: null,
        supplier_code: null,
        import_id: null,
        moq: null,
        mrp_quantity: null,
        plant_code: null,
        remark: null
      }
    }
  },
  computed: {
    isHiddenBtnEdit() {
      return (!this.isEdit) || Number(this.form.status) === statusOrder.DONE
    }
  }
}
</script>
