<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('msc_code')" prop="msc_code" :error="errors.msc_code">
      <el-select
        v-model="form.msc_code"
        :disabled="editing"
        :loading="loading_search"
        class="input-form"
        clearable
        remote
        reserve-keyword
        filterable
        :remote-method="remoteMSC"
        :placeholder="$t('msc_code')"
        style="width: 100%"
        @visible-change="remoteMSC('')"
      >
        <el-option
          v-for="item in options.mscs"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('shop_code')" prop="shop_code" :error="errors.shop_code">
      <el-input v-model="form.shop_code" :placeholder="$t('shop_code')" clearable class="input-form" :disabled="editing" />
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
    <el-form-item :label="$t('quantity_per_unit')" prop="quantity" :error="errors.quantity" :label-width="formLabelWidth">
      <el-input v-model="form.quantity" :controls="false" :placeholder="$t('quantity_per_unit')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('part_remarks')" prop="part_remarks" :error="errors.part_remarks" :label-width="formLabelWidth">
      <el-input v-model="form.part_remarks" :controls="false" :placeholder="$t('part_remarks')" class="input-form" />
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
import { checkTrimValue, alphaBe, validNumber, checkDecimal, validNumberZero } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        msc_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('msc_code') }}
        ],
        shop_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('shop_code') }},
          { max: 3, message: this.$t(10063), trigger: 'change', messageParams: { max: 3 }},
          { validator: alphaBe, trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_no') }}
        ],
        quantity: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('quantity_per_unit') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_per_unit') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_per_unit') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('quantity_per_unit') }},
          { max: 5, message: this.$t(10062), trigger: 'blur', messageParams: { max: 99999, attribute: this.$t('quantity_per_unit') }}
        ],
        part_remarks: [
          { max: 50, message: this.$t(10063), trigger: 'blur', messageParams: { max: 50, attribute: this.$t('part_remarks') }}
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_color_code') }}
        ],
        ecn_in: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('ecn_no_in') }},
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10 }}
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('plant_code') }},
          { max: 10, message: this.$t(10063), trigger: 'change', messageParams: { max: 10 }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.shop_code': {
      handler: function() {
        if (this.form.shop_code) {
          this.form.shop_code = this.form.shop_code.toUpperCase()
        }
      }
    }
  },
  methods: {
    remoteMSC(query) {
      this.options.mscs = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'mscs', params: { code: query }})
      }, 100)
    },
    remotePartCode(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query, plant_code: this.form.plant_code, search_like: false }})
      }, 100)
    },
    async remotePartColor(query) {
      this.options.partColors = []
      await setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query, part_code: this.form.part_code, search_like: false }, type: 'xx' })
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

