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
        <th class="week_no_header">{{ $t('week_no') }}</th>
        <th>{{ $t('mon') }}</th>
        <th>{{ $t('tue') }}</th>
        <th>{{ $t('wed') }}</th>
        <th>{{ $t('thur') }}</th>
        <th>{{ $t('fri') }}</th>
        <th>{{ $t('sat') }}</th>
        <th>{{ $t('sun') }}</th>
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
import calendar from '@/mixins/crud/calendar'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import { update } from '@/api/mrp/mrp_week_definition'
export default {
  mixins: [calendar(), datetimeConvert()],
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
        this.$loader(true)
        const { data } = await update({ date: this.formatDateTime(newDate, 'y-m-d') })
        this.$emit('reset')
        this.$loader(false)
        if (data) {
          this.$message({
            message: this.formatDateTime(newDate) + ' ' + this.$t('is_set_to_non_working_day'),
            type: 'error'
          })
        } else {
          this.$message({
            message: this.formatDateTime(newDate) + ' ' + this.$t('is_set_to_working_day'),
            type: 'success'
          })
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
</style>
