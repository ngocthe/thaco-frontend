<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- contract_code -->
    <el-form-item :label="$t('contract_no')" prop="contract_code" :error="errors.contract_code" :label-width="formLabelWidth">
      <el-input v-model="form.contract_code" :placeholder="$t('contract_no')" :disabled="editing" clearable class="input-form" />
    </el-form-item>
    <!-- invoice_no -->
    <el-form-item :label="$t('invoice_no')" prop="invoice_code" :error="errors.invoice_code" :label-width="formLabelWidth">
      <el-input v-model="form.invoice_code" :placeholder="$t('invoice_no')" :disabled="editing" clearable class="input-form" />
    </el-form-item>
    <!-- bl_no -->
    <el-form-item :label="$t('bl_no')" prop="bill_of_lading_code" :error="errors.bill_of_lading_code" :label-width="formLabelWidth">
      <el-input v-model="form.bill_of_lading_code" :placeholder="$t('bl_no')" :disabled="editing" clearable class="input-form" />
    </el-form-item>
    <!-- container_no -->
    <el-form-item :label="$t('container_no')" prop="container_code" :error="errors.container_code" :label-width="formLabelWidth">
      <el-input v-model="form.container_code" :placeholder="$t('container_no')" :disabled="editing" clearable class="input-form" />
    </el-form-item>
    <!-- case_no -->
    <el-form-item :label="$t('case_no')" prop="case_code" :error="errors.case_code" :label-width="formLabelWidth">
      <el-input v-model="form.case_code" :placeholder="$t('case_no')" :disabled="editing" clearable class="input-form" />
    </el-form-item>
    <!-- part_no -->
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
    <!-- box_type_code -->
    <el-form-item :label="$t('box_type_code')" prop="box_type_code" :error="errors.box_type_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.box_type_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('box_type_code')"
        class="input-form"
        :loading="loading_search"
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
    <!-- quantity_of_box -->
    <el-form-item :label="$t('quantity_of_box')" prop="box_quantity" :error="errors.box_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.box_quantity" :placeholder="$t('quantity_of_box')" class="input-form" />
    </el-form-item>
    <!-- part_quantity_in_box -->
    <el-form-item v-if="editing" :label="$t('part_quantity_in_box')" prop="part_quantity" :error="errors.part_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.part_quantity" :placeholder="$t('part_quantity_in_box')" class="input-form" />
    </el-form-item>
    <!-- unit -->
    <el-form-item v-if="editing" :label="$t('unit')" prop="unit" :error="errors.unit" :label-width="formLabelWidth">
      <el-select
        v-model="form.unit"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('unit')"
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
    <!-- procurement_supplier_code -->
    <el-form-item :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.supplier_code"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('procurement_supplier_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteSuppliers"
        @visible-change="remoteSuppliers('')"
      >
        <el-option
          v-for="item in options.suppliers"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- etd -->
    <el-form-item :label="$t('etd')" prop="etd" :error="errors.etd" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.etd"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('etd')"
        style="width: 100%"
      />
    </el-form-item>
    <!-- date_container_shipped -->
    <el-form-item :label="$t('date_container_shipped')" prop="container_shipped" :error="errors.container_shipped" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.container_shipped"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_container_shipped')"
        style="width: 100%"
      />
    </el-form-item>
    <!-- eta -->
    <el-form-item :label="$t('eta')" prop="eta" :error="errors.eta" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.eta"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('eta')"
        style="width: 100%"
      />
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
        :rows="3"
        :placeholder="$t('remark')"
      />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { unit } from '@/utils/unit'
import { checkTrimValue, alphaBe, validNumber, validNumberZero, checkDecimal } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    var checkBiggerThanETD = (rule, value, callback) => {
      if (value) {
        const etdDate = (new Date(this.form.etd)).getTime()
        const etaDate = (new Date(value)).getTime()
        if (etaDate >= etdDate) {
          callback()
        } else {
          callback(new Error(this.$t('field_than_or_equal') + ' ' + this.$t('etd')))
        }
      } else {
        callback()
      }
    }
    return {
      rules: {
        case_code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('case_no') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('case_no') }},
          { max: 2, message: this.$t(10063), trigger: 'blur', messageParams: { max: 2, attribute: this.$t('case_no') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        bill_of_lading_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { max: 13, message: this.$t(10063), trigger: 'blur', messageParams: { max: 13 }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' }
        ],
        container_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { max: 11, message: this.$t(10063), trigger: 'blur', messageParams: { max: 11 }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' }
        ],
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { max: 9, message: this.$t(10063), trigger: 'blur', messageParams: { max: 9 }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' }
        ],
        invoice_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10 }},
          { validator: checkTrimValue, trigger: 'blur' },
          { validator: alphaBe, trigger: 'blur' }
        ],
        box_type_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        supplier_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        etd: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        eta: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: checkBiggerThanETD, trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        container_shipped: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('part_quantity_in_box') }}
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        box_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('quantity_of_box') }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.case_code': {
      handler: function() {
        if (this.form.case_code) {
          this.form.case_code = this.form.case_code.toUpperCase()
        }
      }
    },
    'form.bill_of_lading_code': {
      handler: function() {
        if (this.form.bill_of_lading_code) {
          this.form.bill_of_lading_code = this.form.bill_of_lading_code.toUpperCase()
        }
      }
    },
    'form.container_code': {
      handler: function() {
        if (this.form.container_code) {
          this.form.container_code = this.form.container_code.toUpperCase()
        }
      }
    },
    'form.contract_code': {
      handler: function() {
        if (this.form.contract_code) {
          this.form.contract_code = this.form.contract_code.toUpperCase()
        }
      }
    },
    'form.invoice_code': {
      handler: function() {
        if (this.form.invoice_code) {
          this.form.invoice_code = this.form.invoice_code.toUpperCase()
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
    remoteSuppliers(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'suppliers', params: { code: query }})
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

<style scoped>
@media(max-width: 940px) {
  .el-date-editor.input-form{
    width: 100% !important;
  }
}
</style>

