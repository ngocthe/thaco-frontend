<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
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
        clearable
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
        :no-match-text="$t('no_data2')"
        remote
        reserve-keyword
        :remote-method="remotePartColors"
        clearable
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
        :no-match-text="$t('no_data2')"
        remote
        reserve-keyword
        :remote-method="remoteBoxTypes"
        clearable
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
    <!-- date_received_at_assembly_plant -->
    <el-form-item :label="$t('date_received_at_assembly_plant')" prop="received_date" :error="errors.received_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.received_date"
        class="input-form"
        :disabled="editing"
        type="date"
        :placeholder="$t('date_received_at_assembly_plant')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        clearable
        :picker-options="optionsPickerDateReceivedAtAssembly"
      />
    </el-form-item>
    <!-- number_of_boxes_received_UPKWH -->
    <el-form-item v-if="editing" :label="$t('number_of_boxes_received_UPKWH')" prop="received_box_quantity" :error="errors.received_box_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.received_box_quantity" :disabled="editing" :placeholder="$t('number_of_boxes_received_UPKWH')" class="input-form" />
    </el-form-item>
    <!-- part_quantity_in_box -->
    <el-form-item v-if="editing" :label="$t('parts_quantity')" prop="quantity" :error="errors.quantity" :label-width="formLabelWidth">
      <el-input v-model="form.quantity" :placeholder="$t('parts_quantity')" class="input-form" />
    </el-form-item>
    <!-- unit -->
    <el-form-item v-if="editing" :label="$t('unit')" prop="unit" :error="errors.unit" :label-width="formLabelWidth">
      <el-select
        v-model="form.unit"
        filterable
        :placeholder="$t('unit')"
        class="input-form"
        :disabled="editing"
        clearable
      >
        <el-option
          v-for="item in unit"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- warehouse_code -->
    <el-form-item :label="$t('warehouse_code')" prop="warehouse_code" :error="errors.warehouse_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_code"
        filterable
        :disabled="editing"
        :placeholder="$t('warehouse_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteWarehouses"
        clearable
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
    <!-- defect_id -->
    <el-form-item v-if="!editing" :label="$t('defect_status')" class="defect_label" prop="defect_id" :error="errors.defect_id" :label-width="formLabelWidth">
      <el-select
        v-model="form.defect_id"
        :disabled="editing"
        filterable
        :placeholder="$t('defect_status')"
        :no-match-text="$t('no_data2')"
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
    <el-form-item v-if="editing" :label="$t('defect_status')" class="defect_label" prop="defect_id" :error="errors.defect_id" :label-width="formLabelWidth">
      <el-select
        v-model="form.defect_id"
        :disabled="editing"
        filterable
        :placeholder="$t('defect_status')"
        class="input-form"
      >
        <el-option
          v-for="item in defectsTwoCase"
          :key="item.code"
          :label="item.name"
          :value="item.code"
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
import { unit } from '@/utils/unit'
import { checkDecimal, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  props: ['defects'],
  data() {
    return {
      defectsTwoCase: [
        { code: null, name: 'OK' },
        { code: 'W', name: 'Has Defect' },
        { code: 'D', name: 'Has Defect' },
        { code: 'S', name: 'Has Defect' },
        { code: 'X', name: 'Has Defect' }
      ],
      optionsPickerDateReceivedAtAssembly: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        received_date: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        unit: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        warehouse_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        box_type_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 5, message: this.$t(10063), trigger: 'change', messageParams: { max: 5 }}
        ],
        quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_quantity') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('parts_quantity') }}
        ],
        // defect_status: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5 }}
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
    remoteWarehouses(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouses', params: { code: query, warehouse_type: 3 }})
      }, 100)
    },
    remoteBoxTypes(query) {
      this.options.boxTypes = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'boxTypes', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    remoteColumnBwhInventoryLogs(query) {
      this.options.columnBwhInventoryLogs = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'columnBwhInventoryLogs', params: { column: 'contract_code', keyword: query }})
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item.defect_label {
  .el-form-item__label:after {
      content: "*";
      color: #f56c6c !important;
      margin-left: 4px !important;
  }
}
</style>

<style scoped>
@media(max-width: 940px) {
  .el-date-editor.input-form{
    width: 100% !important;
  }
}
</style>

