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
        clearable
        reserve-keyword
        :remote-method="remoteContracts"
        @visible-change="remoteContracts('')"
      >
        <el-option
          v-for="item in options.contractForms"
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
        clearable
        reserve-keyword
        :remote-method="remoteInvoices"
        @visible-change="remoteInvoices('')"
      >
        <el-option
          v-for="item in options.invoiceForms"
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
        clearable
        reserve-keyword
        :remote-method="remoteBLs"
        @visible-change="remoteBLs('')"
      >
        <el-option
          v-for="item in options.billForms"
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
        clearable
        reserve-keyword
        :remote-method="remoteContainers"
        @visible-change="remoteContainers('')"
      >
        <el-option
          v-for="item in options.containerForms"
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
        clearable
        reserve-keyword
        :remote-method="remoteCases"
        @visible-change="remoteCases('')"
      >
        <el-option
          v-for="item in options.caseForms"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- procurement_supplier_code -->
    <el-form-item v-if="editing" :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.supplier_code"
        filterable
        :disabled="editing"
        :placeholder="$t('procurement_supplier_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
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
    <!-- date_container_received -->
    <el-form-item ref="container_received" :label="$t('date_container_received')" prop="container_received" :error="errors.container_received" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.container_received"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_container_received')"
        style="width: 100%"
        :picker-options="disabledOptionDate"
      />
    </el-form-item>
    <!-- date_devanned -->
    <el-form-item ref="devanned_date" :label="$t('date_devanned')" prop="devanned_date" :error="errors.devanned_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.devanned_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_devanned')"
        :picker-options="disabledOptionDate"
        style="width: 100%"
      />
    </el-form-item>
    <!-- date_case_stored -->
    <el-form-item ref="stored_date" :label="$t('date_case_stored')" prop="stored_date" :error="errors.stored_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.stored_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_case_stored')"
        :picker-options="disabledOptionDate"
        style="width: 100%"
      />
    </el-form-item>

    <!-- warehouse_code -->
    <el-form-item :label="$t('warehouse_code')" prop="warehouse_code" :error="errors.warehouse_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_code"
        filterable
        :placeholder="$t('warehouse_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
        reserve-keyword
        :remote-method="remoteWarehouses"
        @visible-change="remoteWarehouses('')"
      >
        <el-option
          v-for="item in options.warehouses"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- location_code -->
    <el-form-item :label="$t('location_code')" prop="warehouse_location_code" :error="errors.warehouse_location_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_location_code"
        filterable
        :placeholder="$t('location_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
        reserve-keyword
        :remote-method="remoteLocations"
        @visible-change="remoteLocations('')"
      >
        <el-option
          v-for="item in options.warehouseLocations"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- date_shipped_upkwh -->
    <el-form-item v-if="editing" ref="shipped_date" :label="$t('date_shipped_upkwh')" prop="shipped_date" :error="errors.shipped_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.shipped_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_shipped_upkwh')"
        :picker-options="disabledOptionDate"
        style="width: 100%"
        :clearable="false"
        :editable="false"
      />
    </el-form-item>
    <!-- defect_id -->
    <el-form-item class="defect_request" :label="$t('defect_status')" prop="defect_status" :error="errors.defect_status" :label-width="formLabelWidth">
      <el-select
        v-model="form.defect_id"
        filterable
        :disabled="editing"
        :placeholder="$t('defect_status')"
        :no-match-text="$t('no_data2')"
        class="input-form"
        clearable
      >
        <el-option
          v-for="item in defects"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
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
import { checkTrimValue, fillAttributeToMessage } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  props: ['defects'],
  data() {
    return {
      disabledOptionDate: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        case_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        bill_of_lading_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        container_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        invoice_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        container_received: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: this.reValidateField, fieldRef: 'devanned_date', fieldTrigger: 'change', trigger: 'change' }
        ],
        devanned_date: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'container_received', to: 'devanned_date' },
          { validator: this.reValidateField, fieldRef: 'stored_date', fieldTrigger: 'change', trigger: 'change' }
        ],
        // defect_status: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        stored_date: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'stored_date', to: 'shipped_date' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'devanned_date', to: 'stored_date' }
        ],
        shipped_date: [
          { validator: this.reValidateField, fieldRef: 'stored_date', fieldTrigger: 'change', trigger: 'change' }
        ],
        // warehouse_location_code: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        warehouse_code: [
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
  methods: {
    remoteContracts(query) {
      this.options.contractForms = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'contractForms', params: { column: 'contract_code', keyword: query }})
      }, 100)
    },
    remoteInvoices(query) {
      this.options.invoiceForms = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'invoiceForms', params: { column: 'invoice_code', keyword: query }})
      }, 100)
    },
    remoteBLs(query) {
      this.options.billForms = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'billForms', params: { column: 'bill_of_lading_code', keyword: query }})
      }, 100)
    },
    remoteContainers(query) {
      this.options.containerForms = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'containerForms', params: { column: 'container_code', keyword: query }})
      }, 100)
    },
    remoteCases(query) {
      this.options.caseForms = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'caseForms', params: { column: 'case_code', keyword: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteLocations(query) {
      this.options.warehouseLocations = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouseLocations', params: { code: query, warehouse_code: this.form.warehouse_code }})
      }, 100)
    },
    remoteSuppliers(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'suppliers', params: { code: query }})
      }, 100)
    },
    remoteWarehouses(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouses', params: { code: query, warehouse_type: 1 }})
      }, 100)
    },
    validWeekFromTo(rule, value, callback) {
      if (this.form[rule.from] && this.form[rule.to]) {
        if (((new Date(this.form[rule.from])).getTime() > (new Date(this.form[rule.to])).getTime())) {
          callback(new Error(fillAttributeToMessage(this.$t(rule.from), '10062', { ':max': this.$t(rule.to) })))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },

    reValidateField(rule, value, callback) {
      if (this.$refs[rule.fieldRef]) {
        this.$refs[rule.fieldRef].validate(rule.fieldTrigger)
      }

      callback()
    }
  }
}
</script>

<style>
@media(max-width: 940px) {
  .el-date-editor.input-form{
    width: 100% !important;
  }
}
.defect_request .el-form-item__label:after {
  content: "*";
  color: #f56c6c;
  margin-left: 4px;
}
</style>

