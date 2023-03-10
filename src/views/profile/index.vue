<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-form" label-position="left">
      <el-tooltip v-model="capsTooltip" :content="this.$t('content_caps_lock')" placement="right" manual>
        <el-form-item prop="password_old" :error="error_current">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordTypeCurrent"
            ref="password"
            v-model="form.password_old"
            :type="passwordTypeCurrent"
            :placeholder="this.$t('current_password')"
            name="password_old"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd('current')">
            <svg-icon color="#606266" :icon-class="passwordTypeCurrent === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsTooltip" :content="this.$t('content_caps_lock')" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordTypeNew"
            ref="password"
            v-model="form.password"
            :type="passwordTypeNew"
            :placeholder="this.$t('new_password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd('new')">
            <svg-icon color="#606266" :icon-class="passwordTypeNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip" :content="this.$t('content_caps_lock')" placement="right" manual>
        <el-form-item prop="password_match" :error="error_not_match">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordTypeReNew"
            ref="password_match"
            v-model="form.password_match"
            :type="passwordTypeReNew"
            :placeholder="this.$t('password_confirmation')"
            name="password_match"
            tabindex="2"
            autocomplete="on"
            @change="error_not_match=null"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd('')">
            <svg-icon color="#606266" :icon-class="passwordTypeReNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button class="text-login login-btn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleClick">{{ $t('save') }}</el-button>
    </el-form>

  </div>
</template>

<script>
import { changePassword } from '@/api/user'

export default {
  name: 'Profile',
  data() {
    return {
      rules: {
        password_old: [{ required: true, message: this.$t('input_required'), trigger: 'blur' }],
        password: [
          { required: true, message: this.$t('input_required'), trigger: 'blur' },
          { min: 6, message: this.$t('min_length') + '6 ' + this.$t('characters'), trigger: 'blur' }
        ],
        password_match: [{ required: true, message: this.$t('input_required'), trigger: 'blur' }]
      },
      passwordTypeReNew: 'password',
      passwordTypeNew: 'password',
      passwordTypeCurrent: 'password',
      capsTooltip: false,
      loading: false,
      error_not_match: null,
      error_current: null,
      form: {
        password_old: null,
        password: null,
        password_match: null
      }
    }
  },

  methods: {
    showPwd(type) {
      switch (type) {
        case 'current': if (this.passwordTypeCurrent === 'password') {
          this.passwordTypeCurrent = ''
        } else {
          this.passwordTypeCurrent = 'password'
        }
          this.$nextTick(() => {
            this.$refs.password.focus()
          })
          break
        case 'new': if (this.passwordTypeNew === 'password') {
          this.passwordTypeNew = ''
        } else {
          this.passwordTypeNew = 'password'
        }
          this.$nextTick(() => {
            this.$refs.password.focus()
          })
          break
        default: if (this.passwordTypeReNew === 'password') {
          this.passwordTypeReNew = ''
        } else {
          this.passwordTypeReNew = 'password'
        }
          this.$nextTick(() => {
            this.$refs.password_match.focus()
          })
          break
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    async submit() {
      try {
        this.loading = true
        await changePassword({ password: this.form.password, current_password: this.form.password_old })
        this.$message({
          message: this.$t('edit_success'),
          type: 'success'
        })
        this.loading = false
        this.logout()
      } catch (e) {
        console.log(e)
        this.error_current = e.message
        this.loading = false
      }
    },
    handleClick() {
      this.error_not_match = ''
      this.error_current = ''
      this.$refs.form.validate(valid => {
        if (valid) {
          (this.form.password !== this.form.password_match) ? this.error_not_match = this.$t('not_match_pass') : this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#fff;
$light_gray:#00000040;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: #FFFFFF;
    border: 1px solid #E0E5ED;
    border-radius: 2px;
  }

  .login-btn {
    background-color: #409EFF ;
  }

  .text-login{
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */
    color: #FFFFFF ;
  }
}
</style>

<style lang="scss" scoped>
$bg:#FFF;
$dark_gray:#fff;
$light_gray:#fff;
$blue:#0050B3;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $blue;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto 40px auto;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
