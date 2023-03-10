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
    <el-form-item :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code">
      <el-select
        v-model="form.part_color_code"
        class="input-form"
        :disabled="editing"
        :loading="loading_search"
        clearable
        remote
        reserve-keyword
        filterable
        :remote-method="remotePartColor"
        :placeholder="$t('part_color_code')"
        style="width: 100%"
        @visible-change="remotePartColor('')"
      >
        <el-option
          v-for="item in options.partColors"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('minimum_order_quantity')" prop="minimum_order_quantity" :error="errors.minimum_order_quantity">
      <el-input v-model="form.minimum_order_quantity" :controls="false" :placeholder="$t('minimum_order_quantity')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('standard_number')" prop="standard_box_quantity" :error="errors.standard_box_quantity">
      <el-input v-model="form.standard_box_quantity" :controls="false" :placeholder="$t('standard_number')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('parts_quantity_in_box')" prop="part_quantity" :error="errors.part_quantity">
      <el-input v-model="form.part_quantity" :controls="false" :placeholder="$t('parts_quantity_in_box')" class="input-form" />
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
    <el-form-item :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code">
      <el-select
        v-model="form.supplier_code"
        class="input-form"
        clearable
        remote
        :loading="loading_search"
        :disabled="editing"
        reserve-keyword
        filterable
        :remote-method="remoteSupplier"
        :placeholder="$t('procurement_supplier_code')"
        style="width: 100%"
        @visible-change="remoteSupplier('')"
      >
        <el-option
          v-for="item in options.suppliers"
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
import { checkTrimValue, checkDecimal, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    return {
      rules: {
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_no') }}
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_color_code') }}
        ],
        minimum_order_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('minimum_order_quantity') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('minimum_order_quantity') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('minimum_order_quantity') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('minimum_order_quantity') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('minimum_order_quantity') }},
          { max: 5, message: this.$t(10062), trigger: 'blur', messageParams: { max: 99999, attribute: this.$t('minimum_order_quantity') }}
        ],
        standard_box_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { max: 99999, attribute: this.$t('standard_number') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { max: 99999, attribute: this.$t('standard_number') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_number') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_number') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('standard_number') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('standard_number') }}
        ],
        part_quantity: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 99999, attribute: this.$t('parts_quantity_in_box') }},
          { whitespace: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 99999, attribute: this.$t('parts_quantity_in_box') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity_in_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity_in_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity_in_box') }},
          { max: 4, message: this.$t(10062), trigger: 'change', messageParams: { max: 9999, attribute: this.$t('parts_quantity_in_box') }}
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 99999, attribute: this.$t('unit') }}
        ],
        supplier_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 99999, attribute: this.$t('procurement_supplier_code') }}
        ],
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 99999, attribute: this.$t('plant_code') }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
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
    remotePartColor(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    remoteSupplier(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'suppliers', params: { code: query }})
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
