<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- warehouse_code -->
    <el-form-item :label="$t('warehouse_code')" prop="warehouse_code" :error="errors.warehouse_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.warehouse_code"
        :disabled="editing"
        filterable
        :placeholder="$t('warehouse_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
        reserve-keyword
        :remote-method="remoteWH"
        @visible-change="remoteWH('')"
        @change="fetchOldQuantity"
      >
        <el-option
          v-for="item in options.warehouse_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
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
        clearable
        reserve-keyword
        :remote-method="remotePart"
        @visible-change="remotePart('')"
        @change="changePartCode"
      >
        <el-option
          v-for="item in options.part_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- part_color_code -->
    <el-form-item :label="$t('part_color_code')" prop="part_color_code" :error="errors.part_color_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.part_color_code"
        :disabled="editing"
        filterable
        :placeholder="$t('part_color_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
        reserve-keyword
        :remote-method="remotePartColor"
        @visible-change="remotePartColor('')"
        @change="fetchOldQuantity"
      >
        <el-option
          v-for="item in options.part_color_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- old_quantity -->
    <el-form-item :label="$t('old_quantity')" prop="old_quantity" :error="errors.old_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.old_quantity" :disabled="true" placeholder="" class="input-form" />
    </el-form-item>
    <!-- adjustment_quantity -->
    <el-form-item :label="$t('adjustment_quantity')" prop="adjustment_quantity" :error="errors.adjustment_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.adjustment_quantity" :placeholder="$t('adjustment_quantity')" class="input-form" @blur="calculateNewQuantity()" />
      <!-- <el-input-number
        v-model="form.adjustment_quantity"
        class="input-form"
        :placeholder="$t('adjustment_quantity')"
        step-strictly
        @blur="calculateNewQuantity()"
      /> -->
    </el-form-item>
    <!-- new_quantity -->
    <el-form-item :label="$t('new_quantity')" prop="new_quantity" :error="errors.new_quantity" :label-width="formLabelWidth">
      <el-input v-model="form.new_quantity" :disabled="true" placeholder="" class="input-form" />
    </el-form-item>
    <!-- plant_code -->
    <el-form-item :label="$t('plant_code')" prop="plant_code" :error="errors.plant_code" :label-width="formLabelWidth">
      <el-select
        v-model="form.plant_code"
        :disabled="editing"
        filterable
        :placeholder="$t('plant_code')"
        class="input-form"
        :loading="loading_search"
        remote
        clearable
        reserve-keyword
        :remote-method="remotePlant"
        @visible-change="remotePlant('')"
        @change="fetchOldQuantity"
      >
        <el-option
          v-for="item in options.plant_code"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- remark -->
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>
</template>

<script>
import createMixin from '@/mixins/crud/create'
import { index as summaryList } from '@/api/inventory/wh_inventory_summary'
import { isNumber, checkNumberWHAdjustment, validNumberMax } from '@/utils/validate'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin()],
  data() {
    return {
      rules: {
        warehouse_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        part_color_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        adjustment_quantity: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: checkNumberWHAdjustment, message: this.$t(10073), trigger: 'change' },
          { validator: validNumberMax, max: 4, trigger: 'change' }
        ],
        plant_code: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        remark: [
          { max: 255, message: this.$t(10062), trigger: 'blur', messageParams: { max: 255 }}
        ]
      }
    }
  },
  watch: {
    'form.adjustment_quantity': {
      handler: function() {
        if (this.form.adjustment_quantity) {
          this.form.adjustment_quantity = this.form.adjustment_quantity.trim().replace('.', '')
        }
      }
    }
  },
  methods: {
    remotePart(query) {
      this.options.part_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_code', params: { code: query, plant_code: this.form.plant_code }})
      }, 100)
    },
    remoteWH(query) {
      this.options.warehouse_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'warehouse_code', params: { code: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plant_code', params: { code: query }})
      }, 100)
    },
    remotePartColor(query) {
      this.options.part_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_color_code', params: { code: query, part_code: this.form.part_code, search_like: false }})
      }, 100)
    },
    async fetchOldQuantity() {
      try {
        if (this.__validToGetOldQuantity()) {
          const { part_code, part_color_code, warehouse_code, plant_code } = this.form
          const res = await summaryList({ part_code, part_color_code, warehouse_code, plant_code })
          const data = res.data
          if (data != null && data.length !== 0) {
            this.form.old_quantity = data[0].quantity
          } else {
            this.form.old_quantity = 0
          }
        } else {
          this.form.old_quantity = null
        }

        this.calculateNewQuantity()
      } catch (e) {
        console.log(e)
      }
    },
    calculateNewQuantity() {
      if (this.__validToCalculateNewQuantity()) {
        const adjQuantity = this.form.adjustment_quantity == null ? 0 : this.form.adjustment_quantity
        this.form.new_quantity = parseInt(this.form.old_quantity) + parseInt(adjQuantity)
      } else {
        this.form.new_quantity = null
      }
    },
    __validToCalculateNewQuantity() {
      return this.__validToGetOldQuantity() && isNumber(this.form.adjustment_quantity + '')
    },
    __validToGetOldQuantity() {
      return this.form.warehouse_code && this.form.part_code && this.form.part_color_code && this.form.plant_code
    },
    changePartCode() {
      this.form.part_color_code = null
      this.fetchOldQuantity()
      this.calculateNewQuantity()
    }
  }
}
</script>

<style scoped>
.input-form-impo{
  width: 375px !important;
}
</style>
