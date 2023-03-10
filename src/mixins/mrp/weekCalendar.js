import {
  getDayCountOfMonth, getFirstDayOfMonth, nextDate
} from 'element-ui/src/utils/date-util'
import table from '@/mixins/mrp/table'

const weekCalendar = () => ({
  mixins: [table()],
  computed: {
    rows() {
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
        if (item.day_off) {
          dataHoliday.push(this.getDateTimestamp(new Date(item.date)))
        }
      })
      for (let i = 0; i < 5; i++) {
        const row = rows[i]
        for (let j = 0; j < 7; j++) {
          let cell = row[j]
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false }
          }

          cell.type = 'normal'

          const index = i * 7 + j + 1
          const time = nextDate(startDate, index - offset).getTime()
          cell.inRange = time >= this.getDateTimestamp(this.minDate) && time <= this.getDateTimestamp(this.maxDate)
          cell.start = this.minDate && time === this.getDateTimestamp(this.minDate)
          cell.end = this.maxDate && time === this.getDateTimestamp(this.maxDate)
          cell.check = 'normal'
          const isToday = time === now
          if (isToday) {
            cell.type = 'today'
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
            if (cell.type === 'next-month' || cell.type === 'prev-month') {
              cell.type = 'holiday-not-in-month'
            } else {
              cell.type = 'holiday'
            }
          }

          this.$set(row, j, cell)
        }
      }
      return rows
    }
  },
  data() {
    return {
      tableRows: [[], [], [], [], []]
    }
  }
})
export default weekCalendar
