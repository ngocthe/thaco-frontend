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
        :remote-method="remoteCasesBwh"
        @visible-change="remoteCasesBwh('')"
      >
        <el-option
          v-for="item in options.casesBwh"
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
        clearable
        reserve-keyword
        :remote-method="remotePartsBwh"
        @visible-change="remotePartsBwh('')"
      >
        <el-option
          v-for="item in options.partsBwh"
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
        clearable
        reserve-keyword
        :remote-method="remotePartColorsBwh"
        @visible-change="remotePartColorsBwh('')"
      >
        <el-option
          v-for="item in options.partColorsBwh"
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
        clearable
        reserve-keyword
        :remote-method="remoteBoxTypesBwh"
        @visible-change="remoteBoxTypesBwh('')"
      >
        <el-option
          v-for="item in options.boxTypesBwh"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- box_quantity -->
    <el-form-item :label="$t('quantity_of_box')" prop="box_quantity" :error="errors.box_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.box_quantity" :placeholder="$t('quantity_of_box')" class="input-form" />
    </el-form-item>
    <!-- part_quantity -->
    <el-form-item v-if="editing" :label="$t('parts_quantity_in_box')" prop="part_quantity" :error="errors.part_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.part_quantity" :disabled="editing" :placeholder="$t('parts_quantity_in_box')" class="input-form" />
    </el-form-item>
    <!-- unit -->
    <el-form-item v-if="editing" :label="$t('unit')" prop="unit" :error="errors.unit" :label-width="formLabelWidth">
      <el-select
        v-model="form.unit"
        :disabled="editing"
        filterable
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
    <!--date_case_received-->
    <el-form-item ref="formReceivedDate" :label="$t('date_case_received')" prop="received_date" :error="errors.received_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.received_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_case_received')"
        style="width: 100%"
        :picker-options="optionsPickerDateCaseReceived"
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
    <el-form-item :label="$t('shelf_location_code')" prop="shelf_location_code" :error="errors.shelf_location_code" :label-width="formLabelWidth">
      <el-input v-model="form.shelf_location_code" :placeholder="$t('shelf_location_code')" class="input-form" />
    </el-form-item>
    <!-- shipped_box_quantity -->
    <el-form-item v-if="editing" :label="$t('number_of_boxes_shipped_assembly_plant')" prop="shipped_box_quantity" :error="errors.shipped_box_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.shipped_box_quantity" :placeholder="$t('number_of_boxes_shipped_assembly_plant')" class="input-form" />
    </el-form-item>
    <!-- date_box_shipped_assembly_plant -->
    <el-form-item v-if="editing" ref="formShippedDate" :label="$t('date_box_shipped_assembly_plant')" prop="shipped_date" :error="errors.shipped_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.shipped_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_box_shipped_assembly_plant')"
        style="width: 100%"
        :picker-options="optionsPickerDateBoxShippedAssembly"
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
        clearable
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
    <!-- defect_id -->
    <el-form-item class="required-defect" :label="$t('defect_status')" prop="defect_status" :error="errors.defect_status" :label-width="formLabelWidth">
      <el-select
        v-model="form.defect_id"
        :no-match-text="$t('no_data2')"
        :disabled="editing"
        filterable
        :placeholder="$t('defect_status')"
        class="input-form"
      >
        <el-option
          v-for="item in defects"
          :key="item.code"
          :label="item.name"
          :value="item.code"
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
import { validNumberZero, checkDecimal, validNumber, alphaBe, startEndCharacter, checkBetweenMax } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  props: ['defects'],
  data() {
    var checkNumberBoxShipped = (rule, value, callback) => {
      const dateBoxShipped = this.form.shipped_date
      if (!dateBoxShipped) {
        callback()
      }
      const regex = /^\d+\.\d+$/
      const regex2 = /^-\d+(\.\d+)?$/
      // eslint-disable-next-line eqeqeq
      value = value + ''
      if (value === '0' || value.match(regex) || value.match(regex2)) {
        callback(new Error())
      }
      callback()
    }
    var checkBiggerThanReceivedDate = (rule, value, callback) => {
      if (value) {
        const receivedDate = (new Date(this.form.received_date)).getTime()
        const shippedDate = (new Date(value)).getTime()
        if (receivedDate === 0) {
          callback()
        }
        if (shippedDate >= receivedDate) {
          this.reValidateReceivedDate()
          callback()
        } else {
          callback(new Error('This ' + this.$t('date_box_shipped_assembly_plant') + this.$t('field_greater_than') + ' ' + this.$t('date_case_received')))
        }
      } else {
        callback()
      }
    }
    var checkBiggerThanShippedDay = (rule, value, callback) => {
      if (value) {
        const receivedDate = (new Date(value)).getTime()
        const shippedDate = (new Date(this.form.shipped_date)).getTime()
        if (shippedDate === 0) {
          callback()
        } else {
          if (shippedDate >= receivedDate) {
            this.reValidateShippedDate()
            callback()
          } else {
            callback(new Error('This ' + this.$t('date_case_received') + this.$t('field_less_than') + ' ' + this.$t('date_box_shipped_assembly_plant')))
          }
        }
      } else {
        callback()
      }
    }
    var checkBiggerThanCurrentDay = (rule, value, callback) => {
      if (value) {
        const valueDate = (new Date(value)).getTime()
        const currentDate = Math.round(new Date().getTime() / 100000) * 100000
        if (valueDate > currentDate) {
          callback(new Error(this.$t('greater_than_current_day')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var checkShippedBoxQuantity = (rule, value, callback) => {
      const shippedBoxQuantityDefault = this.form.shipped_box_quantity_default
      if (shippedBoxQuantityDefault > value) {
        callback(new Error(this.$t('smaller_current_value', { attr: this.$t('number_of_boxes_shipped_assembly_plant') })))
      } else {
        callback()
      }
    }
    return {
      optionsPickerDateCaseReceived: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      optionsPickerDateBoxShippedAssembly: {
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
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        invoice_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        box_type_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        box_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('quantity_of_box') }}
        ],
        part_quantity: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        supplier_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        received_date: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: checkBiggerThanCurrentDay, trigger: 'change' },
          { validator: checkBiggerThanShippedDay, trigger: 'change' }
        ],
        shipped_date: [
          { validator: checkBiggerThanCurrentDay, trigger: 'change' },
          { validator: checkBiggerThanReceivedDate, trigger: 'change' }
        ],
        // defect_status: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        warehouse_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        shipped_box_quantity: [
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('number_of_boxes_shipped_assembly_plant') }},
          { validator: checkShippedBoxQuantity, trigger: 'blur' },
          { validator: checkNumberBoxShipped, trigger: 'blur', message: this.$t('10108'), messageParams: { attribute: this.$t('number_of_boxes_shipped_assembly_plant') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('number_of_boxes_shipped_assembly_plant') }},
          { validator: checkBetweenMax, max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('number_of_boxes_shipped_assembly_plant') }}
        ],
        shelf_location_code: [
          { max: 8, message: this.$t(10063), trigger: 'change', messageParams: { max: 8 }},
          { validator: alphaBe, trigger: 'change' },
          { validator: startEndCharacter, trigger: 'change' }
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }}
        ]
      }
    }
  },
  watch: {
    'form.shelf_location_code': {
      handler: function() {
        if (this.form.shelf_location_code) {
          this.form.shelf_location_code = this.form.shelf_location_code.toUpperCase()
        }
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
        this.$emit('handle-change-option', { model: 'caseForms', params: { code: query }})
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
        this.$emit('handle-change-option', { model: 'warehouseLocations', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { column: 'part_code', keyword: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { column: 'part_color_code', keyword: query, part_code: this.form.part_code, search_like: false }})
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
        this.$emit('handle-change-option', { model: 'boxTypes', params: { column: 'box_type_code', keyword: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    remoteWarehouses(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouses', params: { code: query, warehouse_type: 2 }})
      }, 100)
    },
    reValidateReceivedDate() {
      this.$refs.formReceivedDate.clearValidate()
    },
    reValidateShippedDate() {
      this.$refs.formShippedDate.clearValidate()
    },
    remotePartsBwh(query) {
      this.options.partsBwh = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partsBwh', params: { keyword: query, column: 'part_code', plant_code: this.form.plant_code }})
      }, 100)
    },
    remotePartColorsBwh(query) {
      this.options.partColorsBwh = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColorsBwh', params: { keyword: query, column: 'part_color_code', part_code: this.form.part_code }})
      }, 100)
    },
    remoteBoxTypesBwh(query) {
      this.options.boxTypesBwh = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'boxTypesBwh', params: { keyword: query, column: 'box_type_code', part_code: this.form.part_code }})
      }, 100)
    },
    remoteCasesBwh(query) {
      this.options.casesBwh = []
      setTimeout(() => {
        // lấy ra các cái có defect là OK
        this.$emit('handle-change-option', { model: 'casesBwh', params: { keyword: query, column: 'case_code', defect_id: false }})
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

