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
import { index, codes, destroy, excel } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'Plant',
  mixins: [
    indexMixin(index, {
      plants: {
        func: codes,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: {
    ButtonPrint,
    ButtonDownload,
    ButtonAdd,
    DialogForm,
    TableFixedThead,
    Search,
    Pagination
  },
  data() {
    return {
      title: this.$t('plant_code'),
      model: 'plant',
      modelable_type: 'plant',
      exportFileName: 'plant-code',
      columns: [
        {
          name: 'plant_code',
          data: 'code',
          width: ''
        }, {
          name: 'plant_description',
          data: 'description',
          width: ''
        }
      ],
      form: {
        id: null,
        code: null,
        description: null,
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      },
      listQuery: {
        page: 1,
        per_page: 20
      }
    }
  }
}
</script>
