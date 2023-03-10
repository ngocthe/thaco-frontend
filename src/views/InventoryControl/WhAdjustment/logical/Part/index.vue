<template>
  <div class="app-container">
    <Search
      :params="params"
      :options="options"
      :is-create="showCreateOrImport"
      :loading_search="loading_search"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />

    <div class="d-flex tab_wrapper position-relative mb20 mt20">
      <div
        class="is-top line-tab line-tab-adj-part"
      />
      <div class="tab-hover tab tab-active">
        Part
      </div>
      <div class="ml20 tab-hover tab" @click="changeTab()">
        MSC
      </div>
    </div>

    <el-row type="flex" class="row-bg mb20 mt20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'warehouse_logical_adjustment_part'" />
      <!-- <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" /> -->
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>

    <TableFixedThead
      :params="params"
      :columns="columns"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-edit="false"
      :is-delete="false"
      @handle-edit="showDialogForm('edit',$event)"
      @handle-preview="showDialogForm('preview',$event)"
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
import TableFixedThead from '@/components/Table/TableFixedThead'
import Search from './components/Search'
import DialogForm from './components/DialogForm'
import Pagination from '@/components/Pagination'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import ButtonAdd from '@/components/Button/Add'
import ButtonImport from '@/components/Button/Import'
import { excel, index, destroy } from '@/api/inventory/wh_adjustment_part'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getWhs } from '@/api/master/warehouse'
import { codes as getPlants } from '@/api/master/plant'
import indexMixin from '@/mixins/crud/index'
import { formatDateTime } from '@/filters'

export default {
  name: 'PartLogical',
  mixins: [
    indexMixin(index, {
      part_code: {
        func: getParts,
        params: {}
      },
      warehouse_code: {
        func: getWhs,
        params: {}
      },
      part_color_code: {
        func: getPartColors,
        params: {}
      },
      plant_code: {
        func: getPlants,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      model: 'logicalInventoryPartAdjustment',
      modelable_type: 'wh_adjustment_logical_part',
      exportFileName: 'warehouse-logical-adjustment_part',
      tabActive: 'part',
      columns: [
        {
          name: 'part_no',
          data: 'part_code',
          width: ''
        }, {
          name: 'part_color_code',
          data: 'part_color_code',
          width: ''
        }, {
          name: 'old_quantity',
          data: 'old_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'new_quantity',
          data: 'new_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'adjustment_quantity',
          data: 'adjustment_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'adjustment_date',
          data: 'adjustment_date',
          width: '',
          type: 'date'
        },
        {
          name: 'plant_code',
          data: 'plant_code',
          width: ''
        }
      ],
      listQuery:
        {
          warehouse_code: '',
          part_code: '',
          page: 1,
          plant_code: '',
          per_page: 20
        },
      form: {
        part_code: null,
        part_color_code: null,
        old_quantity: null,
        new_quantity: null,
        adjustment_quantity: null,
        adjustment_date: formatDateTime(new Date(), 'y-m-d'),
        plant_code: 'TMAC',
        created_at: null,
        updated_at: null,
        user: {}
      }
    }
  },
  mounted() {
  },
  methods: {
    changeTab(tab, event) {
      this.$emit('switch-msc')
    }
  }
}
</script>
