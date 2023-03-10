<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item :label="$t('user_code')" prop="code" :error="errors.code">
      <el-input v-model="form.code" :disabled="editing" :placeholder="$t('user_code')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('user_name')" prop="name" :error="errors.name">
      <el-input v-model="form.name" :placeholder="$t('user_name')" clearable class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('company')" prop="company" :error="errors.company">
      <el-input v-model="form.company" :placeholder="$t('company')" class="input-form" />
    </el-form-item>
    <el-form-item :label="$t('role_name')" prop="role" :error="errors.role">
      <el-select
        v-model="form.role"
        clearable
        multiple
        multiple-limit="2"
        class="input-form"
        filterable
        :placeholder="$t('role_name')"
        no-match-text="No data"
        style="width: 100%"
      >
        <el-option
          v-for="item in options.roles"
          :key="item.id"
          :label="firstCharUpper(item.code)"
          :value="item.code"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="editing" :label="$t('reset_default_password')">
      <el-checkbox v-model="form.password_default" :label="$t('reset_default_password')" />
    </el-form-item>
    <el-form-item v-else :label="$t('password')" prop="password" :error="errors.password">
      <el-input v-model="form.password" :type="passwordType" :placeholder="$t('password')" class="input-form">
        <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd" />
      </el-input>
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
import { validUserCode } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      passwordType: 'password',
      rules: {
        code: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('user_code') }},
          { max: 7, message: this.$t(10063), trigger: 'blur', messageParams: { max: 7, attribute: this.$t('user_code') }},
          { validator: validUserCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('user_name') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('user_name') }},
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255, attribute: this.$t('user_name') }}
        ],
        company: [
          { required: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('company') }},
          { whitespace: true, message: this.$t(10080), trigger: 'blur', messageParams: { attribute: this.$t('company') }},
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255, attribute: this.$t('company') }}
        ],
        role: [
          { required: true, message: this.$t('the_field_is_required', { field: this.$t('role_name') }), trigger: 'change' }
        ],
        password: [
          { max: 16, message: this.$t(10063), trigger: 'blur', messageParams: { max: 16 }}
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }}
        ]
      }
    }
  },
  beforeDestroy() {
    this.passwordType = 'password'
  },
  methods: {
    firstCharUpper(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    }
  }
}
</script>

<style>
  .el-icon-view {
    cursor: pointer;
  }
</style>

