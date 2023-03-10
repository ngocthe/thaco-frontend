<template>
  <div class="app-container">
    <search
      :options="options"
      :params="params"
      :loading_search="loading_search"
      @handleSearch="getData(1)"
      @handle-reset="reset"
      @handle-change-search="getOpSearch($event, true)"
    />

    <el-row type="flex" justify="start">
      <el-button
        v-show="importOrRun"
        :disabled="shortageResult.is_running_shortage"
        :loading="shortageResult.is_running_shortage"
        type="primary"
        style="height: 40px; margin-bottom: 20px"
        @click="showDialogMRPSystemRun"
      >MRP Simulation System Run</el-button>
    </el-row>

    <el-row type="flex" class="row-bg mb20 align-center" justify="space-between">
      <el-col :span="4" style="margin-top: 20px; min-width: 300px">
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
            <div><label>{{ $t('part_group_code') }}</label></div>
            <el-select
              v-model="params.part_group"
              clearable
              :loading="loading_search"
              remote
              reserve-keyword
              filterable
              :remote-method="remoteGroup"
              :placeholder="$t('part_group_code')"
              style="width: 100%"
              @visible-change="remoteGroup('')"
              @change="params.month=month;params.year=year;getData(1)"
            >
              <el-option
                v-for="item in options.part_groups"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="input-common">
            <div><label>{{ $t('input_file_name') }}</label></div>
            <el-select
              v-model="params.import_id"
              class="input-common"
              style="margin-right: 20px; float:right"
              :no-match-text="$t('no_data2')"
              :loading="loading_search"
              remote
              reserve-keyword
              filterable
              :remote-method="remoteInputFileName"
              @visible-change="remoteInputFileName('')"
              @change="params.month=month;params.year=year;getData(1)"
            >
              <el-option
                v-for="item in options.input_file_name"
                :key="getValueIdInputFile(item)"
                :label="item | translateInputFileOrder"
                :value="getValueIdInputFile(item)"
              />
            </el-select>
          </div>
        </div>
        <div class="action-table">
          <button-print style="float:right" @handlePrint="printData" />
          <button-download style="float:right" @handleDownload="exportData" />
          <button-import v-show="importOrRun" style="float:right" :type="'production_plan'" />
        </div>
      </div>
    </el-row>
    <data-table
      :date="date"
      :data-default="dataDefault"
      :date-data="dateData"
      :first-day-of-week="firstDayOfWeek"
      :value="value"
      :month="month"
      :year="year"
      :params="params"
      :number_week="number_week"
      :table-data="tableData"
      @pick="handleDatePick"
      @reset="getData"
    />
    <MRPSystemRunDialog
      :is-show.sync="isShow"
      :title="titleMRPSystemRun"
      :form-label-width="formLabelWidth"
      :params="params"
      :options="options"
      @handle-change-search="getOpSearch($event, true)"
      @handleMRPSystemRun="handleMRPSystemRun($event)"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />

    <PopupCommon
      v-if="isShowMessagesResult"
      :title="importFileCurrent.original_file_name"
      title_submit="OK"
      @submit="isShowMessagesResult=false"
      @close="isShowMessagesResult=false"
    >

      <div class="list-message-mrp-result-wrapper">
        <li v-for="code in messagesResult" :key="code" class="el-message--warning">
          {{ $t(code) }}
        </li>
      </div>

    </PopupCommon>
  </div>
</template>

<script>
import Search from './components/Search'
import PickHeader from '@/components/Calendar/PickerHeader'
import indexCalendar from '@/mixins/mrp/indexCalendar'
import Pagination from '@/components/Pagination'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import DataTable from '@/views/MRP/ShortagePart/components/DataTable'
import MRPSystemRunDialog from './components/MRPSystemRunDialog'
import { index, columns, excel, simulation } from '@/api/mrp/shortage_part'
import { codes as getPartGroups } from '@/api/master/part_group'

