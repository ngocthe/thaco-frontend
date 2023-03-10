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
      <button-import v-show="showCreateOrImport" :type="'part'" />
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
      @updated="getData(false)"
      @handle-change-search="params.page=1;getOpSearch($event)"
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
import ButtonImport from '@/components/Button/Import'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getParts } from '@/api/master/part'
import { columns as getPartNames } from '@/api/master/part'
import { codes as getPartGroups } from '@/api/master/part_group'
import { codes as getEcns } from '@/api/master/ecn'
import indexMixin from '@/mixins/crud/index'
import { index, destroy, excel } from '@/api/master/part'

export default {
  name: 'PartList',
  mixins: [
    indexMixin(index, {
      plants: {
        func: getPlants,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      },
      partNames: {
        func: getPartNames,
        params: {}
      },
      partGroups: {
        func: getPartGroups,
        params: {}
      },
      ecns: {
        func: getEcns,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, ButtonImport },
  data() {
    return {
      title: this.$t('part_list'),
      model: 'part',
      modelable_type: 'part',
      exportFileName: 'part',
      listQuery:
        {
          code: '',
          page: 1,
          keyword: '',
          plant_code: '',
          per_page: 20
        },
      form: {
        code: null,
        name: null,
        group: null,
        ecn_in: null,
        ecn_out: null,
        plant_code: 'TMAC',
        ecn_in_date: null,
        ecn_out_date: null,
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      },
      columns: [{
        name: 'part_no',
        data: 'code',
        width: '150px'
      }, {
        name: 'part_name',
        data: 'name',
        width: '150px'
      }, {
        name: 'part_group',
        data: 'group',
        width: '150px'
      }, {
        name: 'ecn_no_in',
        data: 'ecn_in.code',
        width: '150px'
      }, {
        name: 'ecn_no_in_date',
        data: 'ecn_in.actual_packing_date',
        type: 'date',
        width: '150px'
      }, {
        name: 'ecn_no_out',
        data: 'ecn_out.code',
        width: '150px'
      }, {
        name: 'ecn_no_out_date',
        data: 'ecn_out.actual_line_off_date',
        type: 'date',
        width: '150px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '150px'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.ecn_in = item.ecn_in ? item.ecn_in.code : null
      newItem.ecn_out = item.ecn_out ? item.ecn_out.code : null
      newItem.ecn_in_date = item.ecn_in ? item.ecn_in.actual_packing_date : null
      newItem.ecn_out_date = item.ecn_out ? item.ecn_out.actual_line_off_date : null
      this.showDialogForm(mode, newItem)
    }
  }

}
</script>

<style scoped >

</style>
