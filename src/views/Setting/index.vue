<template>
  <div class="app-container setting">

    <el-row>
      <el-col :span="24">
        <el-col :span="3">
          <div class="line-border-tab color-title-tab title-tab">{{ $t('general') }}</div>
        </el-col>
        <el-col :span="24">
          <p class="instruction">{{ $t('general_setting_title') }}</p>
        </el-col>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24" class="d-flex align-items-center">
        <div class="d-flex">
          <div>
            <el-time-picker
              v-model="lock_table_master.start_time"
              class="el-form-item mb-0"
              :class="startTimeClass()"
              arrow-control
              :picker-options="{
                format: 'HH:mm A'
              }"
              format="hh:mm A"
              value-format="HH:mm"
              placeholder="Start time"
              @blur="preValidateByEvent(__validateStartTime,__resetLockTimeError)"
              @change="preValidateByEvent(__validateStartTime,__resetLockTimeError)"
            />
            <div class="el-form-item__error setting-error">
              {{ errors.start_time }}
            </div>
          </div>

          <span class="range-separator">
            {{ $t('to') }}
          </span>

          <div class=".position-relative">
            <el-time-picker
              v-model="lock_table_master.end_time"
              class="el-form-item mb-0"
              :class="endTimeClass()"
              arrow-control
              :picker-options="{
                format: 'HH:mm A'
              }"
              format="hh:mm A"
              value-format="HH:mm"
              placeholder="End time"
              @blur="preValidateByEvent(__validateEndTime,__resetLockTimeError)"
              @change="preValidateByEvent(__validateEndTime,__resetLockTimeError)"
            />
            <div class="el-form-item__error setting-error error-end-time">
              {{ errors.end_time }}
            </div>
          </div>
        </div>

        <span class="unit-time">{{ $t('vts') }}</span>

        <el-button
          v-show="showSetting"
          style=" margin-left: 20px"
          :disabled="loading"
          size="large"
          type="primary"
          @click="saveLockTable()"
        >{{ $t('save') }}
        </el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px !important;">
      <el-col :span="24" class="mt-4rem" style="margin-top: 1rem !important;">
        <el-col :span="3">
          <div class="line-border-tab color-title-tab title-tab">{{ $t('mrp_setting') }}</div>
        </el-col>
        <el-col :span="24">
          <p class="instruction">{{ $t('mrp_setting_title') }}</p>
        </el-col>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="max_product"
          :placeholder="$t('Maximum number of cars produced/day')"
          class="setting-input-form"
          @blur="preValidateByEvent(__validateSaveMaxProduct,__resetMaxProductError)"
        />
        <el-button
          v-show="showSetting"
          style="margin-left: 20px"
          :disabled="loading_product"
          size="large"
          type="primary"
          @click="saveMaxProduct()"
        >{{ $t('save') }}
        </el-button>
        <div class="el-form-item__error setting-error">
          {{ errors.max_product }}
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import { index, update } from '@/api/master/setting'
import { fillAttributeToMessage, isStringEmpty } from '@/utils/validate'

