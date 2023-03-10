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
      <button-import v-show="showCreateOrImport" :type="'supplier'" />
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
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
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
import { index, codes, destroy, excel } from '@/api/master/supplier'
import indexMixin from '@/mixins/crud/index'
import ButtonImport from '@/components/Button/Import'

export default {
  name: 'SupplierList',
  mixins: [
    indexMixin(index, {
      suppliers: {
        func: codes,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, DialogForm },
  data() {
    return {
      model: 'supplier',
      title: this.$t('supplier_list'),
      modelable_type: 'supplier',
      exportFileName: 'procurement-supplier-master',
      listQuery:
        {
          code: null,
          description: null,
          page: 1,
          per_page: 20
        },
      form: {
        code: null,
        description: null,
        address: null,
        phone: null,
        forecast_by_week: null,
        forecast_by_month: null,
        receiver: [],
        bcc: [],
        cc: [],
        created_at: null,
        updated_at: null,
        remark: null,
        user: {}
      },
      columns: [{
        name: 'procurement_supplier_code',
        data: 'code',
        width: '150px'
      }, {
        name: 'procurement_supplier_code_description',
        data: 'description',
        width: '250px'
      }, {
        name: 'address_procurement_supplier',
        data: 'address',
        width: '250px'
      }, {
        name: 'phone_no_procurement_supplier',
        data: 'phone',
        width: '200px'
      }, {
        name: 'number_of_forecast_by_week',
        data: 'forecast_by_week',
        width: '200px'
      }, {
        name: 'number_of_forecast_by_month',
        data: 'forecast_by_month',
        width: '200px'
      }, {
        name: 'receiver',
        data: 'receiver',
        type: 'array',
        width: '250px'
      },
      {
        name: 'bcc',
        data: 'bcc',
        type: 'array',
        width: '250px'
      }, {
        name: 'cc',
        data: 'cc',
        type: 'array',
        width: '250px'
      }
      ]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.forecast_by_week = item.forecast_by_week ? item.forecast_by_week.toString() : ''
      newItem.forecast_by_month = item.forecast_by_month ? item.forecast_by_month.toString() : ''
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>
