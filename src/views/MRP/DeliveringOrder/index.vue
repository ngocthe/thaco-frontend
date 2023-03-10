<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-search="params.page=1;getData(1)"
      @handle-reset="reset"
      @handle-change-option="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :is-preview="true"
      :remarks="false"
      @handle-preview="showDialogForm('preview',$event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :params="params"
      :preview.sync="preview"
      :show-dialog.sync="showDialog"
      :title="title"
      :editing.sync="editing"
      :form="form"
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

<script>
import Pagination from '@/components/Pagination'
import DialogForm from './components/DialogForm'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import { delivering as index, excelDelivering as excel } from '@/api/mrp/order-list'
import indexMixin from '@/mixins/crud/index'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartsColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getSuppliers } from '@/api/master/supplier'
import { columns as getColumnOrderingCalendar } from '@/api/mrp/mrp_ordering_calendar'
import { imports as importFiles } from '@/api/mrp/production_plan'

export default {
  name: 'DeliveringOrder',
  mixins: [
    indexMixin(index, {
      contracts: {
        func: getColumnOrderingCalendar,
        params: {}
      },
      partColors: {
        func: getPartsColors,
        params: {}
      },
      partGroups: {
        func: getColumnOrderingCalendar,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      },
      suppliers: {
        func: getSuppliers,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      },
      input_file_name: {
        func: importFiles,
        params: {}
      }
    }, null, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, DialogForm },
  data() {
    return {
      exportFileName: 'order-list',
      listQuery:
        {
          status: 2,
          part_code: '',
          plant_code: '',
          import_id: '',
          supplier_code: '',
          page: 1,
          per_page: 20,
          contract_code: '',
          part_color_code: '',
          part_group: '',
          eta: ''
        },
      form: {
        status: '',
        part_code: '',
        plant_code: '',
        import_id: '',
        supplier_code: '',
        contract_code: '',
        part_color_code: '',
        part_group: '',
        eta: '',
        file_import: '',
        actual_quantity: '',
        created_at: null,
        updated_at: null,
        user: {}
      },
      columns: [{
        name: 'delivering_status',
        data: 'status',
        width: '150',
        filter: 'translateStatusDelivering'
      }, {
        name: 'contract_no',
        data: 'contract_code',
        width: '160px'
      }, {
        name: 'eta',
        data: 'eta',
        width: '160px',
        filter: 'formatDateTime'
      }, {
        name: 'part_no',
        data: 'part_code',
        width: '160px'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '160px'
      }, {
        name: 'part_group',
        data: 'part_group',
        width: '160px'
      }, {
        name: 'quantity',
        data: 'actual_quantity',
        width: '160px'
      }, {
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '160px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '160px'
      }, {
        name: 'input_file_name',
        data: 'file_import',
        width: '200px',
        filter: 'translateInputFileOrder'
      }]
    }
  },
  methods: {
    async __filterResponseData(res) {
      const { data, import_file } = res

      this.importFileCurrent = import_file

      if (this.importFileCurrent) {
        this.addCurrentFileToOptionList(() => {
          this.params.import_id = this.importFileCurrent.id
        })
      }

      return data
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
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .d-flex-center {
  justify-content: left !important;
}
</style>
