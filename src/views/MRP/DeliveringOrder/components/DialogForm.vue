<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit">
    <Preview
      v-loading="loading"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :preview="preview"
        :hidden-btn-edit="true"
        @handle-close="closeDialog"
        @handle-close-preview="closePreview"
      />
    </template>
  </el-dialog>
</template>
<script>
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import dialogMixin from '@/mixins/crud/dialog'

export default {
  components: { Action, Preview },
  mixins: [dialogMixin(null, null)]
}
</script>
