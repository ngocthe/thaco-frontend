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
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'warehouse_summary_adjustment'" />
      <!-- <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" /> -->
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <TableFixedThead
      :params="params"
      :columns="columns"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-edit="false"
      :is-delete="false"
      @handle-edit="showDialogForm('edit',$event)"
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
      @created="params.page=1;getData(false)"
      @updated="getData(false)"
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
import ButtonAdd from '@/components/Button/Add'
import ButtonImport from '@/components/Button/Import'
import { excel, destroy, index } from '@/api/inventory/wh_adjustment'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getWhs } from '@/api/master/warehouse'
import { codes as getPlants } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'Warehouse',
  mixins: [
    indexMixin(index, {
      warehouse_code: {
        func: getWhs,
        params: {}
      },
      part_code: {
        func: getParts,
        params: {}
      },
      part_color_code: {
        func: getPartColors,
        params: {}
      },
      plant_code: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      model: 'warehouseSummaryAdjustment',
      exportFileName: 'warehouse-summary-adjustment',
      modelable_type: 'wh_adjustment_summary',
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
          name: 'old_quantity',
          data: 'old_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'new_quantity',
          data: 'new_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'adjustment_quantity',
          data: 'adjustment_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'plant_code',
          data: 'plant_code',
          width: ''
        }
      ],
      listQuery:
        {
          warehouse_code: '',
          part_code: '',
          plant_code: '',
          page: 1,
          per_page: 20
        },
      form: {
        adjustment_quantity: null,
        new_quantity: null,
        old_quantity: null,
        part_code: null,
        part_color_code: null,
        plant_code: 'TMAC',
        warehouse_code: null,
        created_at: null,
        updated_at: null,
        user: {}
      }
    }
  }
}
</script>
