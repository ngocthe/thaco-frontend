<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <tr v-if="tableData && tableData.length=='0'" slot="append" style="text-align: center; height: 50px;">
      <td style="position: fixed; left: 50%; border: none; line-height: 30px;">{{ $t('no_data') }}</td>
    </tr>

    <el-table-column
      fixed
      label-class-name="label-mrp-result"
      prop="part_code"
      label="Part No"
      width="160"
    />

    <el-table-column
      fixed
      label-class-name="label-mrp-result"
      prop="part_color_code"
      label="Part Color Code"
      width="140"
    />

    <el-table-column
      label-class-name="label-mrp-result"
      class-name=""
      width="580"
      label="Planned Production Date"
    >
      <!--    Aggregation Day-->
      <template
        v-if="aggregation === aggregationOptions.DAY"
      >
        <template v-for="weekNo in 5">
          <el-table-column
            v-if="dataCalendar[weekNo] && dataCalendar[weekNo].length"
            :key="`week-part-day ${weekNo}`"
            label-class-name="label-mrp-result text-center"
            :label="`Week ${weekNo}`"
          >
            <el-table-column
              v-for="dateObj in dataCalendar[weekNo]"
              :key="getDateDisplay(dateObj)"
              label-class-name="label-mrp-result text-center"
              :label="getDateDisplay(dateObj)"
              width="100"
              :prop="getDateDisplay(dateObj)"
            />
          </el-table-column>

        </template>
      </template>
      <!--    End Aggregation Day-->

      <!--    Aggregation Week-->
      <template
        v-if="aggregation === aggregationOptions.WEEK"
      >
        <template
          v-for="weekNo in 5"
        >
          <el-table-column
            v-if="dataCalendar[weekNo] && dataCalendar[weekNo].length"
            :key="`week-part-week ${weekNo}`"
            label-class-name="label-mrp-result text-header-middle-top"
            :label="`Week ${weekNo}`"
            :prop="weekNo + ''"
          />
        </template>
      </template>
      <!--    End Aggregation Week-->

      <!--    Aggregation Month-->
      <template
        v-if="aggregation === aggregationOptions.MONTH"
      >
        <el-table-column
          v-for="monthNo in 12"
          :key="`month-part ${monthNo}`"
          label-class-name="label-mrp-result text-header-middle-top"
          :label="getMonth(monthNo)"
          width="120"
          :prop="monthNo + ''"
        />
      </template>
      <!--    End Aggregation Month-->
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate, getMonthYear } from '@/utils/datetime'
import { aggregations } from '@/utils/constant'

export default {
  name: 'TablePlan',
  props: ['aggregation', 'tableData', 'dataCalendar'],
  data() {
    return {
      aggregationOptions: aggregations,
      tableScope: []
    }
  },
  created() {
  },
  beforeUpdate() {
  },
  methods: {
    getDateDisplay(dateData) {
      // if (dateData && isReplaceMinusToSlash) {
      //   dateData = dateData.replace('-', '/')
      // }

      return formatDate(dateData)
    },
    getMonth(monthNumber) {
      const currentDate = new Date()
      const stringDate = `${monthNumber}/01/${currentDate.getFullYear()}`
      return getMonthYear(stringDate)
    },
    handleReceivedDataTable() {

    },
    getVolumeMSC(mscObj, dateDisplay) {
      if (mscObj[dateDisplay] && mscObj[dateDisplay] !== 0) {
        return mscObj[dateDisplay]
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .label-mrp-result {
  background: #ECF5FF !important;
}

::v-deep .text-center {
  text-align: center !important;
}

::v-deep .el-table__body-wrapper {
  overflow-x: auto;
  z-index: 1;
}
</style>
