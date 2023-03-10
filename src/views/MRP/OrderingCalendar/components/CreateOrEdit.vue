<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <!-- contract_no -->
    <el-form-item
      :label="$t('contract_no')"
      prop="contract_code"
      :error="errors.contract_code"
      :label-width="formLabelWidth"
    >
      <el-input
        v-model="form.contract_code"
        filterable
        :disabled="editing"
        :placeholder="$t('contract_no')"
        class="input-form"
      />
    </el-form-item>
    <!-- part_group -->
    <el-form-item :label="$t('part_group')" prop="part_group" :error="errors.part_group" :label-width="formLabelWidth">
      <el-input
        v-if="editing"
        :value="form.part_group"
        filterable
        :disabled="true"
        :placeholder="$t('part_group')"
        class="input-form"
      />
      <el-select
        v-else
        v-model="form.part_group"
        filterable
        :disabled="editing"
        :placeholder="$t('part_group')"
        class="input-form"
        :loading="loading_search"
        remote
        reserve-keyword
        :remote-method="remotePartGroups"
        @visible-change="remotePartGroups('')"
      >
        <el-option
          v-for="item in options.part_group"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- status -->
    <el-form-item :label="$t('status')" prop="status" :error="errors.status" :label-width="formLabelWidth">
      <el-input
        v-if="editing"
        :value="form.status | getStatusMRPOrderingCalendar"
        filterable
        :disabled="true"
        :placeholder="$t('part_group')"
        class="input-form"
      />
      <el-select
        v-else
        v-model="form.status"
        filterable
        :disabled="true"
        :placeholder="$t('status')"
        class="input-form"
      >
        <el-option
          v-for="item in statusMRPOrderingCalendar"
          :key="item"
          :label="item | getStatusMRPOrderingCalendar"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <!-- etd -->
    <el-form-item :label="$t('etd')" prop="etd" :error="errors.etd" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.etd"
        class="input-form"
        type="date"
        :placeholder="$t('etd')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :disabled="isEditingAndStatusDone"
        @change="reValidateEta()"
      />
    </el-form-item>
    <!-- eta -->
    <el-form-item ref="formEta" :label="$t('eta')" prop="eta" :error="errors.eta" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.eta"
        class="input-form"
        type="date"
        :placeholder="$t('eta')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :picker-options="{ disabledDate: (time) => disabledEndDate(time) }"
      />
    </el-form-item>
    <!-- target_plan_from -->
    <el-form-item
      ref="target_plan_from"
      class="form-item-week span-form"
      :label="$t('target_plan_from')"
      prop="target_plan_from"
      :error="errors.target_plan_from"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_target_plan_from.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('target_plan_from')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('target_plan_from')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_target_plan_from.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('target_plan_from')"
          >
            <el-option
              v-for="item in form.__week_target_plan_from.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- target_plan_to -->
    <el-form-item
      ref="target_plan_to"
      class="form-item-week span-form"
      :label="$t('target_plan_to')"
      prop="target_plan_to"
      :error="errors.target_plan_to"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_target_plan_to.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('target_plan_to')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('target_plan_to')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_target_plan_to.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('target_plan_to')"
          >
            <el-option
              v-for="item in form.__week_target_plan_to.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- order_span_from -->
    <el-form-item
      ref="order_span_from"
      class="form-item-week"
      :label="$t('supplier_order_span_from')"
      prop="order_span_from"
      :error="errors.order_span_from"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_order_span_from.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('supplier_order_span_from')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('order_span_from')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_order_span_from.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('order_span_from')"
          >
            <el-option
              v-for="item in form.__week_order_span_from.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- order_span_to -->
    <el-form-item
      ref="order_span_to"
      class="form-item-week"
      :label="$t('supplier_order_span_to')"
      prop="order_span_to"
      :error="errors.order_span_to"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_order_span_to.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('supplier_order_span_to')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('order_span_to')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_order_span_to.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('order_span_to')"
          >
            <el-option
              v-for="item in form.__week_order_span_to.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- mrp_run_at -->
    <el-form-item :label="$t('mrp_run_at')" prop="mrp_or_run" :error="errors.mrp_or_run" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.mrp_or_run"
        class="input-form"
        type="date"
        :placeholder="$t('mrp_run_at')"
        style="width: 100%"
        value-format="yyyy-MM-dd"
        format="dd/MM/yyyy"
        :disabled="isEditingAndStatusDone"
      />
    </el-form-item>
    <!-- buffer_span_from -->
    <el-form-item
      ref="buffer_span_from"
      class="form-item-week"
      :label="$t('buffer_span_from')"
      prop="buffer_span_from"
      :error="errors.buffer_span_from"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_buffer_span_from.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('buffer_span_from')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('buffer_span_from')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_buffer_span_from.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('buffer_span_from')"
          >
            <el-option
              v-for="item in form.__week_buffer_span_from.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>

    <!-- buffer_span_to -->
    <el-form-item
      ref="buffer_span_to"
      class="form-item-week"
      :label="$t('buffer_span_to')"
      prop="buffer_span_to"
      :error="errors.buffer_span_to"
      :label-width="formLabelWidth"
    >
      <el-row>
        <el-col :span="11">
          <el-date-picker
            v-model="form.__week_buffer_span_to.month"
            style="width: 100% !important;"
            class="input-form"
            type="month"
            :placeholder="$t('buffer_span_to')"
            value-format="M|yyyy"
            format="MM/yyyy"
            :disabled="isEditingAndStatusDone"
            @change="changeMonthForWeek('buffer_span_to')"
          />
        </el-col>
        <el-col :span="12" :offset="1">
          <el-select
            v-model="form.__week_buffer_span_to.week"
            style="width: 100% !important;"
            :placeholder="$t('week')"
            class="input-form"
            :disabled="isEditingAndStatusDone"
            @change="changeWeek('buffer_span_to')"
          >
            <el-option
              v-for="item in form.__week_buffer_span_to.options"
              :key="item"
              :label="$t(`mrp_ordering_calendar_week.${item}`)"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- remark -->
    <el-form-item :label="$t('remark')" prop="remark" :error="errors.remark" :label-width="formLabelWidth">
      <el-input v-model="form.remark" type="textarea" class="input-form" :rows="3" :placeholder="$t('remark')" />
    </el-form-item>
  </el-form>

