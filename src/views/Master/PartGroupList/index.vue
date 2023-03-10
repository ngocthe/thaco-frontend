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
import indexMixin from '@/mixins/crud/index'
import { index, codes, destroy, excel } from '@/api/master/part_group'

export default {
  name: 'PartList',
  mixins: [
    indexMixin(index, {
      partGroups: {
        func: codes,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, DialogForm },
  data() {
    return {
      title: this.$t('part_group_list'),
      model: 'partGroup',
      modelable_type: 'part_group',
      exportFileName: 'part-group',
      listQuery:
        {
          page: 1,
          code: '',
          per_page: 20
        },
      form: {
        code: null,
        description: null,
        ordering_cycle: null,
        type_part_group: 'abroad',
        lead_time: null,
        delivery_lead_time: null,
        created_at: null,
        updated_at: null,
        remark: null,
        user: {}
      },
      columns: [{
        name: 'part_group_code',
        data: 'code',
        width: ''
      }, {
        name: 'part_group_description',
        data: 'description',
        width: ''
      }, {
        name: 'lead_time',
        data: 'lead_time',
        width: ''
      }, {
        name: 'ordering_cycle',
        data: 'ordering_cycle',
        width: ''
      }, {
        name: 'delivery_lead_time',
        data: 'delivery_lead_time',
        width: ''
      }
      ]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      if (item.lead_time) {
        this.form.type_part_group = 'abroad'
        newItem.type_part_group = this.form.type_part_group
        newItem.lead_time = item.lead_time ? item.lead_time.toString() : ''
      }
      if (item.delivery_lead_time) {
        this.form.type_part_group = 'vn'
        newItem.type_part_group = this.form.type_part_group
        newItem.delivery_lead_time = item.delivery_lead_time ? item.delivery_lead_time.toString() : ''
      }
      this.showDialogForm(mode, newItem)
    }
  }
}
</script>

<style scoped >

</style>
