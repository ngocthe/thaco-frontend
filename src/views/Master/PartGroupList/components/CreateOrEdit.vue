<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('switch_type_part_group')" prop="type_part_group">
      <el-switch
        v-model="form.type_part_group"
        :active-text="this.$t('local_material')"
        :inactive-text="this.$t('bulk_part')"
        :active-value="'vn'"
        :inactive-value="'abroad'"
        active-color="#13ce66"
        inactive-color="#46a6ff"
        @change="handleChangeTypePartGroup"
      />
    </el-form-item>
    <el-form-item :label="$t('part_group_code')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :placeholder="$t('part_group_code')" :disabled="editing" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('part_group_description')" prop="description" :error="errors.description">
      <el-input v-model="form.description" :placeholder="$t('part_group_description')" class="input-form" />
    </el-form-item>
    <el-form-item v-if="form.type_part_group === 'vn'" :label="$t('delivery_lead_time')" prop="delivery_lead_time" :error="errors.delivery_lead_time">
      <el-input v-model="form.delivery_lead_time" :placeholder="$t('delivery_lead_time')" class="input-form" />
    </el-form-item>
    <el-form-item v-if="form.type_part_group === 'abroad'" :label="$t('lead_time')" prop="lead_time" :error="errors.lead_time">
      <el-input v-model="form.lead_time" :placeholder="$t('lead_time')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('ordering_cycle')" prop="ordering_cycle" :error="errors.ordering_cycle">
      <el-input v-model="form.ordering_cycle" :placeholder="$t('ordering_cycle')" class="input-form" />
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
import { checkTrimValue, alphaBe, checkDecimal, validNumberZero, validNumber } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: 'Part Group code' }},
          { max: 2, message: this.$t(10063), trigger: 'blur', messageParams: { max: 2, attribute: 'Part Group code' }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: 'Part Group Description' }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: 'Part Group Description' }},
          { max: 30, message: this.$t(10063), trigger: 'blur', messageParams: { max: 30, attribute: 'Part Group Description' }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        lead_time: [
          { required: false, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('lead_time') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('lead_time') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('lead_time') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('lead_time') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('lead_time') }},
          { max: 3, message: this.$t(10062), trigger: 'blur', messageParams: { max: 999, attribute: this.$t('lead_time') }}
        ],
        ordering_cycle: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ordering_cycle') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('ordering_cycle') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_cycle') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_cycle') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('ordering_cycle') }},
          { max: 1, message: this.$t(10062), trigger: 'blur', messageParams: { max: 9 }}
        ],
        delivery_lead_time: [
          { required: false, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('delivery_lead_time') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('delivery_lead_time') }},
          { validator: checkDecimal, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('delivery_lead_time') }},
          { validator: validNumberZero, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('delivery_lead_time') }},
          { validator: validNumber, message: this.$t('10108'), trigger: 'blur', messageParams: { attribute: this.$t('delivery_lead_time') }},
          { max: 2, message: this.$t(10062), trigger: 'blur', messageParams: { max: 99 }}
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
    },
    'form.type_part_group': {
      handler: function() {
        this.$refs.form.clearValidate()
        if (this.form.type_part_group === 'abroad') {
          this.rules.lead_time[0].required = true
          this.rules.delivery_lead_time[0].required = false
        }
      }
    }
  },
  created() {
    if (this.form.type_part_group === 'abroad') {
      this.rules.lead_time[0].required = true
      this.rules.delivery_lead_time[0].required = false
    } else {
      this.rules.delivery_lead_time[0].required = true
      this.rules.lead_time[0].required = false
    }
  },
  methods: {
    handleChangeTypePartGroup() {
      if (this.form.type_part_group === 'vn') {
        // this.form.lead_time = null
        this.rules.lead_time[0].required = false
        this.rules.delivery_lead_time[0].required = true
      } else {
        // this.form.delivery_lead_time = null
        this.rules.lead_time[0].required = true
        this.rules.delivery_lead_time[0].required = false
      }
      this.$refs.form.clearValidate()
    }
  }
}
</script>

