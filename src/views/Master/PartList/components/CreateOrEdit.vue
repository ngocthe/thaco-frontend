<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('part_no')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('part_no')" class="input-form" />
      <!-- <el-select
        v-model="form.code"
        allow-create
        filterable
        :disabled="editing"
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
      </el-select> -->
    </el-form-item>
    <el-form-item :label="$t('part_group')" prop="group" :error="errors.group">
      <el-select
        v-model="form.group"
        filterable
        clearable
        :placeholder="$t('part_group')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartGroup"
        @visible-change="remotePartGroup('')"
      >
        <el-option
          v-for="item in options.partGroups"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('part_name')" prop="name" :label-width="formLabelWidth">
      <el-input v-model="form.name" :placeholder="$t('part_name')" class="input-form" />
      <!-- <el-select
        v-model="form.name"
        filterable
        :placeholder="$t('part_name')"
        class="input-form"
        allow-create
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartName"
        @visible-change="remotePartName('')"
      >
        <el-option
          v-for="item in options.partNames"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
    </el-form-item>
    <el-form-item :label="$t('ecn_no_in')" prop="ecn_in" :label-width="formLabelWidth" :error="errors.ecn_in">
      <el-select
        v-model="form.ecn_in"
        filterable
        clearable
        :disabled="editing"
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
    <el-form-item :label="$t('ecn_no_out')" prop="ecn_out" :label-width="formLabelWidth" :error="errors.ecn_out">
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

    <el-form-item :label="$t('plant_code')" prop="plant_code" :label-width="formLabelWidth" :error="errors.plant_code">
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
        type="textarea"
        class="input-form"
        :rows="3"
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
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_no') }},
          { max: 10, message: this.$t(10063), trigger: 'blur', messageParams: { max: 10, attribute: this.$t('part_no') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_name') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('part_name') }},
          { max: 20, message: this.$t(10063), trigger: 'blur', messageParams: { max: 20, attribute: this.$t('part_name') }}
          // { validator: alphaBeSpace, trigger: 'change' },
          // { validator: checkTrimValue, trigger: 'blur' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('plant_code') }},
          { max: 5, message: this.$t(10063), trigger: 'change', messageParams: { max: 5 }}
        ],
        ecn_in: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('ecn_no_in') }},
          { max: 10, message: this.$t(10063), trigger: 'change', messageParams: { max: 10 }}
        ],
        ecn_out: [
          { max: 10, message: this.$t(10063), trigger: 'change', messageParams: { max: 10 }}
        ],
        group: [
          { required: true, message: this.$t(10080), trigger: 'change', messageParams: { attribute: this.$t('part_group') }},
          { max: 10, message: this.$t(10063), trigger: 'change', messageParams: { max: 10, attribute: this.$t('part_group') }}
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
        this.$emit('handle-change-option', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remotePartGroup(query) {
      this.options.partGroups = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partGroups', params: { code: query }})
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
    remotePartName(query) {
      this.options.partNames = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partNames', params: { column: 'name', keyword: query }})
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
