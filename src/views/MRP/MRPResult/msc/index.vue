<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :import_id="params.import_id"
      :loading_search="loading_search"
      @handle-search="handleSearch"
      @remote-msc="remoteMsc"
      @handle-reset="reset"
      @handle-change-search="getOpSearch($event, true)"
    />

    <el-row type="flex" justify="end">
      <el-button v-show="showMrpSystemRun" :disabled="mrpResult.is_running_mrp" type="primary" :loading="mrpResult.is_running_mrp" @click="isRunMRP = true">MRP
        system run
      </el-button>
    </el-row>

    <div class="d-flex tab_wrapper position-relative mb20 mt20">
      <div
        class="is-top line-tab line-tab-adj-part"
      />
      <div class="tab-hover tab tab-active">
        MSC
      </div>
      <div class="ml20 tab-hover tab" @click="changeTab()">
        Part
      </div>
    </div>

    <el-row type="flex" class="row-bg mb20 align-center" justify="space-between">
      <el-col :span="4" style="min-width: 300px">
        <div class="fake-label-input-select-mrp" />
        <div>
          <span class="month-mrp">{{ showCurrentMonth() }}</span>
          <el-button v-if="params.group_by !== 'month'" icon="el-icon-arrow-left" @click="handlePrevMonth()" />
          <el-button v-if="params.group_by !== 'month'" icon="el-icon-arrow-right" @click="handleNextMonth()" />
        </div>
      </el-col>

      <div class="flex-input item-seft-end">
        <div class="flex-input">
          <div class="input-common" style="margin-right: 10px">
            <div class="label-input-select-mrp">{{ $t('part_group_code') }}</div>
            <el-select
              v-model="params.part_group"
              filterable
              :placeholder="$t('part_group_code')"
              class="input-form input-select-mrp-table"
              :loading="loading_search"
              remote
              clearable
              reserve-keyword
              :remote-method="remotePartGroup"
              @visible-change="remotePartGroup('')"
              @change="changeMenuSearchFixed()"
            >
              <el-option
                v-for="item in options.part_group"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="input-common" style="margin-right: 10px">
            <div class="label-input-select-mrp">{{ $t('aggregation_date') }}</div>
            <el-select
              v-model="params.group_by"
              filterable
              :placeholder="$t('aggregation')"
              class="input-form input-select-mrp-table"
              remote
              reserve-keyword
              :no-match-text="$t('no_data2')"
              @change="changeMenuSearchFixed()"
            >
              <el-option
                v-for="item in optionsTable.group_by"
                :key="item"
                :label="$t(`aggregation_label.${item}`)"
                :value="item"
              />
            </el-select>
          </div>

          <div class="input-common" style="margin-right: 10px;width: 275px">
            <div class="label-input-select-mrp">{{ $t('input_file_name') }}</div>
            <el-select
              v-model="params.import_id"
              filterable
              class="input-form input-select-mrp-table"
              :loading="loading_search"
              :placeholder="$t('input_file_name')"
              style="width: 100%"
              remote
              reserve-keyword
              :remote-method="remoteInputFileName"
              @visible-change="remoteInputFileName('')"
              @change="changeMenuSearchFixed()"
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
          <div class="fake-label-input-select-mrp" />
          <div>
            <el-row type="flex" justify="end">
              <button-print @handlePrint="printData" />
              <button-download @handleDownload="exportData" />
            </el-row>
          </div>
        </div>
      </div>
    </el-row>

    <template v-if="mscList.length === 0">
      <table-plan
        :key="'xxx'"
        :data-calendar="dataCalendar"
        :msc-volume-data="[]"
        :msc-code="'xxx'"
        :table-data="[]"
        :aggregation="params.group_by"
      />
    </template>
    <template v-for="mscCode in mscList">
      <table-plan
        v-if="mscVolumeData[mscCode]"
        :id="`${tableId}-${mscCode}`"
        :key="mscCode"
        style="margin-top: 20px;"
        :data-calendar="dataCalendar"
        :msc-volume-data="mscVolumeData"
        :msc-code="mscCode"
        :table-data="tableData[mscCode]"
        :aggregation="params.group_by"
      />
    </template>

    <SystemRunMRP
      v-if="isRunMRP"
      :is-run-m-r-p.sync="isRunMRP"
      :options="options"
      :loading_search="loading_search"
      @handle-change-search="getOpSearch($event)"
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
import Pagination from '@/components/Pagination/index'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import Search from '@/views/MRP/MRPResult/msc/components/Search'
import { indexMSC as index } from '@/api/mrp/mrp_result'
import indexMixin from '@/mixins/crud'
import TablePlan from '@/views/MRP/MRPResult/msc/components/TablePlan'
import { aggregations, statusFileImport } from '@/utils/constant'
import { getMonthYear, getTotalWeekByMonthYearFullWeek } from '@/utils/datetime'
import { codes as getPartGroup } from '@/api/master/part_group'
import SystemRunMRP from '@/views/MRP/MRPResult/components/SystemRun'
import { formatDateTime, formatProgress } from '@/filters'
import { imports as importFiles } from '@/api/mrp/production_plan'
import indexCalendar from '@/mixins/mrp/indexCalendar'
import { excelMSC as excel, system_run, columns as columnsMrpResult } from '@/api/mrp/mrp_result'
import { mapMutations, mapState } from 'vuex'
import { mutationTypesMrpResult } from '@/store/mutationTypes'
import { convertMessageRunningMRPResult } from '@/utils/string-helper'
import PopupCommon from '@/components/Dialog/PopupCommon'

