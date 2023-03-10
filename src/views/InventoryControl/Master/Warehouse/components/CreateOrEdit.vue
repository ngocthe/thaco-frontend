<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('warehouse_code')" prop="code" :label-width="formLabelWidth" :error="errors.code">
      <el-input
        v-model="form.code"
        class="input-form"
        type="text"
        :placeholder="$t('warehouse_code')"
        :disabled="editing"
      />
    </el-form-item>
    <el-form-item :label="$t('warehouse_description')" prop="description" :label-width="formLabelWidth">
      <el-input
        v-model="form.description"
        class="input-form"
        type="text"
        :placeholder="$t('warehouse_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('wh_type')" prop="warehouse_type" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_type"
        clearable
        filterable
        :disabled="editing"
        :placeholder="$t('wh_type')"
        :no-match-text="$t('no_data2')"
        class="input-form"
      >
        <el-option
          v-for="(value, key) in whType"
          :key="key"
          :label="value"
          :value="key"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('plant_code')" prop="plant_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.plant_code"
        remote
        reserve-keyword
        clearable
        filterable
        :disabled="editing"
        :placeholder="$t('plant_code')"
        class="input-form"
        :remote-method="remotePlant"
        @visible-change="remotePlant('')"
      >
        <el-option
          v-for="item in options.plants"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe } from '@/utils/validate'
import { unit } from '@/utils/unit'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('warehouse_code') }},
          { max: 8, message: this.$t(10063), trigger: 'blur', messageParams: { max: 8, attribute: this.$t('warehouse_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('warehouse_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('warehouse_description') }},
          { max: 30, message: this.$t(10063), trigger: 'blur', messageParams: { max: 30, attribute: this.$t('warehouse_description') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        warehouse_type: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
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
  },
  methods: {
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>

