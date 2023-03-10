<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('procurement_supplier_code')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :placeholder="$t('procurement_supplier_code')" :disabled="editing" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('procurement_supplier_code_description')" prop="description" :error="errors.description">
      <el-input v-model="form.description" :placeholder="$t('procurement_supplier_code_description')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('address_procurement_supplier')" prop="address" :error="errors.address">
      <el-input v-model="form.address" :placeholder="$t('address_procurement_supplier')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('phone_no_procurement_supplier')" prop="phone" :error="errors.phone">
      <el-input v-model="form.phone" :placeholder="$t('phone_no_procurement_supplier')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('number_of_forecast_by_week')" prop="forecast_by_week" :error="errors.forecast_by_week">
      <el-select
        v-model="form.forecast_by_week"
        :loading="loading_search"
        class="input-form"
        clearable
        filterable
        :placeholder="$t('number_of_forecast_by_week')"
        :no-match-text="$t('no_data2')"
        style="width: 100%"
      >
        <el-option
          v-for="item in [1,2,3,4,5]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('number_of_forecast_by_month')" prop="forecast_by_month" :error="errors.forecast_by_month">
      <el-select
        v-model="form.forecast_by_month"
        :loading="loading_search"
        class="input-form"
        clearable
        filterable
        :placeholder="$t('number_of_forecast_by_month')"
        :no-match-text="$t('no_data2')"
        style="width: 100%"
      >
        <el-option
          v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('receiver')" prop="receiver" :error="errors.receiver">
      <el-input-tag v-model="form.receiver" :placeholder="$t('receiver')" clearable class="input-form el-input_tags" />
    </el-form-item>
    <el-form-item :label="$t('bcc')" prop="bcc" :error="errors.bcc">
      <el-input-tag v-model="form.bcc" :placeholder="$t('bcc')" clearable class="input-form el-input_tags" />
    </el-form-item>
    <el-form-item :label="$t('cc')" prop="cc" :error="errors.cc">
      <el-input-tag v-model="form.cc" :placeholder="$t('cc')" clearable class="input-form el-input_tags" />
    </el-form-item>
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark">
      <el-input
        v-model="form.remark"
        type="textarea"
        :autosize="{ minRows: 3}"
        :placeholder="$t('remark')"
        class="input-form"
      />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { checkTrimValue, alphaBe } from '@/utils/validate'
import { ElInputTag } from 'el-input-tag'
export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  // eslint-disable-next-line vue/order-in-components
  components: { ElInputTag },
  data() {
    var checkPhoneNumber = (rule, value, callback) => {
      if (value) {
        const regExp = /^[0-9 ()+-]+$/
        if (value.match(regExp)) {
          callback()
        } else {
          callback(new Error((10073)))
        }
      } else {
        callback()
      }
    }
    return {
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('procurement_supplier_code') }},
          { max: 5, message: this.$t(10063), trigger: 'blur', messageParams: { max: 5, attribute: this.$t('procurement_supplier_code') }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('procurement_supplier_code_description') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('procurement_supplier_code_description') }},
          { max: 20, message: this.$t(10063), trigger: 'blur', messageParams: { max: 20, attribute: this.$t('procurement_supplier_code_description') }},
          { validator: checkTrimValue, trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('address_procurement_supplier') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('address_procurement_supplier') }},
          { max: 50, message: this.$t(10063), trigger: 'blur', messageParams: { max: 50, attribute: this.$t('address_procurement_supplier') }}
        ],
        phone: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('phone_no_procurement_supplier') }},
          { validator: checkPhoneNumber, message: this.$t(10079), trigger: 'blur', messageParams: { attribute: this.$t('phone_no_procurement_supplier') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('phone_no_procurement_supplier') }},
          { min: 9, message: this.$t(10069), trigger: 'blur', messageParams: { min: 9, attribute: this.$t('phone_no_procurement_supplier') }},
          { max: 15, message: this.$t(10063), trigger: 'blur', messageParams: { max: 15, attribute: this.$t('phone_no_procurement_supplier') }}
        ],
        forecast_by_week: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('number_of_forecast_by_week') }), trigger: 'change' }
        ],
        forecast_by_month: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('number_of_forecast_by_month') }), trigger: 'change' }
        ],
        receiver: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('receiver') }), trigger: 'change' }
        ],
        bcc: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('bcc') }), trigger: 'change' }
        ],
        cc: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('cc') }), trigger: 'change' }
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
        if (this.form.code !== null) { this.form.code = this.form.code.toUpperCase() }
      }
    },
    'errors': {
      handler: function() {
        if (this.errors.bcc) {
          const regex = /^The .+\.(\d+) must be a valid email address.$/
          const match = regex.exec(this.errors.bcc)
          if (match.length > 1) {
            const index = match[1]
            const value = this.form.bcc[index]
            const errorTextBcc = 'The ' + value + ' must be a valid email address.'
            this.errors.bcc = errorTextBcc
          }
        }
        if (this.errors.cc) {
          const regex = /^The .+\.(\d+) must be a valid email address.$/
          const match = regex.exec(this.errors.cc)
          if (match.length > 1) {
            const index = match[1]
            const value = this.form.cc[index]
            const errorTextCc = 'The ' + value + ' must be a valid email address.'
            this.errors.cc = errorTextCc
          }
        }
        if (this.errors.receiver) {
          const regex = /^The .+\.(\d+) must be a valid email address.$/
          const match = regex.exec(this.errors.receiver)
          if (match.length > 1) {
            const index = match[1]
            const value = this.form.receiver[index]
            const errorTextReceiver = 'The ' + value + ' must be a valid email address.'
            this.errors.receiver = errorTextReceiver
          }
        }
      },
      deep: true
    }

  }
}
</script>

<style lang="scss" scoped>
.input-tag-wrapper{
  padding: 0 10px 0 15px !important;
}
::v-deep {
  .el-input_tags .el-tag {
    white-space: pre-line;
  }
  .input-form {
    width: 460px;
  }
}
@media(max-width: 940px) {
  .input-form {
    width: 100% !important;
  }
}
</style>
