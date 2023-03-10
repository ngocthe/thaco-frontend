<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('warehouse_code')" prop="warehouse_code" :label-width="formLabelWidth" :error="errors.warehouse_code">
      <el-select
        v-model="form.warehouse_code"
        remote
        clearable
        filterable
        :disabled="editing"
        :placeholder="$t('warehouse_code')"
        class="input-form"
        :remote-method="remoteWarehouse"
        @visible-change="remoteWarehouse('')"
      >
        <el-option
          v-for="item in options.warehouses"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('location_code')" prop="code" :label-width="formLabelWidth" :error="errors.code">
      <el-input
        v-model="form.code"
        class="input-form"
        type="text"
        :placeholder="$t('location_code')"
        :disabled="editing"
      />
    </el-form-item>
    <el-form-item :label="$t('location_description')" prop="description" :label-width="formLabelWidth">
      <el-input
        v-model="form.description"
        class="input-form"
        type="text"
        :placeholder="$t('location_description')"
      />
    </el-form-item>
    <el-form-item :label="$t('plant_code')" prop="plant_code" :label-width="formLabelWidth" :error="errors.plant_code">
      <el-select
        v-model="form.plant_code"
        remote
        clearable
        filterable
        :disabled="editing"
        :placeholder="$t('plant_code')"
        class="input-form"
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
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
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
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('location_code') }},
          { max: 8, message: this.$t(10063), trigger: 'blur', messageParams: { max: 8, attribute: this.$t('location_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('location_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('location_description') }},
          { max: 30, message: this.$t(10063), trigger: 'blur', messageParams: { max: 30, attribute: this.$t('location_description') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        warehouse_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
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
    remoteWarehouse(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouses', params: { code: query }})
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

