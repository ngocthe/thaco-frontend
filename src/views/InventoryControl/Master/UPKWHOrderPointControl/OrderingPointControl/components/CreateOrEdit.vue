<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- part_code -->
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('part_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteParts"
        @visible-change="remoteParts('')"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- part_color_code -->
    <el-form-item :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_color_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('part_color_code')"
        class="input-form"
        :loading="loading_search"
        :no-match-text="$t('no_data2')"
        remote
        reserve-keyword
        :remote-method="remotePartColors"
        @visible-change="remotePartColors('')"
      >
        <el-option
          v-for="item in options.partColors"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- standard_stock_part_box -->
    <el-form-item :label="$t('standard_stock_part_box')" prop="standard_stock" :error="errors.standard_stock" :label-width="formLabelWidth">
      <el-input v-model="form.standard_stock" :placeholder="$t('standard_stock_part_box')" class="input-form" />
    </el-form-item>
    <!-- ordering_lot_number_of_boxes -->
    <el-form-item :label="$t('ordering_lot_number_of_boxes')" prop="ordering_lot" :error="errors.ordering_lot" :label-width="formLabelWidth">
      <el-input v-model="form.ordering_lot" :placeholder="$t('ordering_lot_number_of_boxes')" class="input-form" />
    </el-form-item>
    <!-- box_type_code -->
    <el-form-item :label="$t('box_type_code')" prop="box_type_code" :error="errors.box_type_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.box_type_code"
        filterable
        clearable
        :placeholder="$t('box_type_code')"
        class="input-form"
        :loading="loading_search"
        :no-match-text="$t('no_data2')"
        remote
        reserve-keyword
        :remote-method="remoteBoxTypes"
        @visible-change="remoteBoxTypes('')"
      >
        <el-option
          v-for="item in options.boxTypes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
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
        :no-match-text="$t('no_data2')"
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
    <!-- remark -->
    <el-form-item :label="$t('remark')" prop="remark" :label-width="formLabelWidth">
      <el-input
        v-model="form.remark"
        class="input-form"
        type="textarea"
        :rows="3"
        :placeholder="$t('remark')"
      />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { validNumber, checkDecimal, validNumberZero } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        standard_stock: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('standard_stock_part_box') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_stock_part_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_stock_part_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_stock_part_box') }},
          { max: 3, message: this.$t(10062), trigger: 'blur', messageParams: { max: 999, attribute: this.$t('standard_stock_part_box') }}
        ],
        ordering_lot: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_lot_number_of_boxes') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_lot_number_of_boxes') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_lot_number_of_boxes') }},
          { max: 2, message: this.$t(10062), trigger: 'blur', messageParams: { max: 99, attribute: this.$t('ordering_lot_number_of_boxes') }}
        ],
        box_type_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }}
        ]
      }
    }
  },
  methods: {
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    remoteBoxTypes(query) {
      this.options.boxTypes = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'boxTypes', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    }
  }
}
</script>

