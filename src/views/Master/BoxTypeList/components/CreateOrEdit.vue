<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code">
      <el-select
        v-model="form.part_code"
        :disabled="editing"
        :loading="loading_search"
        class="input-form"
        clearable
        remote
        reserve-keyword
        filterable
        :remote-method="remotePartCode"
        :placeholder="$t('part_no')"
        style="width: 100%"
        @visible-change="remotePartCode('')"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('box_type_code')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('box_type_code')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('box_type_description')" prop="description" :error="errors.description">
      <el-input v-model="form.description" :placeholder="$t('box_type_description')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('box_weight_gram')" prop="weight" :error="errors.weight">
      <el-input v-model="form.weight" :controls="false" :placeholder="$t('box_weight_gram')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('size_box_x_mm')" prop="width" :error="errors.width">
      <el-input v-model="form.width" :controls="false" :placeholder="$t('size_box_x_mm')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('size_box_y_mm')" prop="height" :error="errors.height">
      <el-input v-model="form.height" :controls="false" :placeholder="$t('size_box_y_mm')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('size_box_z_mm')" prop="depth" :error="errors.depth">
      <el-input v-model="form.depth" :controls="false" :placeholder="$t('size_box_z_mm')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('part_quantity_in_box')" prop="quantity" :error="errors.quantity">
      <el-input v-model="form.quantity" :controls="false" :placeholder="$t('part_quantity_in_box')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('unit')" prop="unit" :error="errors.unit">
      <el-select
        v-model="form.unit"
        filterable
        clearable
        :placeholder="$t('unit')"
        :no-match-text="$t('no_data2')"
        class="input-form"
      >
        <el-option
          v-for="item in unit"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
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
        :remote-method="remotePlant"
        :placeholder="$t('plant_code')"
        style="width: 100%"
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
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark">
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
import { unit } from '@/utils/unit'
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe, checkDecimal, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('box_type_code') }},
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('box_type_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_no') }},
          { whitespace: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_no') }}
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('box_type_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('box_type_description') }},
          { max: 20, message: this.$t(10063), trigger: 'blur', messageParams: { max: 20, attribute: this.$t('box_type_description') }}
        ],
        weight: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('box_weight_gram') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('box_weight_gram') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('box_weight_gram') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('box_weight_gram') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('box_weight_gram') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('box_weight_gram') }}
        ],
        width: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('size_box_x_mm') }},
          { whitespace: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('size_box_x_mm') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_x_mm') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_x_mm') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_x_mm') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('size_box_x_mm') }}
        ],
        height: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('size_box_y_mm') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('size_box_y_mm') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_y_mm') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_y_mm') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_y_mm') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('size_box_y_mm') }}
        ],
        depth: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('size_box_z_mm') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('size_box_z_mm') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_z_mm') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_z_mm') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('size_box_z_mm') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('size_box_z_mm') }}
        ],
        quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('part_quantity_in_box') }}
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { whitespace: true, message: this.$t(10080), trigger: 'change' }

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
    remotePartCode(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    remoteBoxType(query) {
      this.options.boxTypes = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'boxTypes', params: { code: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>
