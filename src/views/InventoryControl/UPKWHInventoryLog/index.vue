<template>
  <div class="app-container">
    <search
      :params="params"
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
      :is-scan="showEdit"
      @refresh-data="getData()"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
      @handle-defect="showDefectForm($event)"
      @handle-scan="showScanForm($event)"
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
    <ScanForm
      :options="options"
      :form="form"
      :loading="loading"
      :show-dialog-scan.sync="showDialogScan"
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
import Search from '@/views/InventoryControl/UPKWHInventoryLog/components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getWarehouseLocations } from '@/api/master/warehouse_location'
import { codes as getWarehouses } from '@/api/master/warehouse'
import { codes as getSuppliers } from '@/api/master/supplier'
import { cases as getCases } from '@/api/inventory/bwh_inventory_log'
import { columns as getColumn } from '@/api/inventory/upk-inventory-log'
import { columns as getColumnBwhs } from '@/api/inventory/bwh_inventory_log'
import { index, destroy, excel } from '@/api/inventory/upk-inventory-log'
import indexMixin from '@/mixins/crud/index'
import ButtonAdd from '@/components/Button/Add'
import DefectForm from './components/DefectForm'
import DialogForm from './components/DialogForm'
import ScanForm from '@/views/InventoryControl/UPKWHInventoryLog/components/ScanForm'
import Delete from '@/components/Dialog/Delete'

export default {
  name: 'UPKWHInventoryLog',
  components: {
    Delete,
    ScanForm,
    DialogForm,
    DefectForm,
    ButtonAdd,
    Pagination,
    Search,
    ButtonDownload,
    ButtonPrint,
    TableFixedThead
  },
  mixins: [
    indexMixin(index, {
      contracts: {
        func: getColumn,
        params: {}
      },
      invoices: {
        func: getColumn,
        params: {}
      },
      bills: {
        func: getColumn,
        params: {}
      },
      containers: {
        func: getColumn,
        params: {}
      },
      cases: {
        func: getColumnBwhs,
        params: {}
      },
      contractForms: {
        func: getColumnBwhs,
        params: {}
      },
      invoiceForms: {
        func: getColumnBwhs,
        params: {}
      },
      billForms: {
        func: getColumnBwhs,
        params: {}
      },
      containerForms: {
        func: getColumnBwhs,
        params: {}
      },
      caseForms: {
        func: getCases,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      },
      parts: {
        func: getColumnBwhs,
        params: {}
      },
      partColors: {
        func: getColumnBwhs,
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
      },
      boxTypes: {
        func: getColumnBwhs,
        params: {}
      },
      partsBwh: {
        func: getColumnBwhs,
        params: {}
      },
      partColorsBwh: {
        func: getColumnBwhs,
        params: {}
      },
      boxTypesBwh: {
        func: getColumnBwhs,
        params: {}
      },
      casesBwh: {
        func: getColumnBwhs,
        params: {}
      }
    }, destroy, excel)],
  data() {
    return {
      showDialogScan: false,
      title: this.$t('UPKWH_inventory_log'),
      list: null,
      model: 'upkwhInventoryLog',
      exportFileName: 'unpack-warehouse-inventory',
      total: 0,
      listLoading: true,
      modelable_type: 'upkwh_inventory_log',
      update_summary: false,
      currentId: null,
      showFormDelete: false,
      newShippedBoxQuantity: null,
      listQuery: {
        page: 1,
        per_page: 20,
        contract_no: null,
        invoice_no: null,
        shelf_location_code: null,
        bl_no: null,
        container_no: null,
        case_no: null,
        procurement_supplier_code: null,
        date_devanned: null,
        defect_id: null,
        date_case_stored: null,
        shipped_date: null,
        received_date: null,
        warehouse_code: null,
        date_shipped_upkwh: null,
        plants: null,
        updated_date_time: null,
        updated_at: null
      },
      searchDefects: [
        { code: 0, name: 'OK' },
        { code: 1, name: 'Has Defect' }
      ],
      defects: [
        { code: null, name: 'OK' },
        { code: 'W', name: 'Wrong' },
        { code: 'D', name: 'Damage' },
        { code: 'S', name: 'Shortage' },
        { code: 'X', name: 'No good' }
      ],
      form: {
        defects: [],
        box_list: [],
        case_code: null,
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
        received_date: null,
        warehouse_code: null,
        shelf_location_code: null,
        shipped_box_quantity_default: null,
        shipped_box_quantity: null,
        location_code: null,
        shipped_date: null,
        plant_code: 'TMAC',
        remark: null,
        defect_id: null,
        user: {},
        user_code: null,
        username: null,
        created_at: null,
        updated_at: null
      },
      showDialogDefect: false,
      columns: [{
        name: 'contract_no',
        data: 'contract_code',
        width: '128px'
      }, {
        name: 'invoice_no',
        data: 'invoice_code',
        width: '128px'
      }, {
        name: 'bl_no',
        data: 'bill_of_lading_code',
        width: '175'
      }, {
        name: 'container_no',
        data: 'container_code',
        width: '140px'
      }, {
        name: 'case_no',
        data: 'case_code',
        width: '128px'
      }, {
        name: 'part_no',
        data: 'part_code',
        width: '128px'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '128px'
      }, {
        name: 'box_type_code',
        data: 'box_type_code',
        width: '128px'
      }, {
        name: 'quantity_of_box',
        data: 'box_quantity',
        width: '180px'
      }, {
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '128px'
      }, {
        name: 'date_case_received',
        data: 'received_date',
        width: '180px',
        type: 'date'
      }, {
        name: 'warehouse_code',
        data: 'warehouse_code',
        width: '128px'
      }, {
        name: 'shelf_location_code',
        data: 'shelf_location_code',
        width: '180px'
      }, {
        name: 'number_of_boxes_shipped_assembly_plant',
        data: 'shipped_box_quantity',
        width: '200px'
      }, {
        name: 'date_box_shipped_assembly_plant',
        data: 'shipped_date',
        width: '160px',
        type: 'date'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '128px'
      }, {
        name: 'defect_status',
        data: 'defect_id',
        type: 'defect',
        width: '175'
      }]
    }
  },
  methods: {
    showScanForm(item) {
      this.form = { ...item }
      this.showDialogScan = true
    },
    showDefectForm(item) {
      this.form = { ...item }
      this.form.box_list = []
      for (var i = 1; i < (+this.form.box_quantity + 1); i++) {
        var defectItem = this.form.defects.filter(e => { return e.id === i })
        if (defectItem.length > 0) {
          this.form.box_list.push(defectItem[0])
        } else {
          this.form.box_list.push({
            id: i,
            defect_id: null
          })
        }
      }
      this.form.defaultBoxList = JSON.stringify(Object.entries(this.form.box_list))
      // console.log(this.form.box_list)
      this.showDialogDefect = true
    },
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.shipped_box_quantity_default = item.shipped_box_quantity
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

<style scoped></style>
