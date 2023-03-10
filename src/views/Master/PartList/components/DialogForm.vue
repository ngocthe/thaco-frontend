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
      v-if="preview && showDialog"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :preview="preview"
        :editing="editing"
        :loading="loading"
        :hidden-btn-edit="!isEdit"
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
import CreateOrEdit from '@/views/Master/PartList/components/CreateOrEdit'
import { create, update } from '@/api/master/part'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        code: null,
        group: null,
        name: null,
        plant_code: null,
        ecn_in: null,
        ecn_out: null
      }
    }
  }
}
</script>
