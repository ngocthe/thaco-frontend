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
      <button-import v-show="showCreateOrImport" :type="'order_point_control'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :modelable-type="modelable_type"
      :table-data="tableData"
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
import Search from '@/views/InventoryControl/Master/UPKWHOrderPointControl/OrderingPointControl/components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import DialogForm from './components/DialogForm'
import { index, destroy, excel } from '@/api/inventory/order_point_controls'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getBoxTypes } from '@/api/master/box_type'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'UPKWHOrderPointControl',
  components: {
    Pagination,
    Search,
    ButtonDownload,
    ButtonImport,
    ButtonPrint,
    TableFixedThead,
    ButtonAdd,
    DialogForm
  },
  mixins: [
    indexMixin(index, {
      parts: {
        func: getParts,
        params: {}
      },
      boxTypes: {
        func: getBoxTypes,
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
    }, destroy, excel)],
  data() {
    return {
      model: 'orderPointControl',
      modelable_type: 'order_point_control',
      exportFileName: 'unpack-warehouse-order-control',
      listQuery: {
        part_code: '',
        part_color_code: '',
        plant_code: '',
        page: 1,
        per_page: 20
      },
      form: {
        part_code: null,
        part_color_code: null,
        standard_stock: null,
        ordering_lot: null,
        box_type_code: null,
        plant_code: 'TMAC',
        remark: null,
        user: {},
        created_at: null,
        updated_at: null
      },
      columns: [{
        name: 'part_no',
        data: 'part_code',
        width: '170px'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '170px'
      }, {
        name: 'standard_stock_part_box',
        data: 'standard_stock',
        width: '170px'
      }, {
        name: 'ordering_lot_number_of_boxes',
        data: 'ordering_lot',
        width: '170px'
      }, {
        name: 'box_type_code',
        data: 'box_type_code',
        width: '170px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '170px'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.standard_stock = item.standard_stock.toString()
      newItem.ordering_lot = item.ordering_lot.toString()
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>