import indexMixin from '@/mixins/crud/index'
import { imports as importFiles, imports } from '@/api/mrp/production_plan'
import { statusFileImport } from '@/utils/constant'
import { mapMutations, mapState } from 'vuex'
import { mutationTypesShortageResult } from '@/store/mutationTypes'
import { convertMessageRunningMRPResult } from '@/utils/string-helper'
import PopupCommon from '@/components/Dialog/PopupCommon'
import { formatProgress } from '@/filters'
import { getTotalWeekByMonthYearFullWeek } from '@/utils/datetime'
export default {
  name: 'ShortagePartList',
  components: {
    PopupCommon,
    DataTable,
    Search,
    PickHeader,
    Pagination,
    ButtonPrint,
    ButtonImport,
    ButtonDownload,
    MRPSystemRunDialog
  },
  mixins: [
    indexCalendar(),
    indexMixin(index, {
      imports: {
        func: imports,
        params: {}
      },
      parts: {
        func: columns,
        params: {}
      },
      part_colors: {
        func: columns,
        params: {}
      },
      part_groups: {
        func: getPartGroups,
        params: {}
      }
    }, null, excel)],
  data() {
    return {
      title: 'shortage-part',
      model: 'shortagePart',
      loading_run_mrp: false,
      isShow: false,
      importOrRun: false,
      titleMRPSystemRun: this.$t('MRP_system_run'),
      formLabelWidth: '375px',
      number_week: 0,
      dataDefault: [],
      listQuery: {
        part_code: '',
        part_color_code: '',
        part_group: '',
        file_name: '',
        page: 1,
        per_page: 20
      },
      modelOptionSearch: {
        input_file_name: {
          func: importFiles,
          params: {}
        }
      },
      dateData: [],
      importFileCurrent: {},
      messagesResult: [],
      isShowMessagesResult: false
    }
  },
  mounted() {
    const permissions = this.$store.state.user.role.permissions
    this.importOrRun = !!permissions.includes('shortagePart.simulationRun')
    this.getDay()
  },
  methods: {
    getDay() {
      this.dataDefault = getTotalWeekByMonthYearFullWeek(this.month, this.year)
      this.dateData = []
      var i = 0
      for (const [key, value] of Object.entries(this.dataDefault)) {
        i = key
        console.log(value)
        value.forEach(child => {
          this.dateData.push(child)
        })
      }
      this.number_week = i
    },
    showDialogMRPSystemRun() {
      this.isShow = true
    },
    async handleMRPSystemRun(systemForm) {
      this.loading_run_mrp = true
      try {
        await simulation({ import_id: systemForm.import_id })
        this.$message({
          message: this.$t('request_received'),
          type: 'success'
        })
        this[mutationTypesShortageResult.MAP.SET_PROGRESS_SHORTAGE]({
          mrp_or_progress: 1,
          mrp_or_result: '',
          mrp_or_status: statusFileImport.NOT_YET_RUN,
          original_file_name: systemForm.file_name
        })

        this.loading_run_mrp = false
        const query = Object.assign({}, this.$route.query)
        delete query.import_id
        this.$router.replace({ query })
        setTimeout(() => {
          location.reload()
        }, 1000)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
        this.loading_run_mrp = false
      }
    },
    prevMonthCustom() {
      this.prevMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.getDay()
      this.getData()
    },
    nextMonthCustom() {
      this.nextMonth()
      this.params.month = this.month
      this.params.year = this.year
      this.getDay()
      this.getData()
    },
    remoteGroup(query) {
      this.options.part_groups = []
      setTimeout(() => {
        this.getOpSearch({ model: 'part_groups', params: { code: query }})
      }, 100)
    },
    getValueIdInputFile(item) {
      return item?.id ?? '0'
    },
    remoteInputFileName(query) {
      this.options.input_file_name = []
      setTimeout(() => {
        this.getOpSearch({ model: 'input_file_name', params: { code: query }},
          false,
          this.modelOptionSearch.input_file_name.func({
            original_file_name: query,
            mrp_or_status: statusFileImport.CHECKED_SHORTAGE
          }))
      }, 100)
    },
    addCurrentFileToOptionList(callback = () => {
    }) {
      let hasFileCurrentInOptionList = false
      if (!this.options.input_file_name) {
        this.options.input_file_name = [this.importFileCurrent]
        callback()
        return 1
      }
      this.options.input_file_name.forEach(file => {
        if (file.id === this.importFileCurrent.id) {
          hasFileCurrentInOptionList = true
        }
      })

      if (!hasFileCurrentInOptionList) {
        this.options.input_file_name = [...[this.importFileCurrent], ...this.options.input_file_name]
        callback()
        return 1
      } else {
        callback()
      }
    },
    async __filterResponseData(res) {
      const { data, import_file, running_file } = res

      this.importFileCurrent = import_file
      this.addCurrentFileToOptionList(() => {
        this.params.import_id = import_file.id
      })
      this[mutationTypesShortageResult.MAP.SET_PROGRESS_SHORTAGE](running_file)
      if (import_file.mrp_or_result) {
        this.messagesResult = convertMessageRunningMRPResult(import_file.mrp_or_result)
        if (import_file.id !== this.shortageResult.file_id_notification && import_file.mrp_or_status === statusFileImport.CHECKED_SHORTAGE) {
          this.isShowMessagesResult = true
          this[mutationTypesShortageResult.MAP.SET_FILE_ID_NOTIFICATION](import_file.id)
        }
      }

      return data
    },
    formatProgress() {
      return formatProgress(this.shortageResult.progress_shortage)
    },

    ...mapMutations([mutationTypesShortageResult.MAP.SET_PROGRESS_SHORTAGE, mutationTypesShortageResult.MAP.RUN_SHORTAGE, mutationTypesShortageResult.MAP.SET_FILE_ID_NOTIFICATION])
  },
  computed: {
    ...mapState(['shortageResult'])
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .header-datetime {
    .mr-1 {
      margin-left: 0 !important;
    }
  }
  .header-datetime .input-common {
    margin-bottom: 0 !important;
  }
  .el-date-picker__header-label {
    margin-right: 5px;
    display: inline-block;
    min-width: 150px;
    text-align: left;
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
    margin-right: 20px;
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
@media(max-width: 1530px) {
  .align-center {
    display: block;
    .min-wid {
      margin-bottom: 10px;
    }
  }
  .item-seft-end{
    flex-wrap: wrap;
    .input-common {
      margin-bottom: 10px;
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
