<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- code -->
    <el-form-item :label="$t('ecn_no')" prop="code" :error="errors.code" :label-width="formLabelWidth">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('ecn_no')" class="input-form" />
    </el-form-item>
    <!-- page_number -->
    <el-form-item :label="$t('ecn_page_number')" prop="page_number" :error="errors.page_number" :label-width="formLabelWidth">
      <el-input v-model="form.page_number" :placeholder="$t('ecn_page_number')" class="input-form" />
    </el-form-item>
    <!-- line_number -->
    <el-form-item :label="$t('ecn_line_number')" prop="line_number" :error="errors.line_number" :label-width="formLabelWidth">
      <el-input v-model="form.line_number" :placeholder="$t('ecn_line_number')" class="input-form" />
    </el-form-item>
    <!-- description -->
    <el-form-item :label="$t('ecn_description')" prop="description" :error="errors.description" :label-width="formLabelWidth">
      <el-input v-model="form.description" :placeholder="$t('ecn_description')" class="input-form" />
    </el-form-item>
    <!-- mandatory_level -->
    <!-- <el-form-item :label="$t('mandatory_level')" prop="mandatory_level" :error="errors.mandatory_level" :label-width="formLabelWidth">
      <el-input v-model="form.mandatory_level" :placeholder="$t('mandatory_level')" class="input-form" />
    </el-form-item> -->
    <el-form-item :label="$t('mandatory_level')" prop="mandatory_level" :error="errors.mandatory_level" :label-width="formLabelWidth">
      <el-select
        v-model="form.mandatory_level"
        clearable
        :placeholder="$t('mandatory_level')"
        class="input-form"
      >
        <el-option
          v-for="(value, key) in mandatoryLevel"
          :key="key"
          :label="value"
          :value="key"
        />
      </el-select>
    </el-form-item>
    <!-- production_interchangeability -->
    <el-form-item :label="$t('production_interchangeability')" prop="production_interchangeability" :error="errors.production_interchangeability" :label-width="formLabelWidth">
      <el-input v-model="form.production_interchangeability" :placeholder="$t('production_interchangeability')" class="input-form" />
    </el-form-item>
    <!-- service_interchangeability -->
    <el-form-item :label="$t('service_interchangeability')" prop="service_interchangeability" :error="errors.service_interchangeability" :label-width="formLabelWidth">
      <el-input v-model="form.service_interchangeability" :placeholder="$t('service_interchangeability')" class="input-form" />
    </el-form-item>
    <!-- ecn_released_party -->
    <el-form-item :label="$t('ecn_released_party')" prop="released_party" :error="errors.released_party" :label-width="formLabelWidth">
      <el-input v-model="form.released_party" :placeholder="$t('ecn_released_party')" class="input-form" />
    </el-form-item>
    <!-- released_date -->
    <el-form-item :label="$t('ecn_released_date')" prop="released_date" :error="errors.released_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.released_date"
        class="input-form"
        type="date"
        :placeholder="$t('ecn_released_date')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
      />
    </el-form-item>
    <!-- planned_line_off_date -->
    <el-form-item :label="$t('planned_inspection_line_off_effective_date')" prop="planned_line_off_date" :error="errors.planned_line_off_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.planned_line_off_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('planned_inspection_line_off_effective_date')"
        style="width: 100%"
      />
    </el-form-item>
    <!-- actual_line_off_date -->
    <el-form-item :label="$t('actual_inspection_line_off_effective_date')" prop="actual_line_off_date" :error="errors.actual_line_off_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.actual_line_off_date"
        class="input-form"
        type="date"
        :placeholder="$t('actual_inspection_line_off_effective_date')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
      />
    </el-form-item>
    <!-- planned_packing_date -->
    <el-form-item :label="$t('planned_packing_effective_date')" prop="planned_packing_date" :error="errors.planned_packing_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.planned_packing_date"
        class="input-form"
        type="date"
        :placeholder="$t('planned_packing_effective_date')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
      />
    </el-form-item>
    <!-- actual_packing_date -->
    <el-form-item :label="$t('actual_packing_effective_date')" prop="actual_packing_date" :error="errors.actual_packing_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.actual_packing_date"
        class="input-form"
        type="date"
        :placeholder="$t('actual_packing_effective_date')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
      />
    </el-form-item>
    <!-- vin -->
    <el-form-item :label="$t('first_implementation_vin')" prop="vin" :error="errors.vin" :label-width="formLabelWidth">
      <el-input v-model="form.vin" :placeholder="$t('first_implementation_vin')" class="input-form" />
    </el-form-item>
    <!-- complete_knockdown -->
    <el-form-item :label="$t('first_implementation_ckd_contract_no')" prop="complete_knockdown" :error="errors.complete_knockdown" :label-width="formLabelWidth">
      <el-input v-model="form.complete_knockdown" :placeholder="$t('first_implementation_ckd_contract_no')" class="input-form" />
    </el-form-item>
    <!-- plant_code -->
    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.plant_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('plant_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePlants"
        @visible-change="remotePlants('')"
      >
        <el-option
          v-for="item in options.plants"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('remark')" prop="remark" :label-width="formLabelWidth">
      <el-input
        v-model="form.remark"
        class="input-form"
        type="textarea"
        :autosize="{ minRows: 3}"
        :placeholder="$t('remark')"
      />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe, startEndCharacter, checkDecimal, validNumberZero, validNumber } from '@/utils/validate'
