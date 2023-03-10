<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-search="params.page=1;getData(1)"
      @handle-reset="reset"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'procurement'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      @refresh-data="getData()"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :loading_search="loading_search"
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @created="params.page=1;getData(false)"
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
import DialogForm from './components/DialogForm'
import Pagination from '@/components/Pagination'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getParts } from '@/api/master/part'
import { codes as getSupplier } from '@/api/master/supplier'
import { codes as getPartColor } from '@/api/master/part_color'
import indexMixin from '@/mixins/crud/index'
import { index, destroy, excel } from '@/api/master/procurement'
import ButtonImport from '@/components/Button/Import'

export default {
  name: 'Procurement',
  mixins: [
    indexMixin(index, {
      plants: {
        func: getPlants,
        params: {}
      },
      suppliers: {
        func: getSupplier,
        params: {}
      },
      partColors: {
        func: getPartColor,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      model: 'procurement',
      title: 'part-procurement',
      modelable_type: 'procurement',
      exportFileName: 'part-procurement',
      listQuery:
      {
        part_no: '',
        part_color_code: '',
        supplier_code: '',
        contract_no: '',
        page: 1,
        plant_code: '',
        per_page: 20
      },
      form: {
        part_code: null,
        part_color_code: null,
        minimum_order_quantity: null,
        standard_box_quantity: null,
        part_quantity: null,
        unit: null,
        supplier_code: null,
        contract_code: null,
        plant_code: 'TMAC',
        created_at: null,
        updated_at: null,
        remark: null,
        user: {}
      },
      columns: [{
        name: 'part_no',
        data: 'part_code',
        width: '180px'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '180px'
      }, {
        name: 'minimum',
        data: 'minimum_order_quantity',
        width: '180px'
      }, {
        name: 'standard_number',
        data: 'standard_box_quantity',
        width: '180px'
      }, {
        name: 'parts_quantity_in_box',
        data: 'part_quantity',
        width: '180px'
      }, {
        name: 'unit',
        data: 'unit',
        width: '180px'
      }, {
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '180px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '180px'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.minimum_order_quantity = item.minimum_order_quantity ? item.minimum_order_quantity.toString() : ''
      newItem.standard_box_quantity = item.standard_box_quantity ? item.standard_box_quantity.toString() : ''
      newItem.part_quantity = item.part_quantity ? item.part_quantity.toString() : ''
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>

<style scoped >

</style>
