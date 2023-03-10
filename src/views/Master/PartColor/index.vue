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
      <button-import v-show="showCreateOrImport" :type="'part_color'" />
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
import { codes as getEcns } from '@/api/master/ecn'
import { codes as getVehicleColors } from '@/api/master/vehicle_color'
import { codes as getPartColors } from '@/api/master/part_color'
import { columns as getPartColorNames } from '@/api/master/part_color'
import indexMixin from '@/mixins/crud/index'
import { index, destroy, excel } from '@/api/master/part_color'

export default {
  name: 'PartColor',
  components: { ButtonImport, DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  mixins: [
    indexMixin(index, {
      vehicleColorsInt: {
        func: getVehicleColors,
        params: {}
      },
      vehicleColorsExt: {
        func: getVehicleColors,
        params: {}
      },
      partColors: {
        func: getPartColors,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      },
      parts: {
        func: getParts,
        params: {}
      },
      ecns: {
        func: getEcns,
        params: {}
      },
      partColorNames: {
        func: getPartColorNames,
        params: {}
      }
    }, destroy, excel)],
  data() {
    return {
      model: 'partColor',
      modelable_type: 'part_color',
      exportFileName: 'part-color',
      title: this.$t('part_color_list'),
      listQuery:
      {
        exterior_color_condition: '',
        inter_color_condition: '',
        part_no: '',
        part_code: '',
        page: 1,
        plant_code: '',
        ecn_no_in: '',
        ecn_no_out: '',
        per_page: 20,
        keyword: ''
      },
      form: {
        code: null,
        name: null,
        part_code: null,
        interior_code: null,
        vehicle_color_code: null,
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
        data: 'part_code',
        width: '150'
      }, {
        name: 'part_color_code',
        data: 'code',
        width: '150'
      }, {
        name: 'part_color_name',
        data: 'name',
        width: '150'
      }, {
        name: 'inter_color_condition',
        data: 'interior_code',
        width: '150'
      }, {
        name: 'exterior_color_condition',
        data: 'vehicle_color_code',
        width: '150'
      }, {
        name: 'ecn_no_in',
        data: 'ecn_in.code',
        width: '150'
      }, {
        name: 'ecn_no_in_date',
        data: 'ecn_in.actual_packing_date',
        type: 'date',
        width: '150'
      }, {
        name: 'ecn_no_out',
        data: 'ecn_out.code',
        width: '150'
      }, {
        name: 'ecn_no_out_date',
        data: 'ecn_out.actual_line_off_date',
        type: 'date',
        width: '150'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '100'
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
