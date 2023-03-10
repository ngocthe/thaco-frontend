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
      <el-dropdown @command="handleCommand">
        <el-button
          type="default"
          class="ml20 btn-download"
          size="small"
          icon="el-icon-download"
        >
          Download
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="in-transit">Download file for In-transit</el-dropdown-item>
          <el-dropdown-item command="bwh">Download file for BWH</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <button-import v-show="showCreateOrImport" :type="'in_transit_inventory_log'" />
      <!-- <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" /> -->
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
import ButtonAdd from '@/components/Button/Add'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import indexMixin from '@/mixins/crud'
import { index, destroy, excel, columns } from '@/api/inventory/in_transit_inventory_log'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartsColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
// import { codes as getProcurements } from '@/api/master/procurement'
import { codes as getSuppliers } from '@/api/master/supplier'
import { codes as getBoxTypes } from '@/api/master/box_type'
// import datetimeConvert from '@/mixins/crud/datetimeConvert'

export default {
  name: 'IntransitInventoryLog',
  components: { TableFixedThead, ButtonPrint, ButtonImport, Search, Pagination, DialogForm, ButtonAdd },
  mixins: [
    indexMixin(index, {
      contracts: {
        func: columns,
        params: {}
      },
      invoices: {
        func: columns,
        params: {}
      },
      bills: {
        func: columns,
        params: {}
      },
      containers: {
        func: columns,
        params: {}
      },
      cases: {
        func: columns,
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
      },
      boxTypes: {
        func: getBoxTypes,
        params: {}
      }
    // }, destroy, excel), datetimeConvert()],
    }, destroy, excel)],
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      title: this.$t('in_transit_inventory_log_list_title'),
      modelable_type: 'in_transit_inventory_log',
      exportFileName: 'in-transit-inventory',
      model: 'inTransitInventoryLog',
      params: {
        page: 1,
        per_page: 20,
        export_for_bwh: false,
        contract_code: null,
        invoice_code: null,
        bill_of_lading_code: null,
        container_code: null,
        case_code: null,
        part_code: null,
        part_color_code: null,
        plant_code: null,
        supplier_code: null,
        container_shipped: null,
        updated_at: null,
        container_received: null
      },
      form: {
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
        etd: null,
        container_shipped: null,
        eta: null,
        released_party: null,
        container_received: null,
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
        name: 'etd',
        data: 'etd',
        type: 'date',
        width: '175'
      }, {
        name: 'date_container_shipped',
        data: 'container_shipped',
        type: 'date',
        width: '175'
      }, {
        name: 'eta',
        data: 'eta',
        type: 'date',
        width: '175'
      }, {
      //   name: 'date_container_received',
      //   data: 'container_received',
      //   type: 'date',
      //   width: '175'
      // }, {
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
    handleCommand(command) {
      if (command === 'bwh') {
        this.final_params.export_for_bwh = true
      } else {
        this.final_params.export_for_bwh = false
      }
      this.exportData()
    }
  }
}
</script>

<style scoped >
.btn-download {
  width: 138px;
  height: 40px;
}
</style>
