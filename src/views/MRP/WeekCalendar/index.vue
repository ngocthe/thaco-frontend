<template>
  <transition name="el-zoom-in-top">
    <div>
      <div class="el-picker-panel__body-wrapper">
        <pick-header
          style="padding: 25px 20px 0px 20px"
          :month="month"
          :align="'end'"
          :today="true"
          :year-label="yearLabel"
          @click-today="handleDatePick(new Date());getData()"
          @prev-month="prevMonth();getData()"
          @next-month="nextMonth();getData()"
        />
        <div class="el-picker-panel__content" style="margin-top:5px">
          <date-table
            :first-day-of-week="firstDayOfWeek"
            :value="value"
            :date="date"
            :data="data"
            @pick="handleDatePick();getData()"
            @reset="getData"
          />
        </div>
        <div class="image">
          <img class="note" src="@/assets/common_images/note.png">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">

import DateTable from './DateTable'
import { index } from '@/api/mrp/mrp_week_definition'
import indexCalendar from '@/mixins/mrp/indexCalendar'
import PickHeader from '@/components/Calendar/PickerHeader'
export default {
  components: {
    PickHeader,
    DateTable
  },
  mixins: [indexCalendar()],
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.$loader(true)
      const { data } = await index({ month: (+this.month > 9) ? this.month : '0' + this.month, year: this.year, page: 1, per_page: 90 })
      this.data = data
      this.$loader(false)
    }
  }
}
</script>

<style lang="scss">
.note{
  width: 300px;
  float: right;
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
