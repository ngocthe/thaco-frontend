<template>
  <div>
    <el-row type="flex" class="row-bg mb20 align-center" justify="space-between">
      <el-col :span="6" style="margin-top: 20px; min-width: 300px">
        <pick-fore-cast-header
          class="forecast-pickdate"
          :month="month"
          :disabled="disabled"
          :today="false"
          :align="'start'"
          :year-label="yearLabel"
          @prev-month="prevMonthCustom()"
          @next-month="nextMonthCustom()"
        />
      </el-col>
      <div class="flex-input item-seft-end">
        <div class="flex-input">
          <div class="input-common" style="margin-right: 20px">
            <div><label for="input_file_name">{{ $t('part_group_code') }}</label></div>
            <el-select
              v-model="params.part_group"
              filterable
              class="input-form input-select-mrp-table"
              :placeholder="$t('part_group_code')"
              :loading="loading_search"
              remote
              reserve-keyword
              clearable
              :remote-method="remoteGroups"
              @change="$emit('handle-search')"
              @visible-change="remoteGroups('')"
            >
              <el-option
                v-for="item in options.partGroups"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="input-common" style="margin-right: 20px">
            <div><label for="input_file_name">{{ $t('input_file_name') }}</label></div>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="original_file_name"
              placement="top-start"
            >
              <el-input
                v-model="original_file_name"
                :placeholder="$t('input_file_name')"
                clearable
                class="input-form input-select-mrp-table"
                :disabled="true"
              />
            </el-tooltip>
          </div>
        </div>
        <div class="action-table">
          <button-print @handlePrint="$emit('handle-print')" />
          <button-download @handleDownload="$emit('handle-download')" />
        </div>
      </div>
    </el-row>
    <date-table
      :first-day-of-week="firstDayOfWeek"
      :value="value"
      :date="date"
      :data="tableDataForeCast"
      @pick="handleDatePick"
      @reset="params.month=month;params.year=year;$emit('handle-search')"
    />
    <pagination
      v-show="total>0"
      :total.sync="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="$emit('handle-search')"
    />
  </div>
</template>

<script type="text/babel">

import DateTable from './components/DateTable'
import indexCalendar from '@/mixins/mrp/indexCalendar'
import ButtonPrint from '@/components/Button/Print'
import ButtonDownload from '@/components/Button/Download'
import Pagination from '@/components/Pagination'
import PickForeCastHeader from '@/components/Calendar/PickerForeCastHeader'
export default {
  components: {
    PickForeCastHeader,
    Pagination,
    ButtonDownload,
    ButtonPrint,
    DateTable
  },
  props: ['original_file_name', 'table-data-fore-cast', 'params', 'total', 'options'],
  data() {
    return {
      title: 'logical_inventory',
      loading_search: false,
      disabled: true
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mixins: [indexCalendar()],
  methods: {
    remoteGroups(query) {
      this.options.partGroups = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partGroups', params: { code: query }})
      }, 100)
    },
    prevMonthCustom() {
      const d = new Date()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      this.prevMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.month <= month && this.year === year ? this.disabled = true : this.disabled = false
      this.$emit('handle-search')
    },
    nextMonthCustom() {
      const d = new Date()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      this.nextMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.month <= month && this.year === year ? this.disabled = true : this.disabled = false
      this.$emit('handle-search')
    },
    getData() {}
  }
}
</script>
<style scoped lang="scss">
.input-select-mrp-table {
  width: 15vw !important;
}
::v-deep {
  .forecast-date button.input-common{
    margin-bottom: 0 !important;
  }
  .forecast-pickdate .el-date-picker__header-label {
    text-align: left !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
}
.mr15 {
  margin-right: 15px;
}
.ml10 {
  margin-left: 10px;
}
.label-input-select-mrp {
  font-weight: 400;
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
}
.fake-label-input-select-mrp {
  height: 26px;
}

::v-deep {
  .header-datetime {
    padding-top: 26px;
  }
  .header-datetime .input-common {
    margin-bottom: 0 !important;
  }
  .el-date-picker__header-label {
    margin-right: 5px;
  }
}
.dis-inblock .el-button {
  padding: 8px;
}
.month-year-text{
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  color: #73767A;
  display: inline-block;
  margin: 0px 20px 0px 0px;
  min-width: fit-content;
}
.align-center {
  align-items: center;
}
.min-wid {
  display: flex;
  align-items: center;
  .month-year-text {
    margin-right: 20px;
  }
}
.item-seft-end {
  align-items: self-end;
  flex-wrap: wrap;
  .input-common {
    margin-bottom: 0;
    label {
      margin-bottom: 10px;
      display: inline-block;
      color: #606266;
      font-size: 14px;
      font-weight: normal;
    }
    .el-select {
      display: block;
    }
  }
}
.action-table, .flex-input {
  display: flex;
  flex-wrap: wrap;
}
.item-seft-end {
  justify-content: flex-end;
}
@media(max-width: 900px) {
  .align-center {
    display: block;
    .min-wid {
      margin-bottom: 20px;
    }
  }
  .item-seft-end{
    flex-wrap: wrap;
    .input-common {
      margin-bottom: 20px;
    }
  }
}
@media(max-width: 450px) {
  .flex-input {
    margin-top: 10px;
  }
  .item-seft-end{
    justify-content: center;
  }
  .action-table {
    justify-content: flex-end;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}
.el-date-picker__header-label {
  min-width: 500px !important;
}
</style>
