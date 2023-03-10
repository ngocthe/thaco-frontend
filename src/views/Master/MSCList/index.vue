<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'msc'" />
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
      @handle-edit="showDialogForm('edit',$event)"
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
import ButtonPrint from '@/components/Button/Print'
import Search from './components//Search'
import TableFixedThead from '@/components/Table/TableFixedThead'
import DialogForm from './components/DialogForm'
import ButtonImport from '@/components/Button/Import'
import ButtonAdd from '@/components/Button/Add'
import ButtonDownload from '@/components/Button/Download'
import { index, columns as getColumnsMsc, destroy, excel } from '@/api/master/msc'
import { codes as getPlants } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'
import datetimeConvert from '@/mixins/crud/datetimeConvert'

export default {
  name: 'MSCList',
  mixins: [
    indexMixin(index, {
      plants: {
        func: getPlants,
        params: {}
      },
      codes: {
        func: getColumnsMsc,
        params: {}
      },
      model_grades: {
        func: getColumnsMsc,
        params: {}
      }
    }, destroy, excel), datetimeConvert()],
  // eslint-disable-next-line vue/order-in-components
  components: { DialogForm, ButtonDownload, ButtonAdd, TableFixedThead, Search, Pagination, ButtonPrint, ButtonImport },
  data() {
    return {
      title: this.$t('msc'),
      modelable_type: 'msc',
      exportFileName: 'msc',
      model: 'msc',
      form: {
        code: null,
        description: null,
        interior_color: null,
        car_line: null,
        model_grade: null,
        body: null,
        engine: null,
        transmission: null,
        effective_date_in: null,
        effective_date_out: null,
        plant_code: 'TMAC',
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      },
      listQuery:
        {
          code: '',
          car_line: '',
          model_grade: '',
          body: '',
          plant_code: '',
          page: 1,
          per_page: 20
        },
      columns: [{
        name: 'MSC',
        data: 'code',
        width: '180px'
      }, {
        name: 'MSC_description',
        data: 'description',
        width: '180px'
      }, {
        name: 'interior_color_description',
        data: 'interior_color',
        width: '180px'
      }, {
        name: 'car_line',
        data: 'car_line',
        width: '180px'
      }, {
        name: 'model_grade_name',
        data: 'model_grade',
        width: '180px'
      }, {
        name: 'body_description',
        data: 'body',
        width: '180px'
      }, {
        name: 'engine_description',
        data: 'engine',
        width: '180px'
      }, {
        name: 'TM_description',
        data: 'transmission',
        width: '180px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '180px'
      }, {
        name: 'MSC_effective_date_in',
        data: 'effective_date_in',
        type: 'date',
        width: '180px'
      }, {
        name: 'MSC_effective_date_out',
        data: 'effective_date_out',
        type: 'date',
        width: '180px'
      }]
    }
  }
}
</script>
