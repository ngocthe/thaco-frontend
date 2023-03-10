<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- ADD -->
    <!-- part_code -->
    <el-form-item v-if="!editing" :label="$t('part_no')" prop="part_code" :error="errors.part_code" :label-width="formLabelWidth">
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
    <el-form-item v-if="!editing" :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code" :label-width="formLabelWidth">
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
    <!-- quantity_of_box -->
    <el-form-item v-if="!editing" :label="$t('quantity_of_box')" prop="box_quantity" :error="errors.box_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.box_quantity" :placeholder="$t('quantity_of_box')" class="input-form" />
    </el-form-item>
    <!-- plant_code -->
    <el-form-item v-if="!editing" :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
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

    <!-- EDIT -->
    <!-- order_number -->
    <el-form-item v-if="editing" :label="$t('order_number')" prop="order_number" :error="errors.order_number" :label-width="formLabelWidth">
      <el-input v-model="form.order_number" :disabled="editing" :placeholder="$t('order_number')" class="input-form" />
    </el-form-item>
    <!-- contract_no -->
    <el-form-item v-if="editing" :label="$t('contract_no')" prop="contract_code" :error="errors.contract_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.contract_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('contract_no')"
        class="input-form"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- invoice_no -->
    <el-form-item v-if="editing" :label="$t('invoice_no')" prop="invoice_code" :error="errors.invoice_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.invoice_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('invoice_no')"
        class="input-form"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- bl_no -->
    <el-form-item v-if="editing" :label="$t('bl_no')" prop="bill_of_lading_code" :error="errors.bill_of_lading_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.bill_of_lading_code"
        filterable
        clearable
        :disabled="editing"
        :placeholder="$t('bl_no')"
        class="input-form"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- case_no -->
    <el-form-item v-if="editing" :label="$t('case_no')" prop="case_code" :error="errors.case_code" :label-width="formLabelWidth">
      <el-input v-model="form.case_code" :disabled="editing" :placeholder="$t('case_no')" class="input-form" />
    </el-form-item>
    <!-- procurement_supplier_code -->
    <el-form-item v-if="editing" :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code" :label-width="formLabelWidth">
      <el-input v-model="form.supplier_code" :disabled="editing" :placeholder="$t('procurement_supplier_code')" class="input-form" />
    </el-form-item>
    <!-- date_case_received -->
    <el-form-item v-if="editing" :label="$t('date_case_received')" prop="received_date" :error="errors.received_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.received_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('date_case_received')"
        :picker-options="{ disabledDate: (time) => disabledEndDate(time) }"
        style="width: 100%"
      />
    </el-form-item>
    <!-- warehouse_code -->
    <el-form-item v-if="editing" :label="$t('warehouse_code')" prop="warehouse_code" :error="errors.warehouse_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_code"
        filterable
        clearable
        :placeholder="$t('warehouse_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteWarehouseCodes"
        @visible-change="remoteWarehouseCodes('')"
      >
        <el-option
          v-for="item in options.warehouseCodes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- shelf_location_code -->
    <el-form-item v-if="editing" :label="$t('shelf_location_code')" prop="shelf_location_code" :error="errors.shelf_location_code" :label-width="formLabelWidth">
      <el-input v-model="form.shelf_location_code" :placeholder="$t('shelf_location_code')" class="input-form" />
    </el-form-item>
    <!-- defect_status -->
    <el-form-item v-if="editing" :label="$t('defect_status')" class="defect_request" prop="defect_id" :error="errors.defect_id" :label-width="formLabelWidth">
      <el-select
        v-model="form.defect_id"
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
    <!-- plant_code -->
    <el-form-item v-if="editing" :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
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
    <!-- remark -->
    <el-form-item v-if="editing" :label="$t('remark')" prop="remark" :label-width="formLabelWidth">
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
import { checkTrimValue, validNumber, checkDecimal, validNumberZero } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  props: ['defects'],
  data() {
    return {
      rules: {
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        box_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_of_box') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('quantity_of_box') }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        received_date: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        order_number: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        warehouse_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        invoice_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        bill_of_lading_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        case_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' }
        ],
        // defect_id: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        // warehouse_location_code: [
        //   { required: true, message: this.$t('input_required'), trigger: 'blur' }
        // ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
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
    disabledEndDate(date) {
      return date.getTime() > Date.now()
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
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteWarehouseCodes(query) {
      this.options.warehouseCodes = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouseCodes', params: { code: query, warehouse_type: 2 }})
      }, 100)
    },
    remoteWarehouseLocations(query) {
      this.options.warehouseLocations = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouseLocations', params: { code: query, warehouse_type: 2, warehouse_code: this.form.warehouse_code }})
      }, 100)
    },
    remotePartColorsBwhInventoryLog(query) {
      this.options.partColorsBwhInventoryLog = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColorsBwhInventoryLog', params: { code: query, column: 'part_color_code', search_like: false }})
      }, 100)
    }
  }
}
</script>
<style>
.defect_request .el-form-item__label:after {
  content: "*";
  color: #f56c6c;
  margin-left: 4px;
}
</style>

