<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item v-if="editing" :label="$t('order_status')" prop="status" :error="errors.status">
      <el-input
        :value="form.status | translateStatusOrder"
        class="input-form"
        type="text"
        :placeholder="$t('order_status')"
        :disabled="editing"
      />
    </el-form-item>

    <el-form-item :label="$t('contract_no')" prop="contract_code" :error="errors.contract_code">
      <el-input
        v-if="editing"
        v-model="form.contract_code"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.contract_code"
        filterable
        clearable
        :placeholder="$t('contract_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteContracts"
        :disabled="editing"
        @visible-change="remoteContracts('')"
      >
        <el-option
          v-for="item in options.contract_code_by_part_group"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-if="editing" :label="$t('eta')" prop="eta" :error="errors.eta">
      <el-date-picker
        v-model="form.eta"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('eta')"
        style="width: 100%"
        :disabled="editing"
      />
    </el-form-item>

    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code">
      <el-input
        v-if="editing"
        v-model="form.part_code"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.part_code"
        filterable
        clearable
        :placeholder="$t('part_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteParts"
        :disabled="editing"
        @visible-change="remoteParts('')"
      >
        <el-option
          v-for="item in options.part_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code">
      <el-input
        v-if="editing"
        v-model="form.part_color_code"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.part_color_code"
        filterable
        clearable
        :placeholder="$t('part_color_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartColors"
        :disabled="editing"
        @visible-change="remotePartColors('')"
      >
        <el-option
          v-for="item in options.part_color_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('part_group')" prop="part_group" :error="errors.part_group">
      <el-input
        v-if="editing"
        v-model="form.part_group"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.part_group"
        filterable
        clearable
        :placeholder="$t('part_group')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartGroups"
        :disabled="editing"
        @visible-change="remotePartGroups('')"
      >
        <el-option
          v-for="item in options.part_group_by_contract"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-if="editing" :label="$t('minimum_order_quantity')" prop="moq" :error="errors.moq">
      <el-input
        v-model="form.moq"
        class="input-form"
        type="text"
        :placeholder="$t('minimum_order_quantity')"
        :disabled="editing"
      />
    </el-form-item>

    <el-form-item v-if="editing" :label="$t('number_quantity_from_mrp')" prop="mrp_quantity" :error="errors.mrp_quantity">
      <el-input
        v-model="form.mrp_quantity"
        class="input-form"
        type="text"
        :placeholder="$t('number_quantity_from_mrp')"
        :disabled="editing"
      />
    </el-form-item>

    <el-form-item :label="$t('actual_quantity')" prop="actual_quantity" :error="errors.actual_quantity">
      <el-input
        v-model="form.actual_quantity"
        class="input-form"
        type="text"
        :placeholder="$t('actual_quantity')"
      />
    </el-form-item>

    <el-form-item :label="$t('procurement_supplier_code')" prop="supplier_code" :error="errors.supplier_code">
      <el-input
        v-if="editing"
        v-model="form.supplier_code"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.supplier_code"
        filterable
        clearable
        :placeholder="$t('procurement_supplier_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteProcurementSuppliers"
        :disabled="editing"
        @visible-change="remoteProcurementSuppliers('')"
      >
        <el-option
          v-for="item in options.supplier_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code">
      <el-input
        v-if="editing"
        v-model="form.plant_code"
        class="input-form"
        type="text"
        :disabled="editing"
      />
      <el-select
        v-else
        v-model="form.plant_code"
        filterable
        clearable
        :placeholder="$t('plant_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePlants"
        :disabled="editing"
        @visible-change="remotePlants('')"
      >
        <el-option
          v-for="item in options.plant_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-if="editing" :label="$t('input_file_name')" prop="input_file_name" :error="errors.input_file_name">
      <el-input
        v-model="form.input_file_name"
        class="input-form"
        type="text"
        :placeholder="$t('manual_order')"
        :disabled="editing"
      />
    </el-form-item>

    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" class="input-form" type="textarea" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { unit } from '@/utils/unit'
import { checkBetweenMax, checkTrimValue, validNumber, checkDecimal, checkPositiveNumber } from '@/utils/validate'
import { statusMRPOrderingCalendar } from '@/utils/constant'
export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(), unit],
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  data() {
    return {
      rules: {
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        status: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        // eta: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        supplier_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_group: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        actual_quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('actual_quantity') }},
          { validator: validNumber, message: this.$t('10073'), trigger: 'blur', messageParams: { attribute: this.$t('actual_quantity') }},
          { validator: checkPositiveNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('actual_quantity') }},
          { validator: checkBetweenMax, max: 6, trigger: 'blur', message: this.$t(10062), messageParams: { max: 999999, attribute: this.$t('actual_quantity') }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'change', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    remoteContracts(query) {
      this.options.contract_code_by_part_group = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'contract_code_by_part_group',
          params: { column: 'contract_code', keyword: query, part_group: this.form.part_group, status: statusMRPOrderingCalendar.WAIT }})
      }, 100)
    },
    remoteProcurementSuppliers(query) {
      this.options.supplier_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'supplier_code', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.part_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_code', params: { code: query, plant_code: this.form.plant_code, is_with_parent_code: true, group: this.form.part_group }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.part_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_color_code', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    remotePartGroups(query) {
      this.options.part_group_by_contract = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_group_by_contract',
          params: { column: 'part_group', keyword: query, contract_code: this.form.contract_code, status: statusMRPOrderingCalendar.WAIT }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plant_code', params: { code: query }})
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
