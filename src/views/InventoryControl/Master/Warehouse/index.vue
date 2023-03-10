<template>
  <div class="app-container">
    <Search
      :params="params"
      :options="options"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
      @handle-reset="reset"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
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
import DialogForm from './components/DialogForm'
import TableFixedThead from '@/components/Table/TableFixedThead'
import Search from './components/Search'
import ButtonPrint from '@/components/Button/Print'
import ButtonDownload from '@/components/Button/Download'
import ButtonAdd from '@/components/Button/Add'
import Pagination from '@/components/Pagination'
import { codes as getPlants } from '@/api/master/plant'
import { index, codes, destroy, excel } from '@/api/master/warehouse'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'WarehouseCodeList',
  mixins: [
    indexMixin(index, {
      warehouses: {
        func: codes,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { TableFixedThead, Search, Pagination, ButtonPrint, ButtonDownload, ButtonAdd, DialogForm },
  data() {
    return {
      title: this.$t('warehouse_code'),
      model: 'warehouse',
      modelable_type: 'warehouse',
      exportFileName: 'warehouse-code',
      columns: [
        {
          name: 'warehouse_code',
          data: 'code',
          width: ''
        },
        {
          name: 'warehouse_description',
          data: 'description',
          width: ''
        }, {
          name: 'plant_code',
          data: 'plant_code',
          width: ''
        }
      ],
      form: {
        id: null,
        code: null,
        description: null,
        plant_code: 'TMAC',
        warehouse_type: null,
        remark: null,
        user: {},
        created_at: null,
        updated_at: null
      },
      listQuery: {
        code: '',
        plant_code: '',
        page: 1,
        per_page: 20
      }
    }
  }
}
</script>
