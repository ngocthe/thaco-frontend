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
    <el-row type="flex" class="row-bg mb20 mt-mobile-20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :remarks="false"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-confirm="showEdit"
      :is-edit="false"
      :is-delete="false"
      @handle-confirm="showDialogFormCustom('confirm',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-delete="openDelete($event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :title="title"
      :defects="defects"
      :confirm="true"
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
// import Search from '@/views/InventoryControl/Master/UPKWHOrderPointControl/BwhOrderRequest/components/Search'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import DialogForm from './components/DialogForm'
import ButtonAdd from '@/components/Button/Add'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import { index, destroy, excel } from '@/api/inventory/bwh_order_request'
import { partColors as getPartColors, parts as getParts, columns } from '@/api/inventory/bwh_inventory_log'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getWarehouseCodes } from '@/api/master/warehouse'
import { codes as getWarehouseLocations } from '@/api/master/warehouse_location'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'UPKWHOrderPointControl',
  components: {
    Pagination,
    Search,
    ButtonDownload,
    ButtonPrint,
    TableFixedThead,
    DialogForm,
    ButtonAdd
  },
  mixins: [
    indexMixin(index, {
      partSearchs: {
        func: columns,
        params: {}
      },
      partColorSearchs: {
        func: columns,
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
      },
      warehouseCodes: {
        func: getWarehouseCodes,
        params: {}
      },
      warehouseLocations: {
        func: getWarehouseLocations,
        params: {}
      },
      casesBwhOrderRequest: {
        func: columns,
        params: {}
      }
    }, destroy, excel)
  ],
  data() {
    return {
      model: 'bwhOrderRequest',
      title: this.$t('bwh_order_request'),
      exportFileName: 'bonded-warehouse-order-request',
      modelable_type: 'bwh_order_request',
      listQuery: {
        part_code: '',
        part_color_code: '',
        plant_code: '',
        page: 1,
        per_page: 20
      },
      defects: [
        { code: null, name: 'OK' },
        { code: 'W', name: 'Wrong' },
        { code: 'D', name: 'Damage' },
        { code: 'S', name: 'Shortage' },
        { code: 'X', name: 'No good' }],
      form: {
        id: null,
        order_number: null,
        contract_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        invoice_code: null,
        part_code: null,
        part_color_code: null,
        box_quantity: null,
        bonded_warehouse_code: null,
        warehouse_code: null,
        shelf_location_code: null,
        warehouse_location_code: null,
        defect_id: null,
        supplier_code: null,
        received_date: null,
        remark: null,
        plant_code: 'TMAC',
        user: {},
        created_at: null,
        updated_at: null

      },
      columns: [
        {
          name: 'order_number',
          data: 'order_number',
          width: '140px'
        }, {
          name: 'contract_no',
          data: 'contract_code',
          width: '140px'
        }, {
          name: 'invoice_no',
          data: 'invoice_code',
          width: '140px'
        }, {
          name: 'bl_no',
          data: 'bill_of_lading_code',
          width: '140px'
        }, {
          name: 'case_no',
          data: 'case_code',
          width: '140px'
        }, {
          name: 'order_trigger_part_no',
          data: 'part_code',
          width: '140px'
        }, {
          name: 'part_color_code',
          data: 'part_color_code',
          width: '140px'
        }, {
          name: 'quantity_of_box',
          data: 'box_quantity',
          width: '140px'
        }, {
          name: 'location_code',
          data: 'warehouse_location_code',
          width: '140px'
        }, {
          name: 'warehouse_code',
          data: 'warehouse_code',
          width: '140px'
        }, {
          name: 'plant_code',
          data: 'plant_code',
          width: '140px'
        }
      ]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.box_quantity = item.box_quantity.toString()
      newItem.part_quantity = item.part_quantity.toString()
      newItem.defect_id = null
      // default value (warehouse_code, shelf_location_code) when open popup confirm is null
      if (mode === 'edit') {
        newItem.warehouse_code = null
        newItem.shelf_location_code = null
      }
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>
