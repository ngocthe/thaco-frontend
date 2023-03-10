<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('plant_code')" prop="code" :label-width="formLabelWidth" :error="errors.code">
      <el-input
        v-model="form.code"
        class="input-form"
        type="text"
        :placeholder="$t('plant_code')"
        :disabled="editing"
      />
    </el-form-item>
    <el-form-item :label="$t('plant_description')" prop="description" :label-width="formLabelWidth">
      <el-input
        v-model="form.description"
        class="input-form"
        type="text"
        :placeholder="$t('plant_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('plant_code') }},
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('plant_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('plant_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('plant_description') }},
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10, attribute: this.$t('plant_description') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.code': {
      handler: function() {
        if (this.form.code) {
          this.form.code = this.form.code.toUpperCase()
        }
      }
    }
  }
}
</script>

