<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <tr v-if="tableData && tableData.length=='0'" slot="append" style="text-align: center; height: 50px;">
      <td style="position: fixed; left: 50%; border: none; line-height: 30px;">{{ $t('no_data') }}</td>
    </tr>

    <el-table-column
      label-class-name="label-mrp-result"
      class-name="text-header-middle-top"
      fixed
      width="580"
      label="Planned Production Date"
    >
      <el-table-column
        class-name="text-header-middle-bottom"
        label-class-name="label-mrp-result"
        label="Planned Production Date"
        width="120"
      >
        <el-table-column
          label-class-name="label-mrp-result text-center"
          prop="msc_code"
          label="MSC"
          width="120"
        />

        <el-table-column
          label-class-name="label-mrp-result text-center"
          prop="vehicle_color_code"
          label="Exterior Color Code"
          width="160"
        />

        <el-table-column
          label-class-name="label-mrp-result text-center"
          prop="volume"
          label="Production Volume"
          width="190"
        >
          <el-table-column
            label-class-name="label-mrp-result"
            prop="part_code"
            label="Part No"
            width="160"
          />
          <el-table-column
            label-class-name="label-mrp-result"
            prop="part_color_code"
            label="Part Color Code"
            width="140"
          />
        </el-table-column>
      </el-table-column>
    </el-table-column>

    <!--    Aggregation Day-->
    <template
      v-if="aggregation === aggregationOptions.DAY"
    >
      <template v-for="weekNo in 5">
        <el-table-column
          v-if="dataCalendar[weekNo] && dataCalendar[weekNo].length"
          :key="`Week-msc-day ${weekNo}`"
          label-class-name="label-mrp-result text-center"
          :label="`Week ${weekNo}`"
        >
          <el-table-column
            v-for="dateString in dataCalendar[weekNo]"
            :key="getDateDisplay(dateString)"
            label-class-name="label-mrp-result text-center"
            :label="getDateDisplay(dateString)"
            width="100"
          >
            <el-table-column
              label-class-name="label-mrp-result"
              class-name="text-header-middle-top"
              :label="getVolumeMSC(mscVolumeData[mscCode], getDateDisplay(dateString))"
              width="100"
            >
              <el-table-column
                label-class-name="label-mrp-result text-header-middle-bottom"
                :label="getVolumeMSC(mscVolumeData[mscCode], getDateDisplay(dateString))"
                width="100"
                :prop="getDateDisplay(dateString)"
              />
            </el-table-column>
          </el-table-column>

        </el-table-column>

      </template>
    </template>
    <!--    End Aggregation Day-->

    <!--    Aggregation Week-->
    <template
      v-if="aggregation === aggregationOptions.WEEK"
    >
      <template v-for="weekNo in 5">
        <el-table-column
          v-if="dataCalendar[weekNo] && dataCalendar[weekNo].length"
          :key="`Week-msc-week ${weekNo}`"
          label-class-name="label-mrp-result text-header-middle-top"
          :label="`Week ${weekNo}`"
          width="300"
        >
          <el-table-column
            label-class-name="label-mrp-result text-header-middle-bottom"
            :label="`Week ${weekNo}`"
            width="300"
          >
            <el-table-column
              label-class-name="label-mrp-result label-mrp-result text-header-middle-top"
              prop=""
              class-name=""
              :label="getVolumeMSC(mscVolumeData[mscCode], weekNo)"
              width="300"
            >
              <el-table-column
                label-class-name="label-mrp-result text-header-middle-bottom"
                :prop="weekNo + ''"
                :label="getVolumeMSC(mscVolumeData[mscCode], weekNo)"
                width=""
              />
            </el-table-column>
          </el-table-column>

        </el-table-column>
      </template>
    </template>
    <!--    End Aggregation Week-->

    <!--    Aggregation Month-->
    <template
      v-if="aggregation === aggregationOptions.MONTH"
    >
      <el-table-column
        v-for="monthNo in 12"
        :key="`month ${monthNo}`"
        label-class-name="label-mrp-result text-header-middle-top"
        :label="getMonth(monthNo)"
        width="120"
      >
        <el-table-column
          label-class-name="label-mrp-result text-header-middle-bottom"
          :label="getMonth(monthNo)"
          width="120"
        >
          <el-table-column
            label-class-name="label-mrp-result label-mrp-result text-header-middle-top"
            prop=""
            class-name=""
            :label="getVolumeMSC(mscVolumeData[mscCode], monthNo)"
            width="120"
          >
            <el-table-column
              label-class-name="label-mrp-result text-header-middle-bottom"
              :prop="monthNo + ''"
              :label="getVolumeMSC(mscVolumeData[mscCode], monthNo)"
              width="120"
            />
          </el-table-column>
        </el-table-column>

      </el-table-column>
    </template>
    <!--    End Aggregation Month-->
  </el-table>
</template>

<script>
import { formatDate, getMonthYear } from '@/utils/datetime'
import { aggregations } from '@/utils/constant'

export default {
  name: 'TablePlan',
  props: ['aggregation', 'tableData', 'dataCalendar', 'mscVolumeData', 'mscCode'],
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
    getDateDisplay(dateData, isReplaceMinusToSlash = false) {
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
      if (mscObj && mscObj[dateDisplay] && mscObj[dateDisplay] !== 0) {
        return mscObj[dateDisplay] + ''
      } else {
        return ''
      }
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .text-header-middle-top {
  position: relative !important;
  border-bottom: 0 !important;

  .cell {
    position: absolute !important;
    bottom: -13px !important;
    text-align: center !important;
  }
}

::v-deep .text-header-middle-bottom {
  position: relative !important;

  .cell {
    position: absolute !important;
    top: -10px !important;
    text-align: center !important;
  }
}

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
