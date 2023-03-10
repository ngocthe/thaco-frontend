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
      <button-import v-show="showCreateOrImport" :type="'box_type'" />
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
import DialogForm from './components/DialogForm'
import Pagination from '@/components/Pagination'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import { index, codes, destroy, excel } from '@/api/master/box_type'
import { codes as getParts } from '@/api/master/part'
import { codes as getPlants } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'
import ButtonImport from '@/components/Button/Import'

export default {
  name: 'BoxTypeList',
  mixins: [
    indexMixin(index, {
      parts: {
        func: getParts,
        params: {}
      },
      boxTypes: {
        func: codes,
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
      model: 'boxType',
      title: this.$t('box_type_title'),
      modelable_type: 'box_type',
      exportFileName: 'box-type-master',
      listQuery:
        {
          part_no: '',
          code: '',
          plant_code: '',
          page: 1,
          per_page: 20
        },
      form: {
        code: null,
        part_code: null,
        description: null,
        weight: null,
        width: null,
        height: null,
        depth: null,
        quantity: null,
        unit: null,
        plant_code: 'TMAC',
        created_at: null,
        updated_at: null,
        remark: null,
        user: {}
      },
      columns: [{
        name: 'part_no',
        data: 'part_code',
        width: '180px'
      }, {
        name: 'box_type_code',
        data: 'code',
        width: '180px'
      }, {
        name: 'box_type_description',
        data: 'description',
        width: '180px'
      }, {
        name: 'box_weight_gram',
        data: 'weight',
        width: '180px'
      }, {
        name: 'size_box_x_mm',
        data: 'width',
        width: '180px'
      }, {
        name: 'size_box_y_mm',
        data: 'height',
        width: '180px'
      }, {
        name: 'size_box_z_mm',
        data: 'depth',
        width: '180px'
      }, {
        name: 'part_quantity_in_box',
        data: 'quantity',
        width: '180px'
      }, {
        name: 'unit',
        data: 'unit',
        width: '180px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '180px'
      }]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.weight = item.weight ? item.weight.toString() : ''
      newItem.width = item.width ? item.width.toString() : ''
      newItem.height = item.height ? item.height.toString() : ''
      newItem.depth = item.depth ? item.depth.toString() : ''
      newItem.quantity = item.quantity ? item.quantity.toString() : ''
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>
