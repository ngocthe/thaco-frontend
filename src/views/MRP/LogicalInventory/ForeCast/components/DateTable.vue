<template>
  <div class="wrap-table">
    <table class="mrp-result">
      <thead>
        <tr>
          <td rowspan="3" class="fixed first" style="width: 180px; text-align: center">Part No.</td>
          <td rowspan="3" class="fixed second" style="width: 180px;text-align: center">Part Color Code</td>

          <td :colspan="rowHeaders.length" align="center">{{ $t('planned_production_date') }}</td>
        </tr>
        <tr>
          <td v-for="(row, key) in weeks" :key="key" align="center" :colspan="getColspan(row.data)">
            {{ 'Week ' + row.week_name }}
          </td>
        </tr>
        <tr>
          <td v-for="(row, key) in rowHeaders" :key="key" align="center" style="min-width: 130px;text-align: center">
            <div>
              <span class="day-on-calendar" style="width: 50px">
                {{ fillText(row.text, row.type) }}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data && data.length=='0'" style="text-align: center; height: 50px; ">
          <td :colspan="getColspanNodata()" style="left: 50vh; width: 100vh;border: 1px solid #d9dce1;border-top: none; padding-top:15px !important">{{ $t('no_data') }}</td>
        </tr>
        <tr v-for="(item, index) in data" v-else :key="index" class="el-table__row">
          <td class="fixed first">{{ item.part_code }}</td>
          <td class="fixed second">{{ item.part_color_code }}</td>
          <td v-for="(item_child, key) in rowHeaders" :key="key" :style="callQuantity(item_child.text,item_child.type,item.production_dates)==''?'background:#ECF5FF':'background:#fff'">
            <span v-if="callQuantity(item_child.text,item_child.type,item.production_dates) && callQuantity(item_child.text,item_child.type,item.production_dates) <0" style="color: red">
              {{ '('+ fillQuantity(callQuantity(item_child.text,item_child.type,item.production_dates))+')' }}
            </span>
            <span v-if="callQuantity(item_child.text,item_child.type,item.production_dates) && callQuantity(item_child.text,item_child.type,item.production_dates) >=0">
              {{ callQuantity(item_child.text,item_child.type,item.production_dates) | numberFormatter }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import plantProduct from '@/mixins/mrp/plantProduct'
import { numberFormatter } from '@/filters'
export default {
  mixins: [plantProduct()],
  methods: {
    getColspan(row) {
      return row.length
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
    },
    fillText(text, type) {
      var month = type === 'normal' ? +this.month + 1 : (type === 'next-month' ? +this.month + 2 : +this.month)
      var text_month = ''
      var text_year = null
      month > 9 ? text_month = month : text_month = '0' + month
      if (text_month === 13) {
        text_year = +this.year + 1
        text_month = '01'
      } else if (text_month === '00') {
        text_month = '12'
        text_year = +this.year - 1
      } else {
        text_year = this.year
      }
      if (+text < 10) { return '0' + text + '/' + text_month + '/' + text_year } else { return text + '/' + text_month + '/' + text_year }
    },
    getColspanByMonth() {
      var text_month = +this.month + 1
      return new Date(this.year, text_month, 0).getDate()
    },
    getColspanNodata() {
      return new Date(this.year, this.month, 0).getDate() + 2
    },
    fillQuantity(value) {
      value = -value
      return numberFormatter(value)
    },
    callQuantity(key, type, data) {
      var number = +key
      var result = ''
      var month = type === 'normal' ? +this.month + 1 : (type === 'next-month' ? +this.month + 2 : +this.month)
      var text_month = ''
      var text_day = ''
      var text_year = null
      month > 9 ? text_month = month : text_month = '0' + month
      if (text_month === 13) {
        text_year = +this.year + 1
        text_month = '01'
      } else if (text_month === '00') {
        text_month = '12'
        text_year = +this.year - 1
      } else {
        text_year = this.year
      }
      text_day = number < 10 ? '0' + number : number
      var day = text_year + '-' + text_month + '-' + text_day
      data.forEach(e => {
        if (e.production_date === day) {
          result = e.quantity
        }
      })
      return result
    }
  }
}
</script>
<style scoped >
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
* {
  box-sizing: border-box !important;
}
.wrap-table {
  overflow-x:auto;
  position: relative;
  width:100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
}
/* Hoặc cẩn thận hơn */
*, *::before, *::after {
  box-sizing: border-box !important;
}
.mrp-result {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: 14px;
  color:  #606266 !important;
}
.mrp-result thead {
  background: #f2f6fc;
}
.mrp-result thead td {
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  padding: 10px 10px;
  font-weight: bold;
  box-sizing: border-box;
}
.mrp-result tbody td {
  box-sizing: border-box;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  padding: 10px 10px;
  color: #606266;
}
.mrp-result {
  box-sizing: border-box;
  border-top: 1px solid #dfe6ec;
  border-collapse: separate;
  border-spacing: 0;
}

thead td.fixed {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #f2f6fc;
  padding: 10px 10px;
  font-weight: bold;
}
tbody td.fixed {
  box-sizing: inherit;
  position: -webkit-sticky;
  position: sticky;
  visibility:visible;
  background: #fff;
  color:#606266;
  /*box-shadow: 0 0 10px rgb(0 0 0 / 12%)*/
}
.zero {
  min-width: 50px;left:0px
}
.first {
  border-left: 1px solid #dfe6ec;
  min-width: 180px;left:0px
}
.second {
  min-width: 180px;left:180px !important;
}
.end {
  min-width: 120px;left:350px !important;
  /*box-shadow: 0 0 10px rgb(0 0 0 / 12%)*/
}
</style>
