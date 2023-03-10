<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :search-defects="searchDefects"
      :loading_search="loading_search"
      :defects="defects"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="printData" />
      <button-download @handleDownload="exportData" />
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
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-defect="showDefectForm($event)"
      @handle-delete="openDelete($event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :title="title"
      :defects="defects"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      :loading_search="loading_search"
      @created="params.page=1;getData(false)"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @updated="getData(false)"
    />
    <DefectForm
      :options="options"
      :form="form"
      :show-dialog-defect.sync="showDialogDefect"
      :defects="defects"
      :search-defects="searchDefects"
      @updated="getData(false)"
    />
    <Delete
      :loading="loading"
      :update_summary="update_summary"
      :show-form-delete.sync="showFormDelete"
      @handle-delete="handleDelete($event)"
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
import Search from './components/Search'
import ButtonAdd from '@/components/Button/Add'
import DialogForm from './components/DialogForm'
import indexMixin from '@/mixins/crud/index'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getWhs } from '@/api/master/warehouse'
import { codes as getParts } from '@/api/master/part'
import { codes as getPlants } from '@/api/master/plant'
import { codes as getBoxTypes } from '@/api/master/box_type'
import { columns as getColumnBwhInventoryLogs } from '@/api/inventory/bwh_inventory_log'
import { index, destroy, excel } from '@/api/inventory/plant_wh_inventory_log'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import DefectForm from './components/DefectForm'
import Delete from '@/components/Dialog/Delete'

export default {
  name: 'PlanWHInventoryLogList',
  components: { Delete, DefectForm, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, ButtonAdd, DialogForm },
  mixins: [
    indexMixin(index, {
      warehouses: {
        func: getWhs,
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
      plants: {
        func: getPlants,
        params: {}
      },
      boxTypes: {
        func: getBoxTypes,
        params: {}
      },
      columnBwhInventoryLogs: {
        func: getColumnBwhInventoryLogs,
        params: {}
      }
    }, destroy, excel), datetimeConvert()],
  data() {
    return {
      title: this.$t('plant_WH_inventory_log'),
      model: 'plantInventoryLog',
      modelable_type: 'plant_wh_inventory_log',
      exportFileName: 'plant-warehouse-inventory',
      list: [],
      showDialogDefect: false,
      total: 0,
      listLoading: true,
      update_summary: false,
      currentId: null,
      showFormDelete: false,
      params: {
        page: 1,
        per_page: 20,
        part_code: null,
        part_color_code: null,
        plant_code: null,
        warehouse_code: null,
        updated_date_time: null,
        date_received: null,
        received_date: null,
        defect_id: null,
        updated_at: null
      },
      searchDefects: [
        { code: 0, name: 'OK' },
        { code: 1, name: 'Has Defect' },
        { code: 'W', name: 'Has Defect' },
        { code: null, name: 'OK' }
      ],
      form: {
        part_code: null,
        part_color_code: null,
        box_type_code: null,
        received_box_quantity: null,
        received_date: null,
        quantity: null,
        unit: null,
        warehouse_code: null,
        plant_code: 'TMAC',
        remark: null,
        defect_id: null,
        user: {},
        created_at: null,
        updated_at: null
      },
      columns: [{
        name: 'part_no',
        data: 'part_code',
        width: '150px'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '150px'
      }, {
        name: 'box_type_code',
        data: 'box_type_code',
        width: '150px'
      }, {
        name: 'date_received_at_assembly_plant',
        data: 'received_date',
        type: 'date',
        width: '150px'
      }, {
        name: 'number_of_boxes_received_UPKWH',
        data: 'received_box_quantity',
        width: '200px'
      }, {
        name: 'parts_quantity',
        data: 'quantity',
        width: '150px'
      }, {
        name: 'unit',
        data: 'unit',
        width: '150px'
      }, {
        name: 'warehouse_code',
        data: 'warehouse_code',
        width: '150px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '150px'
      }, {
        name: 'defect_status',
        data: 'defect_id',
        type: 'defect_2_case',
        width: '175'
      }],
      defects: [
        { code: null, name: 'OK' },
        { code: 'W', name: 'Wrong' },
        { code: 'D', name: 'Damage' },
        { code: 'S', name: 'Shortage' },
        { code: 'X', name: 'No good' }
      ]
    }
  },
  methods: {
    showDefectForm(item) {
      this.form = { ...item }
      this.form.box_list = []
      for (var i = 1; i < (+this.form.received_box_quantity + 1); i++) {
        var defectItem = this.form.defects.filter(e => { return e.id === i })
        if (defectItem.length > 0) {
          defectItem[0].edit = false
          this.form.box_list.push(
            {
              id: i,
              defect_id: defectItem[0].defect_id,
              part_defect_quantity: defectItem[0].defect_id === null ? null : defectItem[0].part_defect_quantity,
              remark: defectItem[0].defect_id === null ? null : defectItem[0].remark,
              edit: !((defectItem[0].defect_id === null || defectItem[0].defect_id === ''))
            }
          )
        } else {
          this.form.box_list.push({
            id: i,
            defect_id: null,
            part_defect_quantity: 0,
            remark: null,
            edit: false
          })
        }
      }
      this.form.defaultBoxList = JSON.stringify(Object.entries(this.form.box_list))
      this.showDialogDefect = true
    },
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.quantity = item.quantity.toString()
      this.showDialogForm(mode, newItem)
    },
    openDeleteCustom(item) {
      this.currentId = item
      this.showFormDelete = true
    },
    async handleDelete(update) {
      this.$loader(true)
      try {
        await destroy(this.currentId, { update_summary: update })
        this.getData()
        this.showFormDelete = false
        this.$loader(false)
        this.$message({
          type: 'success',
          message: this.$t('delete_completed')
        })
      } catch (error) {
        this.$loader(false)
        if (error !== 'cancel') {
          this.$message({
            message: error.message,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped >

</style>
