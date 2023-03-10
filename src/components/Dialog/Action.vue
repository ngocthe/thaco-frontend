<template>
  <div>
    <span v-if="!preview" class="dialog-footer">
      <el-button :disabled="loading" size="large" @click="$emit('handle-close')">{{ $t('cancel') }}</el-button>
      <el-button
        :disabled="loading"
        size="large"
        type="primary"
        @click="$emit('handle-submit-data')"
      >{{ editing ? $t('save') : $t('add') }}</el-button>
    </span>
    <span v-else class="dialog-footer">
      <el-button :disabled="loading" size="large" @click="$emit('handle-close-preview')">{{ $t('close') }}</el-button>
      <el-button
        v-show="!hiddenBtnEdit"
        :disabled="loading"
        size="large"
        type="primary"
        @click="$emit('handle-show-edit')"
      >{{ $t('edit') }}</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'Action',
  // eslint-disable-next-line vue/require-prop-types
  props: ['preview', 'editing', 'loading', 'hiddenBtnEdit']
}
</script>
