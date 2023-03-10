<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <Preview
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :hidden-btn-edit="true"
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
import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import { create, update } from '@/api/master/part_color'

export default {
  components: { Action, Preview },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        code: null,
        part_code: null,
        name: null,
        vehicle_color_code: null,
        interior_code: null,
        ecn_in: null,
        ecn_out: null,
        plant_code: null
      }
    }
  }
}
</script>
