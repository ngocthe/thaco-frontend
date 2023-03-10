<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('vehicle_color_code')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('vehicle_color_code')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('vehicle_color_type')" prop="type" :error="errors.type">
      <el-select
        v-model="form.type"
        class="input-form"
        clearable
        filterable
        :placeholder="$t('vehicle_color_type')"
        :no-match-text="$t('no_data2')"
        style="width: 100%"
      >
        <el-option
          v-for="item in ['EXT', 'INT']"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('vehicle_color_name')" prop="name" :error="errors.name">
      <el-input v-model="form.name" :placeholder="$t('vehicle_color_name')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in')" prop="ecn_in" :error="errors.ecn_in">
      <el-select
        v-model="form.ecn_in"
        class="input-form"
        clearable
        :disabled="editing"
        remote
        :loading="loading_search"
        reserve-keyword
        filterable
        :remote-method="remoteEcnIn"
        :placeholder="$t('ecn_no_in')"
        style="width: 100%"
        @visible-change="remoteEcnIn('')"
      >
        <el-option
          v-for="item in options.ecnIns"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_out')" prop="ecn_out" :error="errors.ecn_out">
      <el-select
        v-model="form.ecn_out"
        class="input-form"
        clearable
        remote
        :loading="loading_search"
        reserve-keyword
        filterable
        :remote-method="remoteEcnOut"
        :placeholder="$t('ecn_no_out')"
        style="width: 100%"
        @visible-change="remoteEcnOut('')"
      >
        <el-option
          v-for="item in options.ecnOuts"
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
        type="textarea"
        class="input-form"
        :autosize="{ minRows: 3}"
        :placeholder="$t('remark')"
      />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('vehicle_color_code') }},
          { max: 4, message: this.$t(10063), trigger: 'blur', messageParams: { max: 4, attribute: this.$t('vehicle_color_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        type: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('vehicle_color_type') }},
          { max: 3, message: this.$t(10063), trigger: 'change', messageParams: { max: 3, attribute: this.$t('vehicle_color_type') }}
        ],
        name: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('vehicle_color_name') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('vehicle_color_name') }},
          { max: 20, message: this.$t(10063), trigger: 'blur', messageParams: { max: 20, attribute: this.$t('vehicle_color_name') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        ecn_in: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('ecn_no_in') }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('plant_code') }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.code': {
      handler: function() {
        if (this.form.code) {
          this.form.code = this.form.code.toUpperCase()
        }
      }
    }
  },
  methods: {
    remoteVehicleColor(query) {
      this.options.vehicleColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'vehicleColors', params: { code: query }})
      }, 100)
    },
    remoteEcnIn(query) {
      this.options.ecnIns = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'ecnIns', params: { code: query }})
      }, 100)
    },
    remoteEcnOut(query) {
      this.options.ecnOuts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'ecnOuts', params: { code: query }})
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

