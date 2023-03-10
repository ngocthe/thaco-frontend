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
        class="is-top line-tab line-tab-adj-msc"
      />
      <div class="tab-hover tab" @click="changeTab()">
        Part
      </div>
      <div class="ml20 tab-hover tab tab-active">
        MSC
      </div>
    </div>

    <el-row type="flex" class="row-bg mb20 mt20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
      <button-import v-show="showCreateOrImport" :type="'warehouse_logical_adjustment_msc'" />
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
import { index, excel, destroy } from '@/api/inventory/wh_adjustment_msc'
import { codes as getMSCs } from '@/api/msc_list'
import { codes as getPlant } from '@/api/master/plant'
import { codes as getExteriorColor } from '@/api/master/vehicle_color'
import { columns as getColumnsBom } from '@/api/master/bom'
import { formatDateTime } from '@/filters'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'MSCLogical',
  mixins: [
    indexMixin(index, {
      msc_code: {
        func: getMSCs,
        params: {}
      },
      vehicle_color_code: {
        func: getExteriorColor,
        params: {}
      },
      plant_code: {
        func: getPlant,
        params: {}
      },
      mscs: {
        func: getColumnsBom,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      model: 'logicalInventoryMscAdjustment',
      modelable_type: 'wh_adjustment_logical_msc',
      exportFileName: 'warehouse-logical-adjustment_msc',
      tabActive: 'msc',
      columns: [
        {
          name: 'msc_code',
          data: 'msc_code',
          width: ''
        }, {
          name: 'exterior_color_code',
          data: 'vehicle_color_code',
          width: ''
        }, {
          name: 'adjustment_quantity',
          data: 'adjustment_quantity',
          width: '',
          type: 'negative'
        }, {
          name: 'production_date',
          data: 'production_date',
          width: '',
          type: 'date'
        }, {
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
        msc_code: null,
        vehicle_color_code: null,
        adjustment_quantity: null,
        production_date: formatDateTime(new Date(), 'y-m-d'),
        plant_code: 'TMAC',
        created_at: null,
        updated_at: null,
        user: {}
      }
    }
  },
  methods: {
    changeTab(tab) {
      this.$emit('switch-part')
    }
  }
}
</script>
