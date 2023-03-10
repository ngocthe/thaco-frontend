<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('parts_used_date')" prop="used_date" :error="errors.used_date" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.used_date"
        :disabled="editing"
        class="input-form"
        type="date"
        :placeholder="$t('parts_used_date')"
        :picker-options="{ disabledDate: (time) => disabledEndDate(time) }"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
      />
    </el-form-item>
    <el-form-item :label="$t('part_no')" prop="part_code" :error="errors.part_code">
      <el-select
        v-model="form.part_code"
        :disabled="editing"
        :loading="loading_search"
        class="input-form"
        clearable
        remote
        reserve-keyword
        filterable
        :remote-method="remotePartCode"
        :placeholder="$t('part_no')"
        style="width: 100%"
        @visible-change="remotePartCode('')"
      >
        <el-option
          v-for="item in options.parts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code">
      <el-select
        v-model="form.part_color_code"
        class="input-form"
        :disabled="editing"
        :loading="loading_search"
        clearable
        remote
        reserve-keyword
        filterable
        :remote-method="remotePartColor"
        :placeholder="$t('part_color_code')"
        style="width: 100%"
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
    <el-form-item :label="$t('parts_used_quantity')" prop="quantity" :error="errors.quantity" :label-width="formLabelWidth">
      <el-input v-model="form.quantity" :controls="false" :placeholder="$t('parts_used_quantity')" class="input-form" />
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
        class="input-form"
        type="textarea"
        :autosize="{ minRows: 3}"
        :placeholder="$t('remark')"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkDecimal, checkTrimValue, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        used_date: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10 }}
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 2, message: this.$t(10063), trigger: 'blur', messageParams: { max: 2 }}
        ],
        quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('parts_used_quantity') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_used_quantity') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_used_quantity') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('parts_used_quantity') }},
          { max: 4, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9999, attribute: this.$t('parts_used_quantity') }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5 }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    disabledEndDate(date) {
      return date.getTime() > Date.now()
    },
    remotePartCode(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    async remotePartColor(query) {
      this.options.partColors = []
      await setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query, part_code: this.form.part_code, search_like: false }})
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

