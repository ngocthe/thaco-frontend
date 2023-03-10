<template>
  <div class="app-container">
    <search
      :params.sync="params"
      :options="options"
      :loading_search="loading_search"
      @handle-reset="reset"
      @handle-search="getData(1); getDataForeCast()"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane :label="$t('current_summary')" name="current_summary">
        <TableCurentSummary
          :total.sync="total"
          :table-data="tableData"
          :params.sync="params"
          @handle-search="getData(1)"
          @fresh-data="getData()"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('forecast_inventory')" name="forecast_inventory">
        <TableForeCastInventory
          :original_file_name.sync="original_file_name"
          :total.sync="total_forecast"
          :table-data-fore-cast="tableDataForeCast"
          :params.sync="params"
          :options="options"
          @handle-search="getDataForeCast()"
          @handle-download="getData(1);getDataForeCast();exportDataCustom()"
          @handle-print="getData(1);getDataForeCast();printDataCustom()"
          @handle-change-search="getOpSearch($event, true)"
          @fresh-data="freshData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Search from './components/Search'
import TableCurentSummary from './components/TableCurentSummary'
import TableForeCastInventory from './ForeCast/TableForeCastInventory'
import indexMixin from '@/mixins/crud/index'
import { index, indexForeCast, excel } from '@/api/mrp/logical_inventory'
import { codes as getGroups } from '@/api/master/part_group'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
import { formatDateTime } from '@/filters'
export default {
  name: 'LogicalForeCast',
  components: { Search, TableCurentSummary, TableForeCastInventory },
  mixins: [
    indexMixin(index, {
      parts: {
        func: getParts,
        params: {}
      },
      partColors: {
        func: getPartColors,
        params: {}
      },
      partGroups: {
        func: getGroups,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    }, null, excel)],
  data() {
    return {
      title: this.$t('logical-inventory'),
      model: this.$t('logicalInventory'),
      activeTab: 'current_summary',
      total_forecast: 0,
      tableDataForeCast: [],
      original_file_name: null,
      listQuery:
      {
        received_date: formatDateTime(new Date(), 'y-m-d'),
        part_code: '',
        part_color_code: '',
        plant_code: '',
        month: null,
        year: null
      },
      paramsSummary:
      {
        part_code: '',
        part_color_code: '',
        plant_code: ''
      },
      paramsForeCast:
      {
        part_code: '',
        part_color_code: '',
        plant_code: ''
      }
    }
  },
  mounted() {
    this.getDataForeCast()
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeTab === 'current_summary') {
        // this.$loader(true)
        // this.getData()
      } else {
        // this.getDataForeCast()
      }
    },
    async getDataForeCast() {
      this.$loader(true)
      try {
        this.paramsForeCast = { ...this.params }
        this.paramsForeCast.received_date = null
        const { data, pagination, original_file_name } = await indexForeCast(this.paramsForeCast)
        this.total_forecast = pagination.total
        this.tableDataForeCast = data
        this.original_file_name = original_file_name
        this.$router.push({ path: this.$route.path, query: { ...this.params }})
      } catch (error) {
        console.log(error)
      } finally {
        this.$loader(false)
      }
    },
    async exportDataCustom() {
      this.$loader(true)
      try {
        var params = { ...this.final_params }
        params.received_date = null
        params.type = 'xls'
        const data = await excel(params, 'blob')
        const url = URL.createObjectURL(
          new Blob([data], {
            type:
              'application/vnd.ms-excel'
          })
        )

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${this.exportFileName || this.title || 'export'}_${this.getDateTimeNow()}.xlsx`)
        document.body.appendChild(link)
        link.click()
        this.$loader(false)
      } catch (error) {
        this.$loader(false)
        this.$message({
          message: error.message,
          type: 'error'
        })
      }
    },
    async printDataCustom() {
      this.$loader(true)
      try {
        var params = { ...this.final_params }
        params.received_date = null
        params.type = 'pdf'
        const data = await excel(params, 'blob')
        const url = URL.createObjectURL(
          new Blob([data])
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${this.exportFileName || this.title || 'export'}_${this.getDateTimeNow()}.pdf`)
        document.body.appendChild(link)
        link.click()
        this.$loader(false)
      } catch (error) {
        this.$loader(false)
        this.$message({
          message: error.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped >
  .row-filter{
    margin-top:10px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .min-wid{
    min-width: 170px;
  }
  .dis-inblock{
    display: inline-block;
  }

  .label-select{
    color: #606266;
    font-family: Noto Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
  .month-year-text{
    font-family: Noto Sans SC;
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
  .btn-print{
    width: 100% !important;
  }
  .btn-download{
    margin-left: 0px !important;
    width: 100%;
  }
  .color-white{
    color: white;
  }
  .fl-group-res{

  }
  @media (min-width: 708px) and (max-width: 1259px) {
    .dis-block{
      display: block;
    }
  }
</style>
