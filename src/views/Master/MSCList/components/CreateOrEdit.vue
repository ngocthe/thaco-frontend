<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('MSC')" prop="code" :label-width="formLabelWidth" :error="errors.code">
      <el-input
        v-model="form.code"
        class="input-form"
        type="text"
        :placeholder="$t('MSC')"
        :disabled="editing"
      />
    </el-form-item>
    <el-form-item :label="$t('MSC_description')" prop="description" :error="errors.description">
      <el-input
        v-model="form.description"
        class="input-form"
        type="text"
        :placeholder="$t('MSC_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('interior_color_description')" prop="interior_color" :error="errors.interior_color">
      <el-input
        v-model="form.interior_color"
        class="input-form"
        type="text"
        :placeholder="$t('interior_color_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('car_line')" prop="car_line" :error="errors.car_line">
      <el-input
        v-model="form.car_line"
        class="input-form"
        type="text"
        :placeholder="$t('car_line')"
      />
    </el-form-item>
    <el-form-item :label="$t('model_grade_name')" prop="model_grade" :error="errors.model_grade">
      <el-input
        v-model="form.model_grade"
        class="input-form"
        type="text"
        :placeholder="$t('model_grade_name')"
      />
    </el-form-item>
    <el-form-item :label="$t('body_description')" prop="body" :error="errors.body">
      <el-input
        v-model="form.body"
        class="input-form"
        type="text"
        :placeholder="$t('body_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('engine_description')" prop="engine" :error="errors.engine">
      <el-input
        v-model="form.engine"
        class="input-form"
        type="text"
        :placeholder="$t('engine_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('TM_description')" prop="transmission" :error="errors.transmission">
      <el-input
        v-model="form.transmission"
        class="input-form"
        type="text"
        :placeholder="$t('TM_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code">
      <el-select
        v-model="form.plant_code"
        class="input-form"
        clearable
        :disabled="editing"
        remote
        :loading="loading_search"
        reserve-keyword
        filterable
        :placeholder="$t('plant_code')"
        style="width: 100%"
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
    <el-form-item :label="$t('MSC_effective_date_in')" prop="effective_date_in" :error="errors.effective_date_in">
      <el-date-picker
        v-model="form.effective_date_in"
        class="input-form"
        type="date"
        style="width: 100%"
        :placeholder="$t('MSC_effective_date_in')"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item :label="$t('MSC_effective_date_out')" prop="effective_date_out" :error="errors.effective_date_out">
      <el-date-picker
        v-model="form.effective_date_out"
        class="input-form"
        type="date"
        style="width: 100%"
        :placeholder="$t('MSC_effective_date_out')"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
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
    var checkMSCDateOut = (rule, value, callback) => {
      if (this.form.effective_date_in && this.form.effective_date_in >= this.form.effective_date_out) {
        callback(new Error(this.$t('msc_date_out_come_after_date_in')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('MSC') }},
          { max: 7, message: this.$t(10063), trigger: 'blur', messageParams: { max: 7, attribute: this.$t('MSC') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('MSC_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('MSC_description') }},
          { max: 40, message: this.$t(10063), trigger: 'blur', messageParams: { max: 40, attribute: this.$t('MSC_description') }}
        ],
        interior_color: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('interior_color_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('interior_color_description') }},
          { max: 15, message: this.$t(10063), trigger: 'blur', messageParams: { max: 15, attribute: this.$t('interior_color_description') }}
        ],
        car_line: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('car_line') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('car_line') }},
          { max: 6, message: this.$t(10063), trigger: 'blur', messageParams: { max: 6, attribute: this.$t('car_line') }}
        ],
        model_grade: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('model_grade_name') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('model_grade_name') }},
          { max: 40, message: this.$t(10063), trigger: 'blur', messageParams: { max: 40, attribute: this.$t('model_grade_name') }}
        ],
        body: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('body_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('body_description') }},
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('body_description') }}
        ],
        engine: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('engine_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('engine_description') }},
          { max: 6, message: this.$t(10063), trigger: 'blur', messageParams: { max: 6, attribute: this.$t('engine_description') }}
        ],
        transmission: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('TM_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('TM_description') }},
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('TM_description') }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('plant_code') }},
          { max: 5, message: this.$t(10063), trigger: 'change', messageParams: { max: 5, attribute: this.$t('plant_code') }}
        ],
        effective_date_out: [
          { validator: checkMSCDateOut, trigger: 'blur' }
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
        this.form.code = this.form.code.toUpperCase()
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
<style lang="scss" scoped>
@media(max-width: 940px) {
  .el-date-editor.input-form{
    width: 100% !important;
  }
}
</style>
