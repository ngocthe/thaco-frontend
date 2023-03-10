<template>
  <table
    style="width: 100%"
    cellspacing="0"
    cellpadding="0"
    class="el-date-table"
    :class="{ 'is-week-mode': selectionMode === 'week' }"
    @dblclick="handleClick"
  >
    <tbody>
      <tr class="header-calendar">
        <th class="week_no_header pb-5">{{ $t('week_no') }}</th>
        <th class="pb-5">{{ $t('mon') }}</th>
        <th class="pb-5">{{ $t('tue') }}</th>
        <th class="pb-5">{{ $t('wed') }}</th>
        <th class="pb-5">{{ $t('thur') }}</th>
        <th class="pb-5">{{ $t('fri') }}</th>
        <th class="pb-5">{{ $t('sat') }}</th>
        <th class="pb-5">{{ $t('sun') }}</th>
      </tr>
      <tr
        v-for="(row, key) in rows"
        :key="key"
        style="height:144px"
        class="el-date-table__row"
      >
        <td class="week_no">
          <div>
            <span class="day-on-calendar" style="width: 50px">
              {{ 'week '+ fillData(row,key) }}
            </span>
          </div>
        </td>
        <td
          v-for="(cell, key) in row"
          :key="key"
          :class="getCellClasses(cell)"
        >
          <div>
            <span class="day-on-calendar">
              {{ cell.text }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import weekCalendar from '@/mixins/mrp/weekCalendar'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import { update } from '@/api/mrp/mrp_week_definition'
import { formatDateTime } from '@/filters'
export default {
  mixins: [weekCalendar(), datetimeConvert()],
  methods: {
    fillData(row, key) {
      let week_no = null
      switch (key) {
        case 0:
          row.filter(item => item.check === 'prev-month').length < 3 ? week_no = 1 : (+row[0].text <= 26 ? week_no = 4 : week_no = 5)
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
    },
    async handleClick(event) {
      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.className !== 'week_no') {
        const row = target.parentNode.rowIndex - 1
        const column = target.cellIndex
        const newDate = this.getDateOfCell(row, column)
        var now = new Date()
        newDate.setHours(23, 59, 59, 999)
        if (newDate < now) {
          return
        }
        try {
          this.$loader(true)
          const { data } = await update({ date: formatDateTime(newDate, 'y-m-d') })
          this.$emit('reset')
          this.$loader(false)
          if (data.day_off) {
            this.$message({
              message: formatDateTime(newDate) + ' ' + this.$t('is_set_to_non_working_day'),
              type: 'warning'
            })
          } else {
            this.$message({
              message: formatDateTime(newDate) + ' ' + this.$t('is_set_to_working_day'),
              type: 'success'
            })
          }
        } catch (e) {
          this.$message({
            message: e.message,
            type: 'error'
          })
          this.$loader(false)
        }
      }
    }
  }
}
</script>
<style scoped >
.header-calendar th {
  font-weight: bold;
  border-bottom: #9c9ca2 dashed 1px;
  text-align: start;
}
.day-on-calendar{
  top:10px; left: 25px
}
.el-date-table__row td{
  border-bottom: #9c9ca2 dashed 1px;border-right: #9c9ca2 dashed 1px;
  width: 12.5%;
}
.import-container {
  padding: 20px;
}
.week_no_header {
  color: #0050B3;
  font-weight: bold;
}
.week_no {
  background: #0050B3;
  color: white;
}
.today {
  background: #ECF5FF;
}
.holiday {
  background-image: linear-gradient(-45deg, pink 25%, transparent 25%, transparent 50%, pink 50%, white 75%, transparent 75%, transparent);
  background-size: 4px 4px;
}
.holiday-not-in-month {
  background-image: linear-gradient(-45deg, pink 25%, transparent 25%, transparent 50%, pink 50%, white 75%, transparent 75%, transparent);
  background-size: 4px 4px;
  color: #C0C4CC;
}

.pb-5 {
  padding-bottom: 15px;
}
</style>
