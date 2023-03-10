<template>
  <el-form :label-width="formLabelWidth" class="preview">
    <el-form-item :label="$t('user_code')">
      <span>{{ form.code }}</span>
    </el-form-item>
    <el-form-item :label="$t('user_name')">
      <span>{{ form.name }}</span>
    </el-form-item>
    <el-form-item :label="$t('company')">
      <span>{{ form.company }}</span>
    </el-form-item>
    <el-form-item :label="$t('role_name')">
      <span v-for="(item, index) in form.role" :key="item">
        {{ item + `${index != form.role.length - 1 ? ', ' : ''}` }}
      </span>
    </el-form-item>
    <el-form-item :label="$t('password')">
      <span>***********</span>
    </el-form-item>
    <hr>
    <el-form-item :label="$t('user_code')">
      <span>{{ form.user ? form.user.code : 'admin' }}</span>
    </el-form-item>
    <el-form-item :label="$t('user_name')">
      <span>{{ form.user ? form.user.username : 'Admin' }}</span>
    </el-form-item>
    <el-form-item :label="$t('created_date_time')">
      <span>{{ form.created_at | formatDateTime('d/m/y h:i:s') }}</span>
    </el-form-item>
    <el-form-item :label="$t('data_updated_date_end_time')">
      <span>{{ form.updated_at | formatDateTime('d/m/y h:i:s') }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
import previewMixin from '@/mixins/crud/preview'
export default {
  mixins: [previewMixin()],
  // eslint-disable-next-line vue/order-in-components
  name: 'Preview',
  // eslint-disable-next-line vue/require-prop-types
  props: ['form', 'formLabelWidth'],
  mounted() {
  }
}
</script>

