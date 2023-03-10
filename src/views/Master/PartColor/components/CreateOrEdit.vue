<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_code"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('part_no')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePart"
        @visible-change="remotePart('')"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')" prop="code" :error="errors.code" :label-width="formLabelWidth">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('part_color_code')" class="input-form" />
      <!-- <el-select
        v-model="form.code"
        :disabled="editing"
        filterable
        allow-create
        :placeholder="$t('part_color_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartColor"
        @visible-change="remotePartColor('')"
      >
        <el-option
          v-for="item in options.partColors"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
    </el-form-item>
    <el-form-item :label="$t('part_color_name')" prop="name" :error="errors.name" :label-width="formLabelWidth">
      <el-input v-model="form.name" :placeholder="$t('part_color_name')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('inter_color_condition')" prop="interior_code" :error="errors.interior_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.interior_code"
        filterable
        clearable
        :placeholder="$t('inter_color_condition')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteVehicleColorInt"
        @visible-change="remoteVehicleColorInt('')"
      >
        <el-option
          v-for="item in options.vehicleColorsInt"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('exterior_color_condition')" prop="vehicle_color_code" :error="errors.vehicle_color_code" :label-width="formLabelWidth">
      <!-- <el-input v-model="form.vehicle_color_code" :placeholder="$t('exterior_color_condition')" class="input-form" /> -->
      <el-select
        v-model="form.vehicle_color_code"
        filterable
        clearable
        :placeholder="$t('exterior_color_condition')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteVehicleColorExt"
        @visible-change="remoteVehicleColorExt('')"
      >
        <el-option
          v-for="item in options.vehicleColorsExt"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in')" prop="ecn_in" :error="errors.ecn_in" :label-width="formLabelWidth">
      <el-select
        v-model="form.ecn_in"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('ecn_no_in')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteEcn"
        @visible-change="remoteEcn('')"
      >
        <el-option
          v-for="item in options.ecns"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('ecn_no_out')" prop="ecn_out" :error="errors.ecn_out" :label-width="formLabelWidth">
      <el-select
        v-model="form.ecn_out"
        filterable
        clearable
        :placeholder="$t('ecn_no_out')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remoteEcn"
        @visible-change="remoteEcn('')"
      >
        <el-option
          v-for="item in options.ecns"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.plant_code"
        :disabled="editing"
        filterable
        clearable
        :placeholder="$t('plant_code')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePlant"
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
import { checkTrimValue, alphaBe, notXX, checkTrimValueWithFieldName } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_no') }}
        ],
        code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_color_code') }},
          { max: 2, message: this.$t(10063), trigger: 'change', messageParams: { max: 2, attribute: this.$t('part_color_code') }},
          { validator: alphaBe, trigger: 'change' },
          { validator: notXX, trigger: 'change' }

        ],
        name: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_color_name') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_color_name') }},
          { max: 20, message: this.$t(10063), trigger: 'blur', messageParams: { max: 20, attribute: this.$t('part_color_name') }},
          { validator: checkTrimValueWithFieldName, trigger: 'blur', field_name: 'part_color_name' }
        ],
        interior_code: [
          { max: 4, message: this.$t(10063), trigger: 'change', messageParams: { max: 4, attribute: this.$t('inter_color_condition') }}
        ],
        vehicle_color_code: [
          { max: 4, message: this.$t(10063), trigger: 'change', messageParams: { max: 4, attribute: this.$t('exterior_color_condition') }}
        ],
        ecn_in: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 4, attribute: this.$t('ecn_no_in') }}
        ],
        ecn_out: [
          { max: 10, message: this.$t(10063), trigger: 'change', messageParams: { max: 10 }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { max: 4, attribute: this.$t('plant_code') }}
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
    querySearchPart(queryString, cb) {
      this.querySearch(queryString, cb, this.options.parts)
    },
    remotePart(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    remoteVehicleColorInt(query) {
      this.options.vehicleColorsInt = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'vehicleColorsInt', params: { code: query, vehicle_type: 'INT' }})
      }, 100)
    },
    remoteVehicleColorExt(query) {
      this.options.vehicleColorsExt = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'vehicleColorsExt', params: { code: query, vehicle_type: 'EXT' }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteEcn(query) {
      this.options.ecns = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'ecns', params: { code: query }})
      }, 100)
    },
    remotePartColor(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query }})
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
