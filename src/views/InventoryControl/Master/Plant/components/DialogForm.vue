<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <CreateOrEdit
      v-if="!preview"
      ref="form_parent"
      :form.sync="form"
      :form-label-width="formLabelWidth"
      :options="options"
      :editing="editing"
      :errors.sync="errors"
    />
    <Preview
      v-else
      v-loading="loading"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <vue-element-loading :active="loading" spinner="bar-fade-scale" />
      <Action
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
import { create, update } from '@/api/master/plant'
import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'
import VueElementLoading from 'vue-element-loading'

export default {
  components: { CreateOrEdit, Action, Preview, VueElementLoading },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        code: null
      }
    }
  }
}
</script>
