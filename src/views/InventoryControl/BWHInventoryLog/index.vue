<template>
  <div class="app-container">
    <search
      :params="params"
      :defects="defects"
      :search-defects="searchDefects"
      :options="options"
      :loading_search="loading_search"
      @handle-search="params.page=1;getData(1)"
      @handle-reset="reset"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'bwh_inventory_log'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
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
      @refresh-data="getData()"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
      @handle-defect="showDefectForm($event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :defects="defects"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      :loading_search="loading_search"
      @created="params.page=1;getData(false)"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @updated="getData(false)"
    />
    <DefectForm
      :options="options"
      :form="form"
      :show-dialog-defect.sync="showDialogDefect"
      :defects="defects"
      @updated="getData(false)"
    />
    <Delete
      :loading="loading"
      :update_summary="update_summary"
      :show-form-delete.sync="showFormDelete"
      @handle-delete="handleDelete($event)"
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
import ButtonAdd from '@/components/Button/Add'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import indexMixin from '@/mixins/crud'
import { index, destroy, excel } from '@/api/inventory/bwh_inventory_log'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getWarehouseLocations } from '@/api/master/warehouse_location'
import { codes as getWarehouses } from '@/api/master/warehouse'
import { codes as getSuppliers } from '@/api/master/supplier'
import { columns as getColumnBwhs } from '@/api/inventory/bwh_inventory_log'
import { columns as getColumnInTransit } from '@/api/inventory/in_transit_inventory_log'
import DefectForm from '@/views/InventoryControl/BWHInventoryLog/components/DefectForm'
import Delete from '@/components/Dialog/Delete'

export default {
  name: 'BWHInventoryLog',
  components: { Delete, DefectForm, TableFixedThead, ButtonPrint, ButtonImport, ButtonDownload, Search, Pagination, DialogForm, ButtonAdd },
  mixins: [
    indexMixin(index, {
      contracts: {
        func: getColumnBwhs,
        params: {}
      },
      invoices: {
        func: getColumnBwhs,
        params: {}
      },
      bills: {
        func: getColumnBwhs,
        params: {}
      },
      containers: {
        func: getColumnBwhs,
        params: {}
      },
      cases: {
        func: getColumnBwhs,
        params: {}
      },
      contractForms: {
        func: getColumnInTransit,
        params: {}
      },
      invoiceForms: {
        func: getColumnInTransit,
        params: {}
      },
      billForms: {
        func: getColumnInTransit,
        params: {}
      },
      containerForms: {
        func: getColumnInTransit,
        params: {}
      },
      caseForms: {
        func: getColumnInTransit,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      },
      suppliers: {
        func: getSuppliers,
        params: {}
      },
      warehouseLocations: {
        func: getWarehouseLocations,
        params: {}
      },
      warehouses: {
        func: getWarehouses,
        params: {}
      }
    }, destroy, excel)],
  data() {
    return {
      showDialogDefect: false,
      list: [],
      total: 0,
      listLoading: true,
      title: this.$t('bwh_inventory_log'),
      modelable_type: 'bwh_inventory_log',
      exportFileName: 'bonded-warehouse-inventory',
      model: 'bwhInventoryLog',
      update_summary: false,
      currentId: null,
      showFormDelete: false,
      searchDefects: [
        { code: 0, name: 'OK' },
        { code: 1, name: 'Has Defect' }
      ],
      params: {
        page: 1,
        per_page: 20,
        contract_no: null,
        invoice_code: null,
        bl_no: null,
        container_no: null,
        case_no: null,
        procurement_supplier_code: null,
        container_received: null,
        date_devanned: null,
        defect_id: null,
        date_case_stored: null,
        warehouse_code: null,
        shipped_date: null,
        plants: null,
        updated_date_time: null,
        updated_at: null
      },
      form: {
        defects: [],
        case_code: null,
        warehouse_code: null,
        bill_of_lading_code: null,
        container_code: null,
        contract_code: null,
        invoice_code: null,
        box_type_code: null,
        part_code: null,
        part_color_code: null,
        box_quantity: null,
        part_quantity: null,
        unit: null,
        supplier_code: null,
        devanned_date: null,
        container_received: null,
        stored_date: null,
        warehouse_location_code: null,
        location_code: null,
        shipped_date: null,
        plant_code: 'TMAC',
        defect_id: null,
        remark: null,
        user: {},
        created_at: null,
        updated_at: null
      },
      defects: [
        { code: null, name: 'OK' },
        { code: 'W', name: 'Wrong' },
        { code: 'D', name: 'Damage' },
        { code: 'S', name: 'Shortage' },
        { code: 'X', name: 'No good' }],
      columns: [{
        name: 'contract_no',
        data: 'contract_code',
        width: '175'
      }, {
        name: 'invoice_no',
        data: 'invoice_code',
        width: '175'
      }, {
        name: 'bl_no',
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
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '175'
      }, {
        name: 'date_container_received',
        data: 'container_received',
        type: 'date',
        width: '175'
      }, {
        name: 'date_devanned',
        data: 'devanned_date',
        type: 'date',
        width: '175'
      }, {
        name: 'date_case_stored',
        data: 'stored_date',
        type: 'date',
        width: '175'
      }, {
        name: 'warehouse_code',
        data: 'warehouse_code',
        width: '175'
      }, {
        name: 'location_code',
        data: 'warehouse_location_code',
        width: '175'
      }, {
        name: 'date_shipped_upkwh',
        data: 'shipped_date',
        type: 'date',
        width: '175'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '175'
      },
      {
        name: 'defect_status',
        data: 'defect_id',
        type: 'defect',
        width: '175'
      }]
    }
  },
  methods: {
    showDefectForm(item) {
      this.form = { ...item }
      this.form.defaultDefect = item.defect_id
      this.showDialogDefect = true
    },
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.box_quantity = item.box_quantity.toString()
      newItem.part_quantity = item.part_quantity.toString()
      this.showDialogForm(mode, newItem)
    },
    openDeleteCustom(item) {
      this.currentId = item
      this.showFormDelete = true
    },
    async handleDelete(update) {
      this.$loader(true)
      try {
        await destroy(this.currentId, { update_summary: update })
        this.getData()
        this.showFormDelete = false
        this.$loader(false)
        this.$message({
          type: 'success',
          message: this.$t('delete_completed')
        })
      } catch (error) {
        this.$loader(false)
        if (error !== 'cancel') {
          this.$message({
            message: error.message,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped >

</style>
