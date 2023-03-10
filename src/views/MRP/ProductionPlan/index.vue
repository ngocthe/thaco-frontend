<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      @handle-search="params.month=month;params.year=year;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20 align-center" justify="space-between">
      <el-col :span="4" style="min-width: 300px">
        <pick-header
          class="header-datetime"
          :month="month"
          :today="false"
          :align="'start'"
          :year-label="yearLabel"
          @click-today="handleDatePick(new Date());params.month=month;params.year=year;getData()"
          @prev-month="prevMonthCustom()"
          @next-month="nextMonthCustom()"
        />
      </el-col>
      <div class="flex-input item-seft-end">
        <div class="flex-input">
          <div class="input-common">
            <div><label for="input_file_name">{{ $t('input_file_name') }}</label></div>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="options.imports.filter(e=>e.id ==params.import_id).length>0?options.imports.filter(e=>e.id ==params.import_id)[0].original_file_name: $t('input_file_name')"
              placement="top-start"
            >
              <el-select
                v-model="params.import_id"
                class="input-common"
                style="margin-right: 20px; float:right"
                :no-match-text="$t('no_data2')"
                :loading="loading_search"
                remote
                reserve-keyword
                filterable
                :placeholder="$t('input_file_name')"
                :remote-method="remoteFile"
                @visible-change="remoteFile('')"
                @change="params.month=month;params.year=year;getData(1)"
              >
                <el-option
                  v-for="item in options.imports"
                  :key="item.id"
                  :label="item.original_file_name"
                  :value="item.id"
                />
              </el-select>
            </el-tooltip>
          </div>
        </div>
        <div class="action-table">
          <button-print style="float:right" @handlePrint="printData" />
          <button-download style="float:right" @handleDownload="exportData" />
          <button-import v-show="showCreateOrImport" style="float:right" :type="'production_plan'" />
        </div>
      </div>
    </el-row>
    <date-table
      :first-day-of-week="firstDayOfWeek"
      :value="value"
      :date="date"
      :params="params"
      :data="tableData"
      @pick="handleDatePick"
      @reset="params.month=month;params.year=year;getData()"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />
  </div>
</template>

<script type="text/babel">

import DateTable from './components/DateTable'
import indexCalendar from '@/mixins/mrp/indexCalendar'
import PickHeader from '@/components/Calendar/PickerHeader'
import Search from './components/Search'
import ButtonPrint from '@/components/Button/Print'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import Pagination from '@/components/Pagination'
import indexMixin from '@/mixins/crud'
import { index, columns, excel, imports } from '@/api/mrp/production_plan'
export default {
  components: {
    Pagination,
    ButtonImport,
    ButtonDownload,
    ButtonPrint,
    Search,
    PickHeader,
    DateTable
  },
  data() {
    return {
      model: 'productionPlan',
      title: 'production_plan',
      loading_search: false,
      options: [],
      total: 20,
      params: {
        page: 1,
        per_page: 20,
        import_id: null,
        msc_code: null,
        vehicle_color_code: null,
        month: null,
        year: null
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mixins: [indexMixin(index, {
    mscs: {
      func: columns,
      params: {}
    },
    exteriors: {
      func: columns,
      params: {}
    },
    imports: {
      func: imports,
      params: {}
    }
  }, null, excel), indexCalendar()],
  mounted() {
    this.getFirtFileImport()
    console.log(this.options)
  },
  methods: {
    async getFirtFileImport() {
      const { data } = await imports()
      if (data.length > 0) {
        this.params.import_id = data[0].id
      }
    },
    remoteFile(query) {
      this.options.imports = []
      setTimeout(() => {
        this.getOpSearch({ model: 'imports', params: { original_file_name: query }})
      }, 100)
    },
    prevMonthCustom() {
      this.prevMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.getData()
    },
    nextMonthCustom() {
      this.nextMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
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
@media(max-width: 1262px) {
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
@media(max-width: 425px) {
  .flex-input {
    margin-top: 20px;
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
