import {
  isDate,
  modifyDate,
  modifyWithTimeString,
  prevMonth,
  nextMonth
} from 'element-ui/src/utils/date-util'
const indexCalendar = (isCalendar = true) => ({
  data() {
    return {
      data: [],
      date: new Date(),
      value: '',
      defaultValue: null,
      selectionMode: 'day',
      firstDayOfWeek: 7,
      showWeekNumber: false,
      selectableRange: [],
      format: ''
    }
  },
  computed: {
    year() {
      return this.date.getFullYear()
    },
    month() {
      return +this.date.getMonth() + 1
    },
    yearLabel() {
      return this.year
    }
  },
  watch: {
    value(val) {
      if (this.selectionMode === 'dates' && this.value) return
      if (isDate(val)) {
        this.date = new Date(val)
      } else {
        this.date = this.getDefaultValue()
      }
    },

    defaultValue(val) {
      if (!isDate(this.value)) {
        this.date = val ? new Date(val) : new Date()
      }
    }
  },
  mounted() {
    if (isCalendar) {
      this.getData()
    }
  },
  methods: {
    prevMonth() {
      this.date = prevMonth(this.date)
    },
    nextMonth() {
      this.date = nextMonth(this.date)
    },
    handleDatePick(value) {
      const newDate = this.value
        ? modifyDate(this.value, value.getFullYear(), value.getMonth(), value.getDate())
        : modifyWithTimeString(value, this.defaultTime)
      this.date = newDate
    },
    getDefaultValue() {
      return this.defaultValue ? new Date(this.defaultValue) : new Date()
    }
  }
})
export default indexCalendar
