<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'vietnam_source_log'" />
      <!-- <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" /> -->
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :remark="true"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
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
      @created="params.page=1;getData(false)"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @updated="getData(false)"
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
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import indexMixin from '@/mixins/crud'
import { index, destroy, excel } from '@/api/inventory/vietnam_source_log'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartsColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
// import { codes as getProcurements } from '@/api/master/procurement'
import { codes as getSuppliers } from '@/api/master/supplier'
import { columns as getColumns } from '@/api/inventory/vietnam_source_log'
// import datetimeConvert from '@/mixins/crud/datetimeConvert'

export default {
  name: 'VietnamSourceLog',
  components: { TableFixedThead, ButtonPrint, ButtonImport, ButtonDownload, Search, Pagination, DialogForm },
  mixins: [
    indexMixin(index, {
      contracts: {
        func: getColumns,
        params: {}
      },
      invoices: {
        func: getColumns,
        params: {}
      },
      bills: {
        func: getColumns,
        params: {}
      },
      containers: {
        func: getColumns,
        params: {}
      },
      cases: {
        func: getColumns,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      },
      partColors: {
        func: getPartsColors,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      },
      suppliers: {
        func: getSuppliers,
        params: {}
      }
    // }, destroy, excel), datetimeConvert()],
    }, destroy, excel)],
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      title: this.$t('vietnam_source_log_list_title'),
      exportFileName: 'vietnam-source-log',
      modelable_type: 'vietnam_source_log',
      model: 'vietnamSourceLog',
      params: {
        page: 1,
        per_page: 20,
        contract_code: null,
        invoice_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        part_code: null,
        part_color_code: null,
        plant_code: null,
        supplier_code: null,
        delivery_date: null,
        updated_at: null
      },
      form: {
        contract_code: null,
        invoice_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        part_code: null,
        part_color_code: null,
        box_type_code: null,
        unit: null,
        part_quantity: null,
        box_quantity: null,
        supplier_code: null,
        delivery_date: null,
        plant_code: 'TMAC',
        remark: null,
        user: {},
        created_at: null,
        updated_at: null
      },
      columns: [{
        name: 'contract_no',
        data: 'contract_code',
        width: '175'
      }, {
        name: 'invoice_no',
        data: 'invoice_code',
        width: '175'
      }, {
        name: 'bill_of_lading_code',
        data: 'bill_of_lading_code',
        width: '175'
      }, {
        name: 'container_no',
        data: 'container_code',
        width: '175'
      }, {
        name: 'case_no',
        data: 'case_code',
        width: '175'
      }, {
        name: 'part_no',
        data: 'part_code',
        width: '175'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '175'
      }, {
        name: 'box_type_code',
        data: 'box_type_code',
        width: '175'
      }, {
        name: 'quantity_of_box',
        data: 'box_quantity',
        width: '175'
      }, {
        name: 'part_quantity_in_box',
        data: 'part_quantity',
        width: '175'
      }, {
        name: 'unit',
        data: 'unit',
        width: '175'
      }, {
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '175'
      }, {
        name: 'delivery_date',
        data: 'delivery_date',
        type: 'date',
        width: '175'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '175'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.box_quantity = item.box_quantity.toString()
      newItem.part_quantity = item.part_quantity.toString()
      this.showDialogForm(mode, newItem)
    },
    handlePrint() {}
  }
}
</script>

<style scoped >

</style>
