import {
  clearTime as _clearTime,
  getStartDateOfMonth,
  isDate, nextDate
} from 'element-ui/src/utils/date-util'

const table = () => ({
  props: {
    data: Array,
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    },
    value: {},
    defaultValue: {
      validator(val) {
        return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate))
      }
    },
    date: {},
    selectionMode: {
      default: 'day'
    },
    minDate: {},
    maxDate: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        }
      }
    }
  },

  computed: {
    offsetDay() {
      const week = this.firstDayOfWeek
      return week > 3 ? 7 - week : -week
    },
    year() {
      return this.date.getFullYear()
    },

    month() {
      return this.date.getMonth()
    },

    startDate() {
      return getStartDateOfMonth(this.year, this.month)
    }
  },
  methods: {
    getDateTimestamp(time) {
      if (typeof time === 'number' || typeof time === 'string') {
        return _clearTime(new Date(time)).getTime()
      } else if (time instanceof Date) {
        return _clearTime(time).getTime()
      } else {
        return NaN
      }
    },
    getMonth(month) {
      switch (month) {
        case 1: return 'January'
        // eslint-disable-next-line no-unreachable
          break
        case 2: return 'February'
        // eslint-disable-next-line no-unreachable
          break
        case 3: return 'March'
        // eslint-disable-next-line no-unreachable
          break
        case 4: return 'April'
        // eslint-disable-next-line no-unreachable
          break
        case 5: return 'May'
        // eslint-disable-next-line no-unreachable
          break
        case 6: return 'June'
        // eslint-disable-next-line no-unreachable
          break
        case 7: return 'July'
        // eslint-disable-next-line no-unreachable
          break
        case 8: return 'August'
        // eslint-disable-next-line no-unreachable
          break
        case 9: return 'September'
        // eslint-disable-next-line no-unreachable
          break
        case 10: return 'October'
        // eslint-disable-next-line no-unreachable
          break
        case 11: return 'November'
        // eslint-disable-next-line no-unreachable
          break
        default: return 'December'
      }
    },
    getCellClasses(cell) {
      const classes = []
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available')
        if (cell.type === 'today') {
          classes.push('today')
        }
      } else {
        classes.push(cell.type)
      }

      if (cell.type === 'normal') {
        classes.push('default')
      }
      return classes.join(' ')
    },
    getDateOfCell(row, column) {
      const offsetFromStart = row * 7 + column - this.offsetDay
      return nextDate(this.startDate, offsetFromStart)
    }
  },
  data() {
    return {
      tableRows: [[], [], [], [], [], []],
      lastRow: null,
      lastColumn: null
    }
  }
})
export default table
