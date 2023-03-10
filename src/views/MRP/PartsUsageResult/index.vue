<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
      @handle-reset="reset"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'part_usage_result'" />
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
      @handle-preview="showDialogForm('preview',$event)"
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
import Pagination from '@/components/Pagination'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import Search from '@/views/MRP/PartsUsageResult/components/Search'
import DialogForm from '@/views/MRP/PartsUsageResult/components/DialogForm'
import { index, columns, destroy, excel } from '@/api/mrp/part_usage_result'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'PartsUsageResult',
  mixins: [
    indexMixin(index, {
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
      partSearchs: {
        func: columns,
        params: {}
      },
      partColorSearchs: {
        func: columns,
        params: {}
      },
      plantSearchs: {
        func: columns,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { Search, ButtonAdd, TableFixedThead, ButtonPrint, ButtonImport, ButtonDownload, Pagination, DialogForm },
  data() {
    return {
      title: 'part_usage_result',
      model: 'partUsageResult',
      modelable_type: 'part_usage_result',
      listQuery:
      {
        used_date: '',
        part_code: '',
        part_color_code: '',
        plant_code: '',
        page: 1,
        per_page: 20
      },
      form: {
        used_date: null,
        part_code: null,
        part_color_code: null,
        quantity: null,
        plant_code: 'TMAC',
        user: {},
        created_at: null,
        updated_at: null
      },
      columns: [{
        name: 'parts_used_date',
        data: 'used_date',
        type: 'date',
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
        name: 'parts_used_quantity',
        data: 'quantity',
        width: ''
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: ''
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.quantity = item.quantity.toString()
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>

<style scoped >

</style>
