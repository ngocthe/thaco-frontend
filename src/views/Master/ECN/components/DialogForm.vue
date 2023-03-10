<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit" :destroy-on-close="true">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      v-loading="loading"
      :errors.sync="errors"
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
import { create, update } from '@/api/master/ecn'

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
        page_number: null,
        line_number: null,
        description: null,
        mandatory_level: null,
        production_interchangeability: null,
        service_interchangeability: null,
        released_party: null,
        released_date: null,
        planned_line_off_date: null,
        actual_line_off_date: null,
        planned_packing_date: null,
        actual_packing_date: null,
        vin: null,
        complete_knockdown: null,
        plant_code: null
      }
    }
  }
}
</script>