import { unit } from '@/utils/unit'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_no') }},
          { min: 7, message: this.$t(10069), trigger: 'blur', messageParams: { min: 7, attribute: this.$t('ecn_no') }},
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10, attribute: this.$t('ecn_no') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        page_number: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_page_number') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_page_number') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_page_number') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_page_number') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_page_number') }},
          { max: 3, message: this.$t(10062), trigger: 'blur', messageParams: { max: 999, attribute: this.$t('ecn_page_number') }}
        ],
        line_number: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_line_number') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_line_number') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_line_number') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_line_number') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ecn_line_number') }},
          { max: 3, message: this.$t(10062), trigger: 'blur', messageParams: { max: 999, attribute: this.$t('ecn_line_number') }}
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ecn_description') }},
          { max: 30, message: this.$t(10063), trigger: 'blur', messageParams: { max: 30, attribute: this.$t('ecn_description') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        mandatory_level: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('mandatory_level') }},
          { max: 1, message: this.$t(10063), trigger: 'change', messageParams: { max: 1, attribute: this.$t('mandatory_level') }},
          { validator: checkTrimValue, trigger: 'change' }
        ],
        production_interchangeability: [
          { max: 1, message: this.$t(10063), trigger: 'blur', messageParams: { max: 1 }},
          { validator: alphaBe, trigger: 'blur' },
          { validator: startEndCharacter, trigger: 'blur' }
        ],
        service_interchangeability: [
          { max: 1, message: this.$t(10063), trigger: 'blur', messageParams: { max: 1 }},
          { validator: alphaBe, trigger: 'blur' },
          { validator: startEndCharacter, trigger: 'blur' }
        ],
        released_party: [
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('ecn_released_party') }},
          { validator: alphaBe, trigger: 'blur' },
          { validator: startEndCharacter, trigger: 'blur' }
        ],
        released_date: [
          // { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        planned_line_off_date: [
          // { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        actual_line_off_date: [
          // { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        planned_packing_date: [
          // { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        actual_packing_date: [
          // { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        vin: [
          { max: 17, message: this.$t(10063), trigger: 'blur', messageParams: { max: 17, attribute: this.$t('first_implementation_vin') }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' },
          { validator: startEndCharacter, trigger: 'blur' }
        ],
        complete_knockdown: [
          { max: 13, message: this.$t(10063), trigger: 'blur', messageParams: { max: 13, attribute: this.$t('first_implementation_ckd_contract_no') }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' },
          { validator: startEndCharacter, trigger: 'blur' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('plant_code') }},
          { max: 5, message: this.$t('max_length') + '5 ' + this.$t('characters'), trigger: 'change' }
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
    },
    'form.released_party': {
      handler: function() {
        if (this.form.released_party) {
          this.form.released_party = this.form.released_party.toUpperCase()
        }
      }
    },
    'form.vin': {
      handler: function() {
        if (this.form.vin) {
          this.form.vin = this.form.vin.toUpperCase()
        }
      }
    },
    'form.complete_knockdown': {
      handler: function() {
        if (this.form.complete_knockdown) {
          this.form.complete_knockdown = this.form.complete_knockdown.toUpperCase()
        }
      }
    }
  },
  methods: {
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>
