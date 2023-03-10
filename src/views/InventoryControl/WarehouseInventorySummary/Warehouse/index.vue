<template>
  <div class="app-container">
    <Search
      :params="params"
      :options="options"
      :is-create="showCreateOrImport"
      :loading_search="loading_search"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />

    <div class="d-flex tab_wrapper position-relative mb20 mt20">
      <div
        class="is-top line-tab line-tab-warehouse"
      />
      <div class="tab-hover tab-active tab">
        Warehouse
      </div>
      <div class="ml20 tab-hover tab" @click="changeTab()">
        Part
      </div>
    </div>
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
    </el-row>
    <TableFixedThead
      :remarks="false"
      :params="params"
      :columns="columns"
      :table-data="tableData"
      :is-preview="showPreview"
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
      @created="params.page=1;getData()"
      @updated="getData"
      @handle-change-search="params.page=1;getOpSearch($event)"
    />
    <Pagination
      v-show="total>0"
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
import { codes as getWarehouses } from '@/api/master/warehouse'
import { index, excelWH } from '@/api/inventory/wh_inventory_summary'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'Warehouse',
  mixins: [
    indexMixin(index, {
      warehouses: {
        func: getWarehouses,
        params: {}
      },
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
    }, null, excelWH)],
  // eslint-disable-next-line vue/order-in-components
  components: { DialogForm, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  props: ['title'],
  data() {
    return {
      activeTab: 'wh_inventory_summary',
      model: 'whInventorySummary',
      exportFileName: 'warehouse-inventory-summary',
      columns: [
        {
          name: 'warehouse_code',
          data: 'warehouse_code',
          width: ''
        }, {
          name: 'part_no',
          data: 'part_code',
          width: ''
        }, {
          name: 'part_color_code',
          data: 'part_color_code',
          width: ''
        }, {
          name: 'quantity',
          data: 'quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'unit',
          data: 'unit',
          width: ''
        }, {
          name: 'plant_code',
          data: 'plant_code',
          width: ''
        }
      ],
      form: {
        part_code: null,
        part_color_code: null,
        quantity: null,
        unit: null,
        warehouse_type: null,
        warehouse_code: null,
        plant_code: 'TMAC',
        user: {},
        created_at: null,
        updated_at: null
      },
      listQuery:
      {
        warehouse_code: '',
        part_code: '',
        part_color_code: '',
        plant_code: '',
        updated_at: '',
        page: 1,
        per_page: 20
      }
    }
  },
  methods: {
    changeTab() {
      this.$emit('change-tab')
    }
  }
}
</script>