</template>

<script>
import createMixin from '@/mixins/crud/create'
import { __arrayStatusMRPOrderingCalendar, statusMRPOrderingCalendar } from '@/utils/constant'
import { addDays, getTotalWeekByMonthYear } from '@/utils/datetime'
import { alphaBe, checkTrimValue, customRequired, fillAttributeToMessage } from '@/utils/validate'
import { formatDateTime } from '@/filters'

export default {
  name: 'CreateOrEdit',
  mixins: [createMixin(true)],
  props: ['passFormData', 'isOpenForm'],
  data() {
    return {
      statusMRPOrderingCalendar: __arrayStatusMRPOrderingCalendar,
      statusMRPOrderingCalendarObj: statusMRPOrderingCalendar,
      rules: {
        contract_code: [
          { required: true, message: this.$t(10080), trigger: 'blur' },
          { whitespace: true, message: this.$t(10080), trigger: 'blur' },
          { max: 9, message: this.$t(10063), trigger: 'blur', messageParams: { max: 9 }},
          { validator: alphaBe, trigger: 'blur' }
        ],
        part_group: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        etd: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: this.validEtaAfterEta, trigger: 'change' }
        ],
        eta: [
          { required: true, message: this.$t(10080), trigger: 'change' },
          { validator: this.validEtaAfterEtd, trigger: 'change' }
        ],
        target_plan_from: [
          { validator: customRequired, required_status: true, trigger: 'change' },
          { validator: this.reValidateField, fieldRef: 'target_plan_to', fieldTrigger: 'change', trigger: 'change', ignores: { required: true }}
        ],
        target_plan_to: [
          { validator: customRequired, required_status: true, trigger: 'change' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'target_plan_from', to: 'target_plan_to' },
          { validator: this.reValidateField, fieldRef: 'buffer_span_from', fieldTrigger: 'change', trigger: 'change' }
        ],
        order_span_from: [
          { validator: customRequired, required_status: false, trigger: 'change' },
          { validator: this.validRequiredWith, name: 'order_span_from', with: 'order_span_to', trigger: 'change' },
          { validator: this.reValidateField, fieldRef: 'order_span_to', fieldTrigger: 'change', trigger: 'change' }
        ],
        order_span_to: [
          { validator: customRequired, required_status: false, trigger: 'change' },
          { validator: this.validRequiredWith, name: 'order_span_to', with: 'order_span_from', trigger: 'change' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'order_span_from', to: 'order_span_to' }
        ],
        mrp_or_run: [
          { required: true, message: this.$t(10080), trigger: 'change' }
        ],
        buffer_span_from: [
          { validator: customRequired, required_status: false, trigger: 'change' },
          { validator: this.validRequiredWith, name: 'buffer_span_from', with: 'buffer_span_to', trigger: 'change' },
          { validator: this.reValidateField, fieldRef: 'buffer_span_to', fieldTrigger: 'change', trigger: 'change' },
          { validator: this.weekNext, trigger: 'change', from: 'target_plan_to', to: 'buffer_span_from' }
        ],
        buffer_span_to: [
          { validator: customRequired, required_status: false, trigger: 'change' },
          { validator: this.validRequiredWith, name: 'buffer_span_to', with: 'buffer_span_from', trigger: 'change' },
          { validator: this.validWeekFromTo, trigger: 'change', from: 'buffer_span_from', to: 'buffer_span_to' }
        ],
        remark: [
          { max: 255, message: this.$t(10063), trigger: 'blur', messageParams: { max: 255 }},
          { validator: checkTrimValue, trigger: 'blur' }
        ]

      },
      form: {}
    }
  },
  computed: {
    isEditingAndStatusDone() {
      return this.editing && this.form.status === this.statusMRPOrderingCalendarObj.DONE
    }
  },
  watch: {
    isOpenForm: function() {
      this.__createCurrentForm()
    },
    'form.contract_code': {
      handler: function() {
        if (this.form.contract_code) {
          this.form.contract_code = this.form.contract_code.trim().toUpperCase()
        }
      }
    },
    'form.__week_order_span_from.month': {
      handler: function() {
        if (this.form.__week_order_span_from.month) {
          this.rules.order_span_from[0].required_status = true
        } else {
          this.rules.order_span_from[0].required_status = false
        }
      }
    },
    'form.__week_order_span_to.month': {
      handler: function() {
        if (this.form.__week_order_span_to.month) {
          this.rules.order_span_to[0].required_status = true
        } else {
          this.rules.order_span_to[0].required_status = false
        }
      }
    },
    'form.__week_buffer_span_from.month': {
      handler: function() {
        if (this.form.__week_buffer_span_from.month) {
          this.rules.buffer_span_from[0].required_status = true
        } else {
          this.rules.buffer_span_from[0].required_status = false
        }
      }
    },
    'form.__week_buffer_span_to.month': {
      handler: function() {
        if (this.form.__week_buffer_span_to.month) {
          this.rules.buffer_span_to[0].required_status = true
        } else {
          this.rules.buffer_span_to[0].required_status = false
        }
      }
    }
  },
  created() {
    this.form = { ...this.__getBlankFormObj() }
  },
  mounted() {
    this.__createCurrentForm()
  },
  methods: {
    __createCurrentForm() {
      const fieldWeek = ['buffer_span_from', 'buffer_span_to', 'order_span_from',
        'order_span_to', 'target_plan_from', 'target_plan_to']

      if (this.editing) {
        this.form = { ...this.__getBlankFormObj(), ...this.passFormData }
        this.form.eta = this.form.eta.item ?? this.form.eta
        this.form.etd = this.form.etd.item ?? this.form.etd
        this.form.mrp_or_run = this.form.mrp_or_run.item ?? this.form.mrp_or_run

        fieldWeek.forEach(fieldName => {
          const weekRegex = new RegExp('W\\d*-\\d*/\\d*', 'g')
          const fieldTrim = (this.form[fieldName] + '').trim()

          if (fieldTrim && weekRegex.test(fieldTrim)) {
            const { week, month_year } = this.__splitWeekResponse(this.form[fieldName])

            if (week && month_year) {
              this.form[`__week_${fieldName}`].month = month_year.replace('/', '|')
              this.changeMonthForWeek(fieldName)
              this.form[`__week_${fieldName}`].week = parseInt(week)
              this.changeWeek(fieldName)
            }
          }
        })
      } else {
        this.form = { ...this.__getBlankFormObj() }
        this.form.status = statusMRPOrderingCalendar.WAIT
      }
    },
    __getBlankFormObj() {
      return {
        buffer_span_from: null,
        buffer_span_to: null,
        contract_code: null,
        eta: null,
        etd: null,
        id: null,
        mrp_or_run: null,
        order_span_from: null,
        order_span_to: null,
        part_group: null,
        status: null,
        target_plan_from: null,
        target_plan_to: null,
        user_code: null,
        username: null,
        created_at: null,
        updated_at: null,
        remark: null,

        __week_buffer_span_from: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        },
        __week_buffer_span_to: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        },
        __week_order_span_from: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        },
        __week_order_span_to: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        },
        __week_target_plan_from: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        },
        __week_target_plan_to: {
          month: '',
          week: '',
          options: [],
          week_detail: ''
        }
      }
    },
    __splitWeekResponse(week) {
      try {
        const weekTrim = (week + '').trim()
        if (weekTrim) {
          const weekAndMonth = weekTrim.split('-')
          return {
            week: weekAndMonth[0].match(/(\d+)/)[0],
            month_year: weekAndMonth[1]
          }
        } else {
          return {
            week: null,
            month_year: null
          }
        }
      } catch (e) {
        return {
          week: null,
          month_year: null
        }
      }
    },
    remotePartGroups(query) {
      this.options.part_group = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'part_group', params: { code: query }})
      }, 100)
    },

    changeMonthForWeek(fieldName, splitMonthYearCharacter = '|') {
      const monthYearObj = this.__arraySplitMonthYear(fieldName, splitMonthYearCharacter)
      if (monthYearObj.month && monthYearObj.year) {
        const { total_week, week_detail } = getTotalWeekByMonthYear(monthYearObj.month, monthYearObj.year)

        this.form[`__week_${fieldName}`].options = []

        for (let indexWeek = 1; indexWeek <= total_week; indexWeek++) {
          this.form[`__week_${fieldName}`].options.push(indexWeek)
        }

        this.form[`__week_${fieldName}`].week_detail = week_detail
        this.form[`__week_${fieldName}`].week = null
        this.form[fieldName] = null
      } else {
        this.form[`__week_${fieldName}`].options = []
        this.form[`__week_${fieldName}`].month = null
        this.form[`__week_${fieldName}`].week = null
        this.form[fieldName] = null
      }
    },

    changeWeek(fieldName) {
      const dateObj = this.form[`__week_${fieldName}`].week_detail[this.form[`__week_${fieldName}`].week].firstDay

      this.form[fieldName] = formatDateTime(dateObj, 'y-m-d')
    },

    __arraySplitMonthYear(fieldName, splitCharacter = '|') {
      if (!this.form[`__week_${fieldName}`].month) {
        return {
          month: null,
          year: null
        }
      }
      const arrayMonthYear = this.form[`__week_${fieldName}`].month.split(splitCharacter)
      return {
        month: arrayMonthYear[0],
        year: arrayMonthYear[1]
      }
    },

    disabledEndDate(time) {
      return !((new Date(time)).getTime() > (new Date()).getTime())
    },

    validEtaAfterEtd(rule, value, callback) {
      if (this.form.etd && this.form.eta) {
        if (((new Date(this.form.etd)).getTime() > (new Date(this.form.eta)).getTime())) {
          callback(new Error(fillAttributeToMessage('ETA', '10004', { ':date': 'ETD' })))
        } else {
          this.errors.eta = ''
          this.errors.etd = ''
          callback()
        }
      } else {
        callback()
      }
    },

    validEtaAfterEta(rule, value, callback) {
      if (this.form.etd && this.form.eta) {
        if (((new Date(this.form.etd)).getTime() > (new Date(this.form.eta)).getTime())) {
          callback(new Error(fillAttributeToMessage('ETA', '10004', { ':date': 'ETD' })))
        } else {
          this.errors.eta = ''
          this.errors.etd = ''
          callback()
        }
      } else {
        callback()
      }
    },

    // Message currently only 10109 - after or equal
    validWeekFromTo(rule, value, callback) {
      if (this.form[rule.from] && this.form[rule.to]) {
        if (((new Date(this.form[rule.from])).getTime() > (new Date(this.form[rule.to])).getTime())) {
          callback(new Error(rule.message ? rule.message : fillAttributeToMessage(this.$t(rule.to), '10109', { ':week': this.$t(rule.from) })))
        } else if (rule.isEqual && ((new Date(this.form[rule.from])).getTime() === (new Date(this.form[rule.to])).getTime())) {
          callback(new Error(fillAttributeToMessage(rule.message ? rule.message : this.$t(rule.to), '10109', { ':week': this.$t(rule.from) })))
        } else {
          this.errors[rule.from] = ''
          this.errors[rule.to] = ''
          callback()
        }
      } else {
        callback()
      }
    },
    weekNext(rule, value, callback) {
      if (this.form[rule.from] && this.form[rule.to]) {
        if ((addDays(new Date(this.form[rule.from]), 7)).getTime() !== (new Date(this.form[rule.to])).getTime()) {
          callback(new Error(rule.message ? rule.message : fillAttributeToMessage(this.$t(rule.to), '10110', { ':week': this.$t(rule.from) })))
        }
      } else {
        callback()
      }
    },

    validRequiredWith(rule, value, callback) {
      if (rule.name && rule.with && this.form[rule.with]) {
        if (!value) {
          callback(new Error(fillAttributeToMessage(this.$t(rule.name), '10084', { ':values': this.$t(rule.with) })))
        } else {
          this.errors[rule.name] = ''
          callback()
        }
      } else {
        if (!this.form[rule.with]) {
          this.$refs[rule.with].clearValidate()
        }
        callback()
      }
    },

    /**
     *
     * Ignore target field null
     * @param rule
     * @param value
     * @param callback
     */
    reValidateField(rule, value, callback) {
      let isReValidate = true

      if (rule.ignores?.required) {
        if (!this.form[rule.fieldRef]) {
          isReValidate = false
        }
      }

      if (isReValidate && this.$refs[rule.fieldRef]) {
        this.$refs[rule.fieldRef].validate(rule.fieldTrigger)
      }

      callback()
    },

    reValidateEta() {
      if (this.form.eta) {
        this.$refs.formEta.validate('change')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item.span-form {
  .el-form-item__label:after {
      content: "*";
      color: #f56c6c !important;
      margin-left: 4px !important;
  }
}

::v-deep .form-item-week {
  .el-input__inner {
    width: 100% !important;
  }

  .el-form-item__content {
    width: 460px;
  }
}
@media(max-width: 940px) {
  ::v-deep .input-form .el-input__inner {
    width: 100% !important;
  }
  ::v-deep .form-item-week {
    .el-form-item__content {
      width: 100% !important;
    }
  }
}
</style>
