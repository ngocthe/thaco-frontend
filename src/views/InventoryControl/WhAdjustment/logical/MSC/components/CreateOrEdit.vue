<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- msc_code_code -->
    <el-form-item :label="$t('msc_code')" prop="msc_code" :error="errors.msc_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.msc_code"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('msc_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :no-match-text="$t('no_data2')"
        :remote-method="remoteMSCs"
        @visible-change="remoteMSCs('')"
      >
        <el-option
          v-for="item in options.mscs"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- exterior_color_code -->
    <el-form-item :label="$t('exterior_color_code')" prop="vehicle_color_code" :error="errors.vehicle_color_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.vehicle_color_code"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('exterior_color_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteVehicleColor"
        @visible-change="remoteVehicleColor('')"
      >
        <el-option
          v-for="item in options.vehicle_color_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- adjustment_quantity -->
    <el-form-item :label="$t('adjustment_quantity')" prop="adjustment_quantity" :error="errors.adjustment_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.adjustment_quantity" :placeholder="$t('adjustment_quantity')" class="input-form" />
    </el-form-item>

    <!-- production_date -->
    <el-form-item :label="$t('production_date')" prop="production_date" :error="errors.production_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.production_date"
        class="input-form"
        type="date"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :placeholder="$t('production_date')"
        style="width: 100%"
        :picker-options="optionsPickerProductionDate"
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
          v-for="item in options.plant_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- remark -->
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkNumberWHAdjustment, validNumberMax } from '@/utils/validate'
export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      optionsPickerProductionDate: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        msc_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        vehicle_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        // exterior_color_code: [
        //   { required: true, message: this.$t(10080), trigger: 'blur' }
        // ],
        adjustment_quantity: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: checkNumberWHAdjustment, message: this.$t(10073), trigger: 'change' },
          { validator: validNumberMax, max: 4, trigger: 'change' }
        ],
        production_date: [
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
  watch: {
    'form.adjustment_quantity': {
      handler: function() {
        if (this.form.adjustment_quantity) {
          this.form.adjustment_quantity = this.form.adjustment_quantity.trim().replace('.', '')
        }
      }
    }
  },
  methods: {
    remoteVehicleColor(query) {
      this.options.vehicle_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'vehicle_color_code', params: { code: query, vehicle_type: 'EXT' }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plant_code', params: { code: query }})
      }, 100)
    },
    remoteMSCs(query) {
      this.options.mscs = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'mscs', params: { keyword: query, column: 'msc_code' }})
      }, 100)
    }
  }
}
</script>

<style scoped>
.input-form-impo{
  width: 375px !important;
}
</style>
