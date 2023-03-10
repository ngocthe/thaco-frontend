<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- part_no -->
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_code"
        :disabled="editing"
        filterable
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
    <!-- part_color_code -->
    <el-form-item :label="$t('part_color_code')" prop="code" :error="errors.code" :label-width="formLabelWidth">
      <el-select
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
      </el-select>
    </el-form-item>
    <!-- msc_code_code -->
    <el-form-item :label="$t('msc_code_code')" prop="code" :error="errors.code" :label-width="formLabelWidth">
      <el-select
        v-model="form.code"
        :disabled="editing"
        filterable
        allow-create
        :placeholder="$t('msc_code_code')"
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
      </el-select>
    </el-form-item>
    <!-- old_quantity -->
    <el-form-item :label="$t('old_quantity')" prop="interior_code" :error="errors.interior_code" :label-width="formLabelWidth">
      <el-input v-model="form.interior_code" :disabled="editing" placeholder="" class="input-form" />
    </el-form-item>
    <!-- new_quantity -->
    <el-form-item :label="$t('new_quantity')" prop="interior_code" :error="errors.interior_code" :label-width="formLabelWidth">
      <el-input v-model="form.interior_code" :disabled="editing" placeholder="" class="input-form" />
    </el-form-item>
    <!-- remark -->
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        part_code: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' },
          { max: 2, message: this.$t('max_length') + '2 ' + this.$t('characters'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' },
          { max: 20, message: this.$t('max_length') + '20 ' + this.$t('characters'), trigger: 'blur' }
        ],
        interior_code: [
          { max: 3, message: this.$t('max_length') + '3 ' + this.$t('characters'), trigger: 'blur' }
        ],
        vehicle_color_code: [
          { max: 3, message: this.$t('max_length') + '3 ' + this.$t('characters'), trigger: 'blur' }
        ],
        ecn_in: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' }
        ],
        ecn_out: [
          { max: 10, message: this.$t('max_length') + '10 ' + this.$t('characters'), trigger: 'blur' }
        ],
        plant_code: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' }
        ]
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
    remoteVehicleColor(query) {
      this.options.vehicleColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'vehicleColors', params: { code: query }})
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