export default {
  name: 'MRPResultMSC',
  mixins: [
    indexMixin(index, {
      msc_code: {
        func: columnsMrpResult,
        params: {}
      },
      vehicle_color_code: {
        func: columnsMrpResult,
        params: {}
      },
      imports: {
        func: importFiles,
        params: {}
      },
      part_code: {
        func: columnsMrpResult,
        params: {}
      },
      part_color_code: {
        func: columnsMrpResult,
        params: {}
      },
      plant_code: {
        func: columnsMrpResult,
        params: {}
      },
      input_file_name: {
        func: importFiles,
        params: {}
      }
    }, () => {
    }, excel), indexCalendar(false)],
  components: { PopupCommon, SystemRunMRP, TablePlan, Search, ButtonPrint, ButtonDownload, Pagination },
  data() {
    return {
      loading_run_mrp: false,
      title: 'mrp-result',
      model: 'mrpResult',
      listQuery:
        {
          part_no: '',
          part_code: '',
          page: 1,
          plant_code: '',
          per_page: 20,
          part_group: '',
          group_by: aggregations.DAY,
          month: '',
          year: '',
          time_span: '',
          import_id: '',
          msc_code: '',
          vehicle_color_code: '',
          part_color_code: ''
        },
      columns: [{
        name: 'parts_used_date',
        data: 'parts_used_date',
        width: ''
      }, {
        name: 'part_no',
        data: 'part_no',
        width: ''
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: ''
      }, {
        name: 'parts_used_quantity',
        data: 'parts_used_quantity',
        width: ''
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: ''
      }],
      optionsTable: {
        group_by: aggregations,
        input_file_name: []
      },
      isRunMRP: false,
      modelOptionSearch: {
        part_group: {
          func: getPartGroup,
          params: {}
        },
        input_file_name: {
          func: importFiles,
          params: {}
        }
      },
      options: {
        part_group: [],
        input_file_name: []
      },
      dataCalendar: [],
      mscVolumeData: {},
      mscList: [],
      cacheTimeSpan: '',
      importFileCurrent: {},
      messagesResult: [],
      isShowMessagesResult: false,
      tableId: 1
    }
  },
  async created() {
    const regex = /^\d{2,2}-\d{2,2}\d{2,2}$/

    const timeSpanQuery = this.$route.query.time_span
    if (timeSpanQuery && timeSpanQuery.match(regex)) {
      this.params.time_span = timeSpanQuery
    } else {
      this.params.time_span = `${this.month}-${this.year}`
    }

    this.__splitTimeSpanToMonthYear()
    this[mutationTypesMrpResult.MAP.SET_FILE_ID_NOTIFICATION](false)
    // await this.getData(1)
    // await this.getDataSchedule()
  },
  methods: {
    async handleMRPSystemRun({ import_id, file_name }) {
      this.loading_run_mrp = true
      try {
        await system_run({ import_id: import_id })
        this.$message({
          message: 'Request Received',
          type: 'success'
        })
        this[mutationTypesMrpResult.MAP.SET_PROGRESS_MRP]({
          mrp_or_progress: 1,
          mrp_or_result: '',
          mrp_or_status: statusFileImport.CHECKED_SHORTAGE,
          original_file_name: file_name
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
    showCurrentMonth() {
      return this.listQuery.group_by !== aggregations.MONTH ? getMonthYear(`${this.params.year}/${this.params.month}/15`) : getMonthYear(`${this.params.year}/${this.params.month}/15`, false, true)
    },
    changeTab() {
      const query = Object.assign({}, this.$route.query)
      delete query.page
      this.$router.replace({ query })
      this.$emit('switch-part')
    },
    async __filterResponseData(res) {
      this.date = new Date(`${this.params.year}/${this.params.month}/15`)
      this.__splitTimeSpanToMonthYear()
      this.getDataSchedule()

      const { data, msc_volume, import_file, running_file } = res

      this.importFileCurrent = import_file
      this.addCurrentFileToOptionList(() => {
        this.params.import_id = import_file.id
      })

      this[mutationTypesMrpResult.MAP.SET_PROGRESS_MRP](running_file)

      if (import_file.mrp_or_result) {
        this.messagesResult = convertMessageRunningMRPResult(import_file.mrp_or_result)
        if (import_file.id !== this.mrpResult.file_id_notification && import_file.mrp_or_status === statusFileImport.RAN_MRP) {
          this.isShowMessagesResult = true
          this[mutationTypesMrpResult.MAP.SET_FILE_ID_NOTIFICATION](import_file.id)
        }
      }

      if (this.params.group_by === aggregations.DAY) {
        return this.__handleDataGroupDay(msc_volume, data)
      } else if (this.params.group_by === aggregations.WEEK) {
        return this.__handleDataGroupWeek(msc_volume, data)
      } else {
        return this.__handleDataGroupMonth(msc_volume, data)
      }
    },
    __handleDataGroupDay(mscVolume, dataTable) {
      // Handle table data
      const dataScopeByMsc = {}
      dataTable.forEach(row => {
        const rowDetail = {
          msc_code: row.msc_code,
          part_code: row.part_code,
          part_color_code: row.part_color_code,
          vehicle_color_code: row.vehicle_color_code
        }

        if (!dataScopeByMsc[row.msc_code]) {
          dataScopeByMsc[row.msc_code] = []
        }

        row.production_dates.forEach(prodDate => {
          const dateAsKey = formatDateTime(prodDate.production_date.replaceAll('-', '/'), 'd/m/y')
          rowDetail[dateAsKey] = prodDate.quantity === 0 ? '' : prodDate.quantity
        })

        dataScopeByMsc[row.msc_code].push(rowDetail)
      })

      // Handle header data

      const tempMscVolume = {}
      const tempMscList = []

      for (const MSCNo in mscVolume) {
        tempMscList.push(MSCNo)
        if (!tempMscVolume[MSCNo]) {
          tempMscVolume[MSCNo] = []
        }
        tempMscVolume[MSCNo] = {}
        mscVolume[MSCNo].forEach(mscVolumeOfDay => {
          tempMscVolume[MSCNo][formatDateTime(mscVolumeOfDay.production_date.replaceAll('-', '/'), 'd/m/y')] = mscVolumeOfDay.volume
        })
      }

      this.mscVolumeData = tempMscVolume
      this.mscList = tempMscList

      //  return tableData
      return dataScopeByMsc
    },
    __handleDataGroupWeek(mscVolume, dataTable) {
      // Handle table data
      const dataScopeByMsc = {}
      dataTable.forEach(row => {
        const rowDetail = {
          msc_code: row.msc_code,
          part_code: row.part_code,
          part_color_code: row.part_color_code,
          vehicle_color_code: row.vehicle_color_code
        }

        if (!dataScopeByMsc[row.msc_code]) {
          dataScopeByMsc[row.msc_code] = []
        }

        row.production_dates.forEach(prodWeek => {
          rowDetail[prodWeek.week_no] = prodWeek.quantity === 0 ? '' : prodWeek.quantity
        })

        dataScopeByMsc[row.msc_code].push(rowDetail)
      })

      // Handle header data

      const tempMscVolume = {}
      const tempMscList = []

      for (const MSCNo in mscVolume) {
        tempMscList.push(MSCNo)
        if (!tempMscVolume[MSCNo]) {
          tempMscVolume[MSCNo] = []
        }
        tempMscVolume[MSCNo] = {}
        mscVolume[MSCNo].forEach(mscVolumeOfDay => {
          tempMscVolume[MSCNo][mscVolumeOfDay.week_no] = mscVolumeOfDay.volume
        })
      }

      this.mscVolumeData = tempMscVolume
      this.mscList = tempMscList

      return dataScopeByMsc
    },
    __handleDataGroupMonth(mscVolume, dataTable) {
      // Handle table data
      const dataScopeByMsc = {}
      dataTable.forEach(row => {
        const rowDetail = {
          msc_code: row.msc_code,
          part_code: row.part_code,
          part_color_code: row.part_color_code,
          vehicle_color_code: row.vehicle_color_code
        }

        if (!dataScopeByMsc[row.msc_code]) {
          dataScopeByMsc[row.msc_code] = []
        }

        row.production_dates.forEach(prodMonth => {
          rowDetail[prodMonth.month_no] = prodMonth.quantity === 0 ? '' : prodMonth.quantity
        })

        dataScopeByMsc[row.msc_code].push(rowDetail)
      })

      // Handle header data

      const tempMscVolume = {}
      const tempMscList = []

      for (const MSCNo in mscVolume) {
        tempMscList.push(MSCNo)
        if (!tempMscVolume[MSCNo]) {
          tempMscVolume[MSCNo] = []
        }
        tempMscVolume[MSCNo] = {}
        mscVolume[MSCNo].forEach(mscVolumeOfDay => {
          tempMscVolume[MSCNo][mscVolumeOfDay.month_no] = mscVolumeOfDay.volume
        })
      }

      this.mscVolumeData = tempMscVolume
      this.mscList = tempMscList

      return dataScopeByMsc
    },
    async changeMenuSearchFixed() {
      this.$loader(true)
      this.params.page = 1
      await this.getData(1)
      this.$loader(false)
    },
    remotePartGroup(query) {
      this.options.part_group = []
      setTimeout(() => {
        this.getOpSearch({ model: 'part_group', params: { code: query }, is_create_option_by_typing: false },
          true,
          this.modelOptionSearch.part_group.func({ code: query }))
      }, 100)
    },
    remoteInputFileName(query) {
      this.options.input_file_name = []
      setTimeout(() => {
        this.getOpSearch({ model: 'input_file_name', params: { code: query }},
          false,
          this.modelOptionSearch.input_file_name.func({
            original_file_name: query,
            mrp_or_status: statusFileImport.RAN_MRP
          }))
      }, 100)
    },
    remoteMsc(builder) {
      return this.getOpSearch({ model: 'msc_code', params: { msc_code: builder.query }}, true, builder.func)
    },
    getValueIdInputFile(item) {
      return item?.id ?? '0'
    },
    async handleSearch() {
      this.$loader(true)
      this.__splitTimeSpanToMonthYear()
      this.params.page = 1
      await this.getData(1)
      this.$loader(false)
    },
    getDataSchedule() {
      this.dataCalendar = getTotalWeekByMonthYearFullWeek(this.params.month, this.params.year)
    },
    __splitTimeSpanToMonthYear() {
      const timeSpan = this.params.time_span
      if (timeSpan && timeSpan.trim()) {
        const monthYearArr = timeSpan.split('-')
        this.params.month = monthYearArr[0]
        this.params.year = monthYearArr[1]
      } else {
        this.params.time_span = `${this.params.month}-${this.params.year}`
      }
    },
    async handlePrevMonth() {
      this.$loader(true)
      this.prevMonth()
      this.params.time_span = `${this.month}-${this.year}`
      this.__splitTimeSpanToMonthYear()
      await this.getData(1)
      this.$loader(false)
    },
    async handleNextMonth() {
      this.$loader(true)
      this.nextMonth()
      this.params.time_span = `${this.month}-${this.year}`
      this.__splitTimeSpanToMonthYear()
      await this.getData(1)
      this.$loader(false)
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
    formatProgress() {
      return formatProgress(this.mrpResult.progress_mrp)
    },
    handleReceivedData() {
      this.tableId = this.tableId + 1
      if (!this.mscList.length) {
        this.params.page = 1
        this.params.per_page = 20
        this.total = 0
      }
    },
    ...mapMutations([mutationTypesMrpResult.MAP.SET_PROGRESS_MRP, mutationTypesMrpResult.MAP.RUN_MRP, mutationTypesMrpResult.MAP.SET_FILE_ID_NOTIFICATION])
  },
  computed: {
    ...mapState(['mrpResult'])
  }
}
</script>

<style lang="scss" scoped>
.month-mrp {
  font-weight: 700;
  font-size: 24px;
  color: #73767a;
  margin-right: 20px;
  vertical-align: middle;
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
@media(max-width: 1690px) {
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

<style lang="scss">
.input-select-mrp-table {
  width: 15vw;
}
</style>
