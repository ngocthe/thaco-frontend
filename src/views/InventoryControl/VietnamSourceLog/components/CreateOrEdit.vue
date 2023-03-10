<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- contract_code -->
    <el-form-item :label="$t('contract_no')" prop="contract_code" :error="errors.contract_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.contract_code"
        filterable
        :disabled="editing"
        :placeholder="$t('contract_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteContracts"
        @visible-change="remoteContracts('')"
      >
        <el-option
          v-for="item in options.contracts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- invoice_no -->
    <el-form-item :label="$t('invoice_no')" prop="invoice_code" :error="errors.invoice_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.invoice_code"
        filterable
        :disabled="editing"
        :placeholder="$t('invoice_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteInvoices"
        @visible-change="remoteInvoices('')"
      >
        <el-option
          v-for="item in options.invoices"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- bl_no -->
    <el-form-item :label="$t('bl_no')" prop="bill_of_lading_code" :error="errors.bill_of_lading_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.bill_of_lading_code"
        filterable
        :disabled="editing"
        :placeholder="$t('bl_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteBills"
        @visible-change="remoteBills('')"
      >
        <el-option
          v-for="item in options.bills"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- container_no -->
    <el-form-item :label="$t('container_no')" prop="container_code" :error="errors.container_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.container_code"
        filterable
        :disabled="editing"
        :placeholder="$t('container_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteContainers"
        @visible-change="remoteContainers('')"
      >
        <el-option
          v-for="item in options.containers"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- case_no -->
    <el-form-item :label="$t('case_no')" prop="case_code" :error="errors.case_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.case_code"
        filterable
        :disabled="editing"
        :placeholder="$t('case_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteCases"
        @visible-change="remoteCases('')"
      >
        <el-option
          v-for="item in options.cases"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- part_no -->
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_code"
        filterable
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
    <el-form-item :label="$t('part_quantity_in_box')" prop="part_quantity" :error="errors.part_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.part_quantity" :placeholder="$t('part_quantity_in_box')" class="input-form" />
    </el-form-item>

    <!-- unit -->
    <el-form-item :label="$t('unit')" prop="unit" :error="errors.unit" :label-width="formLabelWidth">
      <el-select
        v-model="form.unit"
        filterable
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

    <!-- procurement_supplier_code -->
    <el-form-item :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.supplier_code"
        filterable
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

    <!-- delivery_date -->
    <el-form-item :label="$t('delivery_date')" prop="delivery_date" :error="errors.delivery_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.delivery_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('delivery_date')"
        style="width: 100%"
      />
    </el-form-item>

    <!-- plant_code -->
    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.plant_code"
        filterable
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

    <!--    Remark-->
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
import { checkDecimal, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  data() {
    var checkTrimValue = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if ((value + '').trim().length > 0) {
        callback()
      } else {
        callback(new Error(this.$t('input_required')))
      }
    }

    return {
      rules: {
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        box_type_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        container_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        supplier_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        delivery_date: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        box_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('quantity_of_box') }}
        ],
        part_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('part_quantity_in_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('part_quantity_in_box') }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // console.log(12312312312, this.unit)
  },
  methods: {
    remoteContracts(query) {
      this.options.contracts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'contracts', params: { column: 'contract_code', keyword: query }})
      }, 100)
    },
    remoteInvoices(query) {
      this.options.invoices = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'invoices', params: { column: 'invoice_code', keyword: query }})
      }, 100)
    },
    remoteContainers(query) {
      this.options.containers = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'containers', params: { column: 'container_code', keyword: query }})
      }, 100)
    },
    remoteBills(query) {
      this.options.bills = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'bills', params: { column: 'bill_of_lading_code', keyword: query }})
      }, 100)
    },
    remoteCases(query) {
      this.options.cases = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'cases', params: { column: 'case_code', keyword: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query }})
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
        this.$emit('handle-change-option', { model: 'boxTypes', params: { code: query }})
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

