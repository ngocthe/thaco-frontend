<template>
  <div class="app-container">
    <Search
      :params.sync="params"
      :options="options"
      :loading_search="loading_search"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1);"
      @handle-change-search="params.page = 1;getOpSearch($event, true);"
    />

    <div class="d-flex tab_wrapper position-relative mb20 mt20">
      <div class="is-top line-tab line-tab-part" />
      <div class="tab-hover tab" @click="changeTab()">
        Warehouse
      </div>
      <div class="ml20 tab-hover tab-active tab">
        Part
      </div>
    </div>

    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
    </el-row>

    <TableFixedThead
      v-if="fixedColumnTable"
      :remarks="false"
      :params="params"
      :columns="columns"
      :table-data="tableDataConverted"
      :is-preview="true"
      @handle-preview="showDialogForm('preview',$event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      :loading_search="loading_search"
      @created="
        params.page = 1;
        getData();
      "
      @updated="getData"
      @handle-change-search="
        params.page = 1;
        getOpSearch($event);
      "
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />
  </div>
</template>

<script>
import TableFixedThead from '@/components/Table/TableFixedThead'
import Search from './components/Search'
import DialogForm from './components/DialogForm'
import Pagination from '@/components/Pagination'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
import { parts as index, excelPart } from '@/api/inventory/wh_inventory_summary'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'Warehouse',
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
      plants: {
        func: getPlants,
        params: {}
      }
    }, null, excelPart)
  ],
  props: ['title'],
  // eslint-disable-next-line vue/order-in-components
  components: {
    DialogForm,
    TableFixedThead,
    ButtonPrint,
    ButtonDownload,
    Search,
    Pagination
  },
  data() {
    return {
      activeTab: 'part',
      model: 'wh_adjustment',
      warehouse_codes: [],
      tableDataConverted: [],
      fixedColumnTable: false,
      exportFileName: 'warehouse-inventory-summary-part',
      columnsBase: [
        {
          name: 'part_no',
          data: 'part_code'
          // width: '120'
        },
        {
          name: 'part_color_code',
          data: 'part_color_code'
          // width: '130'
        },
        {
          name: 'unit',
          data: 'unit'
          // width: '100'
        }
      ],
      form: {
        part_code: null,
        part_color_code: null,
        unit: null,
        user: {}
      },
      columns: [],
      listQuery: {
        part_code: '',
        part_color_code: '',
        plant_code: 'TMAC',
        page: 1,
        per_page: 20
      }
    }
  },
  methods: {
    handleReceivedData() {
      this.__changeColumn()
      this.__getTableData()
    },
    __changeColumn() {
      const cofigNewColumns = this.warehouse_codes.map((code) => {
        this.form[code] = null
        return {
          name: code,
          data: code,
          width: '100px'
        }
      })
      cofigNewColumns.push({
        name: 'SUM',
        data: 'SUM',
        width: ''
      })
      this.form['SUM'] = null
      this.columns = [...this.columnsBase, ...cofigNewColumns]
    },
    __getTableData() {
      this.tableDataConverted = this.tableData.map(row => {
        let sum = 0
        const warehouseData = {}
        if (row.warehouses) {
          row.warehouses.map(wh => {
            sum += parseInt(wh.quantity)
            warehouseData[wh.warehouse_code] = wh.quantity + ''
            if (!wh.quantity) {
              warehouseData[wh.warehouse_code] = ''
            }
            if (wh.quantity < 0) {
              warehouseData[wh.warehouse_code] = '(' + Math.abs(warehouseData[wh.warehouse_code]) + ')'
            }
          })
        }

        return { ...row, ...warehouseData, ...{ SUM: this.customConvertNumber(sum) }}
      })
    },
    changeTab(event) {
      this.$emit('change-tab')
    },
    customConvertNumber(number) {
      if (number > 0) {
        // eslint-disable-next-line no-self-assign
        number = number
      }
      if (number < 0) {
        number = '(' + Math.abs(number) + ')'
      }
      return number
    }
  }
}
</script>