export default {
  data() {
    return {
      loading_product: false,
      loading: false,
      showSetting: false,
      max_product: 0,
      lock_table_master: {
        start_time: '',
        end_time: ''
      },
      errors: {
        start_time: '',
        end_time: '',
        max_product: ''
      }
    }
  },
  created() {
    const permissions = this.$store.state.user.role.permissions
    this.showSetting = !!permissions.includes('setting.create')
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await index()

      const lock_table_master = data.filter((el) => {
        return el.key === 'lock_table_master'
      })
      const max_product = data.filter((el) => {
        return el.key === 'max_product'
      })

      this.max_product = max_product[0].value

      const start_time = lock_table_master[0].value.start_time
      const end_time = lock_table_master[0].value.end_time
      this.lock_table_master = {
        start_time: this.__convertTimeToUTC(start_time, -7),
        end_time: this.__convertTimeToUTC(end_time, -7)
      }
    },

    async saveLockTable() {
      this.__resetLockTimeError()
      this.loading = true
      try {
        if (!this.__validateSaveLock()) {
          const payload = {
            start_time: this.__convertTimeToUTC(this.lock_table_master.start_time, 7),
            end_time: this.__convertTimeToUTC(this.lock_table_master.end_time, 7)
          }
          await update({ key: 'lock_table_master', value: payload })
          this.messageSuccess()
          this.loading = false
        }
      } finally {
        this.loading = false
      }
    },

    __validateSaveLock() {
      let hasError = false
      if (this.__validateStartTime()) {
        hasError = true
      }
      if (this.__validateEndTime()) {
        hasError = true
      }

      return hasError
    },

    __validateStartTime() {
      let hasError = false
      if (isStringEmpty(this.lock_table_master.start_time)) {
        this.errors.start_time = fillAttributeToMessage('', 10080)
        hasError = true
      }
      return hasError
    },

    __validateEndTime() {
      let hasError = false
      if (isStringEmpty(this.lock_table_master.end_time)) {
        this.errors.end_time = fillAttributeToMessage('', 10080)
        hasError = true
      }

      return hasError
    },

    __resetLockTimeError() {
      this.errors.start_time = ''
      this.errors.end_time = ''
    },

    __resetMaxProductError() {
      this.errors.max_product = ''
    },

    __convertTimeToUTC(time, offsetTime = 7) {
      const splitTime = time.split(':')
      const hoursSource = parseInt(splitTime[0])
      offsetTime = parseInt(offsetTime)

      let minutes = parseInt(splitTime[1])
      let hoursUTC = hoursSource
      if (offsetTime > 0) {
        hoursUTC = hoursSource >= offsetTime ? hoursSource - offsetTime : (24 + hoursSource) - offsetTime
      } else {
        const offsetTimeAbs = offsetTime * (-1)
        hoursUTC = hoursSource + offsetTimeAbs >= 24 ? hoursSource + offsetTimeAbs - 24 : hoursSource + offsetTimeAbs
      }

      hoursUTC = hoursUTC < 10 ? `0${hoursUTC}` : hoursUTC
      minutes = minutes < 10 ? `0${minutes}` : minutes

      return `${hoursUTC}:${minutes}`
    },

    async saveMaxProduct() {
      this.loading_product = true
      this.__resetMaxProductError()
      try {
        if (!this.__validateSaveMaxProduct()) {
          await update({ key: 'max_product', value: parseInt(this.max_product) })
          this.messageSuccess()
          this.loading_product = false
        }
      } catch (e) {
        try {
          const code = e.data?.value?.code
          if (code !== null && code !== 'undefined') {
            this.errors.max_product = fillAttributeToMessage('Maximum number of cars', code)
          }
        } finally {
          console.log('Not access object')
        }
      } finally {
        this.loading_product = false
      }
    },

    preValidateByEvent(fncValidate, fncResetError) {
      if (!fncValidate()) {
        fncResetError()
      }
    },

    __validateSaveMaxProduct() {
      const hasError = false
      if (isStringEmpty(this.max_product)) {
        this.errors.max_product = 'The field is required.'
        return true
      }
      if (!Number.isInteger(+this.max_product)) {
        this.errors.max_product = 'The Maximum number of cars must be a positive integer'
        return true
      }

      if (this.max_product > 9999) {
        this.errors.max_product = fillAttributeToMessage('Maximum number of cars', 10063, { ':max': 9999 })
        return true
      }

      if (this.max_product < 1) {
        this.errors.max_product = 'The Maximum number of cars must be a positive integer'
        return true
      }

      return hasError
    },

    messageSuccess() {
      this.$message({
        message: this.$t('edit_success'),
        type: 'success'
      })
    },

    startTimeClass() {
      let attachClass = ''
      if (this.errors.start_time) {
        attachClass = 'is-error'
      }

      return attachClass
    },

    endTimeClass() {
      let attachClass = ''
      if (this.errors.end_time) {
        attachClass = 'is-error'
      }

      return attachClass
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  margin-top: .5rem;
}

.setting b {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 25px;
  border-bottom: 1px solid;
  color: #303133;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
}

.instruction {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
}

.setting span {
  color: #606266;
  font-weight: 400;
  font-size: 14px;
}

.unit-time {
  margin-left: 10px;
}

.title-tab {
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}
.range-separator {
  line-height: 36px;
  margin-left: 20px;
  margin-right: 20px;
}
.setting-input-form {
  width: 543px;
}
.setting-error {
  margin-left: 10px;
}
.error-end-time {
  position: absolute;
  left: 275px;
}
</style>

