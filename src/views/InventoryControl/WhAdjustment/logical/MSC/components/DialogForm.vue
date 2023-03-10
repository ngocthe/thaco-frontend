<template>
  <el-dialog :destroy-on-close="true" :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      :form.sync="form"
      :editing="editing"
      :errors.sync="errors"
      :form-label-width="formLabelWidth"
      :options="options"
      :loading_search="loading_search"
      @handle-change-option="$emit('handle-change-search',$event)"
    />
    <Preview
      v-else
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :hidden-btn-edit="true"
        :preview="preview"
        :editing="editing"
        :loading="loading"
        @handle-close="closeDialog"
        @handle-close-preview="closePreview"
        @handle-show-edit="showEdit"
        @handle-submit-data="submitData"
      />
    </template>
  </el-dialog>
</template>
<script>
import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'
import { create } from '@/api/inventory/wh_adjustment_msc'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create)],
  data() {
    return {
      errorDefaults: {
        msc_code: null,
        vehicle_color_code: null,
        adjustment_quantity: null,
        production_date: null,
        plant_code: null,
        remark: null
      }
    }
  }
}
</script>
