<template>
  <div class="wrap-table">
    <table v-if="data && data.length=='0'" class="mrp-result">
      <thead>
        <tr>
          <td rowspan="2" class="fixed zero" style="width: 50px">No.</td>
          <td colspan="4" align="center" class="fixed first" style="left:50px">{{ $t('planned_production_date') }}</td>
          <td v-for="index in 5" :key="index" align="center" :colspan="7" style="min-width: 130px;">
            {{ 'Week '+ index }}
          </td>
        </tr>
        <tr>
          <td class="fixed first" style="left:50px">MSC Code</td>
          <td class="fixed second">Exterior Color Code</td>
          <td class="fixed end">Description</td>
          <td class="fixed final">Plant Code</td>
          <td v-for="key in 31" :key="key" style="min-width: 130px;text-align: center">
            <div>
              <span class="day-on-calendar" style="width: 50px">
                {{ getDayWhenDataNull(key) }}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr style="text-align: center; height: 50px;">
          <td :colspan="getColspanNodata()" style="position: fixed; left: 50%; border: none">{{ $t('no_data') }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else class="mrp-result">
      <thead>
        <tr>
          <td rowspan="2" class="fixed zero" style="width: 50px; text-align: center">No.</td>
          <td colspan="4" align="center" class="fixed first" style="left:50px">{{ $t('planned_production_date') }}</td>
          <td v-for="key in data[0].production_plans.length/7" :key="key" align="center" :colspan="7">
            {{ 'Week '+ key }}
          </td>
        </tr>
        <tr>
          <td class="fixed first" style="left:50px">MSC Code</td>
          <td class="fixed second">Exterior Color Code</td>
          <td class="fixed end">Description</td>
          <td class="fixed final">Plant Code</td>

          <td v-for="(row, key) in data[0].production_plans" :key="key" style="min-width: 130px;text-align: center">
            <div>
              <span class="day-on-calendar" style="width: 50px">
                {{ formatDateTime(row.plant_date, 'd/m/y') }}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index" class="el-table__row">
          <td class="fixed zero" style="text-align: center">{{ indexMethod(+index) }}</td>
          <td class="fixed first">{{ item.msc_code }}</td>
          <td class="fixed second">{{ item.vehicle_color_code }}</td>
          <td class="fixed end">{{ item.msc_description }}</td>
          <td class="fixed final">{{ item.plant_code }}</td>

          <td v-for="(item_child, key) in item.production_plans" :key="key" :style="item_child.day_off?'background: pink':'background: white'">{{ item_child.volume !== 0 ? item_child.volume : null }}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import plantProduct from '@/mixins/mrp/plantProduct'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
export default {
  props: ['params'],
  mixins: [plantProduct(), datetimeConvert()],
  methods: {
    indexMethod(index) {
      return ((+this.params.page - 1) * (+this.params.per_page) + index + 1)
    },
    getColspanNodata() {
      return new Date(this.year, this.month, 0).getDate() + 1
    },
    getDayWhenDataNull(key) {
      var text_month = +this.month + 1
      return (key > 9 ? key : ('0' + key)) + '/' + (text_month > 9 ? text_month : ('0' + text_month)) + '/' + this.year
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
  color: #606266 !important;
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
  border-left: 1px solid #dfe6ec;
  min-width: 50px;left:0px
}
.first {
  min-width: 180px;left:50px
}
.second {
  min-width: 120px;left:230px !important;
}
.end {
  min-width: 120px;left:350px !important;
  /*box-shadow: 0 0 10px rgb(0 0 0 / 12%)*/
}

.final {
  min-width: 120px;left:470px !important;
  /*box-shadow: 0 0 10px rgb(0 0 0 / 12%)*/
}
</style>
