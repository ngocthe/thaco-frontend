<template>
  <el-dialog :destroy-on-close="true" :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      v-loading="loading"
      :errors.sync="errors"
      :editing="editing"
      :form.sync="form"
      :form-label-width="formLabelWidth"
      :options.sync="options"
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
import { create, update } from '@/api/master/vehicle_color'

import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        code: null,
        type: null,
        name: null,
        ecn_in: null,
        ecn_out: null,
        plant_code: null
      }
    }
  }
}
</script>
