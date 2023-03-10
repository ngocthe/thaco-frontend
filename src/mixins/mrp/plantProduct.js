import {
  getDayCountOfMonth,
  getFirstDayOfMonth,
  nextDate
} from 'element-ui/src/utils/date-util'
import table from '@/mixins/mrp/table'

const plantProduct = () => ({
  mixins: [table()],
  computed: {
    rows() {
      this.tableRows = [[], [], [], [], []]
      const date = new Date(this.year, this.month, 1)
      let day = getFirstDayOfMonth(date)
      const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth())
      const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1))
      day = (day === 0 ? 7 : day)
      const offset = this.offsetDay
      const rows = this.tableRows
      let count = 1

      const startDate = this.startDate
      const now = this.getDateTimestamp(new Date())
      const dataHoliday = []
      this.data.forEach(item => {
        dataHoliday.push(this.getDateTimestamp(new Date(item.date)))
      })
      for (let i = 0; i < 5; i++) {
        const row = rows[i]
        for (let j = 0; j < 7; j++) {
          let cell = row[j]
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false }
          }

          cell.type = 'normal'
          cell.type_forecast = 'normal'
          const index = i * 7 + j + 1
          const time = nextDate(startDate, index - offset).getTime()
          cell.inRange = time >= this.getDateTimestamp(this.minDate) && time <= this.getDateTimestamp(this.maxDate)
          cell.start = this.minDate && time === this.getDateTimestamp(this.minDate)
          cell.end = this.maxDate && time === this.getDateTimestamp(this.maxDate)
          cell.check = 'normal'
          const isToday = time === now
          var lessToday = time <= now
          if (isToday) {
            cell.type = 'today'
          }
          if (lessToday) {
            cell.type_forecast = 'hidden'
          }
          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset - 1 : day + offset - 1

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++
            } else {
              cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7
              cell.type = 'prev-month'
              cell.check = 'prev-month'
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++
            } else {
              cell.text = count++ - dateCountOfMonth
              cell.type = 'next-month'
              cell.check = 'next-month'
            }
          }
          if (dataHoliday.includes(time)) {
            cell.type = 'holiday'
          }

          this.$set(row, j, cell)
        }
      }
      return rows
    },
    rowHeaders() {
      const rowResults = []
      this.rows.forEach((e, index) => {
        e.forEach(e_child => {
          this.checkPass(e, index) && e_child.type_forecast !== 'hidden' ? rowResults.push(e_child) : null
        })
      })
      return rowResults
    },
    weeks() {
      const weeks = []
      this.rows.forEach((e, index) => {
        var week_name = this.fillData(e, index)
        var item = e.filter(child => {
          return this.checkPass(e, index) && child.type_forecast !== 'hidden'
        })
        if (item.length > 0) {
          weeks.push({ week_name: week_name, data: item })
        }
      })
      return weeks
    }
  },
  methods: {
    checkPass(row, key) {
      var value = true
      switch (key) {
        case 0:
          row.filter(item => item.check === 'prev-month').length < 3 ? value = true : value = false
          break
        case 4:
          row.filter(item => item.check === 'next-month').length <= 4 ? value = true : value = false
          break
        default: value = true; break
      }
      return value
    },
    fillData(row, key) {
      let week_no = 1 + ' (' + (this.getMonth(this.month + 2)) + ')'
      switch (key) {
        case 0:
          row.filter(item => item.check === 'prev-month').length < 3 ? week_no = 1 : (+row[0].text <= 26 ? week_no = 4 + (' (' + (this.getMonth(this.month)) + ')') : week_no = 5 + ' (' + (this.getMonth(this.month)) + ')')
          break
        case 1:
          +row[0].text <= 5 ? week_no = 1 : week_no = 2
          break
        case 2:
          +row[0].text <= 12 ? week_no = 2 : week_no = 3
          break
        case 3:
          +row[0].text <= 19 ? week_no = 3 : week_no = 4
          break
        case 4:
          row.filter(item => item.check === 'next-month').length <= 4 ? (+row[0].text <= 26 ? week_no = 4 : week_no = 5) : week_no = 1
          break
        default: break
      }
      return week_no
    }
  }
})
export default plantProduct
