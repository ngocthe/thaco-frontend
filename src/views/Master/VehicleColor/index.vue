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
      <button-import v-show="showCreateOrImport" :type="'vehicle_color'" />
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
import { index, codes, destroy, excel, columns } from '@/api/master/vehicle_color'
import { codes as getEcns } from '@/api/master/ecn'
import { codes as getPlants } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'
import ButtonImport from '@/components/Button/Import'

export default {
  name: 'BoxTypeList',
  mixins: [
    indexMixin(index, {
      ecnOuts: {
        func: getEcns,
        params: {}
      },
      ecnIns: {
        func: getEcns,
        params: {}
      },
      vehicleColors: {
        func: codes,
        params: {}
      },
      vehicleColorsSearch: {
        func: columns,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      model: 'vehicleColor',
      title: this.$t('vehicle_color_list'),
      modelable_type: 'vehicle_color',
      exportFileName: 'vehicle-color-master',
      listQuery:
        {
          code: '',
          vehicle_type: '',
          plant_code: '',
          page: 1,
          per_page: 20
        },
      form: {
        code: null,
        type: null,
        name: null,
        ecn_in: null,
        ecn_out: null,
        plant_code: 'TMAC',
        created_at: null,
        updated_at: null,
        remark: null,
        user: {}
      },
      columns: [{
        name: 'vehicle_color_code',
        data: 'code',
        width: '180px'
      }, {
        name: 'vehicle_color_type',
        data: 'type'
      }, {
        name: 'vehicle_color_name',
        data: 'name'
      }, {
        name: 'ecn_no_in',
        data: 'ecn_in'
      }, {
        name: 'ecn_no_out',
        data: 'ecn_out'
      }, {
        name: 'plant_code',
        data: 'plant_code'
      }]
    }
  },
  mounted() {
    this.options.types = ['EXT', 'INT']
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>
