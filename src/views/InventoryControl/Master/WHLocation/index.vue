<template>
  <div class="app-container">
    <Search
      :params="params"
      :options="options"
      :is-create="showCreateOrImport"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
      @handle-reset="reset"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'warehouse_location'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <TableFixedThead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      @handle-preview="showDialogForm('preview',$event)"
      @handle-edit="showDialogForm('edit',$event)"
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
      @created="params.page=1;getData(false)"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @updated="getData(false)"
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
import ButtonPrint from '@/components/Button/Print'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import ButtonAdd from '@/components/Button/Add'
import Search from './components/Search'
import Pagination from '@/components/Pagination'
import { index, codes, destroy, excel } from '@/api/master/warehouse_location'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getWhs } from '@/api/master/warehouse'
import indexMixin from '@/mixins/crud/index'
import DialogForm from './components/DialogForm'

export default {
  name: 'WarehouseLocation',
  mixins: [
    indexMixin(index, {
      warehouses: {
        func: getWhs,
        params: {}
      },
      codes: {
        func: codes,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { TableFixedThead, Search, ButtonPrint, ButtonDownload, ButtonAdd, Pagination, DialogForm, ButtonImport },
  data() {
    return {
      title: this.$t('wh_location_code_list'),
      model: 'warehouseLocation',
      modelable_type: 'warehouse_location',
      exportFileName: 'warehouse-location-code',
      columns: [
        {
          name: 'warehouse_code',
          data: 'warehouse_code',
          width: ''
        },
        {
          name: 'location_code',
          data: 'code',
          width: ''
        },
        {
          name: 'location_description',
          data: 'description',
          width: ''
        },
        {
          name: 'plant_code',
          data: 'plant_code',
          width: ''
        }
      ],
      form: {
        id: null,
        code: null,
        description: null,
        warehouse_code: null,
        plant_code: 'TMAC',
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      },
      listQuery: {
        location_code: null,
        plant_code: null,
        warehouse_code: null,
        page: 1,
        per_page: 20
      }
    }
  }
}
</script>
