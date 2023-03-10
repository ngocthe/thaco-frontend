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
      <button-import v-show="showCreateOrImport" :type="'bom'" />
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
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import ButtonDownload from '@/components/Button/Download'
import Search from './components/Search'
import { index, destroy, excel, columns } from '@/api/master/bom'
import { codes as getMscs } from '@/api/master/msc'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getEcns } from '@/api/master/ecn'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import indexMixin from '@/mixins/crud/index'
import DialogForm from '@/views/Master/Bom/components/DialogForm'
import ButtonImport from '@/components/Button/Import'

export default {
  name: 'BOM',
  mixins: [
    indexMixin(index, {
      ecnIns: {
        func: getEcns,
        params: {}
      },
      ecnOuts: {
        func: getEcns,
        params: {}
      },
      mscs: {
        func: getMscs,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      },
      partColors: {
        func: getPartColors,
        params: {}
      },
      shopCodes: {
        func: columns,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, ButtonDownload, Search, ButtonAdd, TableFixedThead, ButtonPrint, DialogForm, Pagination },
  data() {
    return {
      title: this.$t('bom_list'),
      modelable_type: 'bom',
      exportFileName: 'bom',
      model: 'bom',
      listQuery:
        {
          msc_code: null,
          shop_code: null,
          part_code: null,
          part_color_code: null,
          plant_code: null,
          page: 1,
          per_page: 20
        },
      columns: [{
        name: 'msc',
        data: 'msc_code',
        width: '150'
      }, {
        name: 'shop_code',
        data: 'shop_code',
        width: '150'
      }, {
        name: 'part_no',
        data: 'part_code',
        width: '150'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '150'
      }, {
        name: 'quantity_per_unit',
        data: 'quantity',
        width: '150'
      }, {
        name: 'part_remarks',
        data: 'part_remarks',
        width: '150'
      }, {
        name: 'ecn_no_in',
        data: 'ecn_in',
        width: '150'
      }, {
        name: 'ecn_no_out',
        data: 'ecn_out',
        width: '150'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '150'
      }],
      form: {
        id: null,
        msc_code: null,
        shop_code: null,
        part_code: null,
        part_color_code: null,
        quantity: null,
        part_remarks: null,
        ecn_in: null,
        ecn_out: null,
        plant_code: 'TMAC',
        remark: null,
        created_at: null,
        updated_at: null,
        user: {}
      }
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
