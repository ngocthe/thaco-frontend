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
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'ecn'" />
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
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import ButtonImport from '@/components/Button/Import'
import Search from './components/Search'
import DialogForm from './components/DialogForm'
import indexMixin from '@/mixins/crud/index'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getEcns } from '@/api/master/ecn'
import { index, destroy, excel } from '@/api/master/ecn'
import datetimeConvert from '@/mixins/crud/datetimeConvert'

export default {
  name: 'ECN',
  components: { DialogForm, ButtonAdd, ButtonImport, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  mixins: [
    indexMixin(index, {
      plants: {
        func: getPlants,
        params: {}
      },
      ecns: {
        func: getEcns,
        params: {}
      }
    }, destroy, excel), datetimeConvert()],
  data() {
    return {
      title: this.$t('ecn_list'),
      model: 'ecn',
      modelable_type: 'ecn',
      exportFileName: 'ecn',
      listQuery:
      {
        code: '',
        page_number: '',
        line_number: '',
        released_party: '',
        page: 1,
        plant_code: '',
        released_date: '',
        planned_line_off_date: '',
        actual_line_off_date: '',
        planned_packing_date: '',
        actual_packing_date: '',
        per_page: 20
      },
      form: {
        code: null,
        page_number: null,
        line_number: null,
        description: null,
        mandatory_level: null,
        production_interchangeability: null,
        service_interchangeability: null,
        released_party: null,
        released_date: null,
        planned_line_off_date: null,
        actual_line_off_date: null,
        planned_packing_date: null,
        actual_packing_date: null,
        vin: null,
        complete_knockdown: null,
        plant_code: 'TMAC',
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      },
      columns: [{
        name: 'ecn_no',
        data: 'code',
        width: '150'
      }, {
        name: 'ecn_page_number',
        data: 'page_number',
        width: '150'
      }, {
        name: 'ecn_line_number',
        data: 'line_number',
        width: '150'
      }, {
        name: 'ecn_description',
        data: 'description',
        width: '150'
      }, {
        name: 'mandatory_level',
        data: 'mandatory_level',
        width: '150'
      }, {
        name: 'production_interchangeability',
        data: 'production_interchangeability',
        width: '170'
      }, {
        name: 'service_interchangeability',
        data: 'service_interchangeability',
        width: '170'
      }, {
        name: 'ecn_released_party',
        data: 'released_party',
        width: '150'
      }, {
        name: 'ecn_released_date',
        data: 'released_date',
        type: 'date',
        width: '150'
      }, {
        name: 'planned_inspection_line_off_effective_date',
        data: 'planned_line_off_date',
        type: 'date',
        width: '180'
      }, {
        name: 'actual_inspection_line_off_effective_date',
        data: 'actual_line_off_date',
        type: 'date',
        width: '180'
      }, {
        name: 'planned_packing_effective_date',
        data: 'planned_packing_date',
        type: 'date',
        width: '170'
      }, {
        name: 'actual_packing_effective_date',
        data: 'actual_packing_date',
        type: 'date',
        width: '170'
      }, {
        name: 'first_implementation_vin',
        data: 'vin',
        width: '180'
      }, {
        name: 'first_implementation_ckd_contract_no',
        data: 'complete_knockdown',
        width: '180'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '150'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.page_number = item.page_number.toString()
      newItem.line_number = item.line_number.toString()
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>

<style scoped >

</style>
