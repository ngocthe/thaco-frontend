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
      <button-import v-show="showCreateOrImport" :type="'mrp_ordering_calendar'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      :modelable-type="modelable_type"
      :has-custom-action="true"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
    >
      <template v-slot:col_action>
        <el-table-column
          align="center"
          :label="$t('actions')"
          width="120px"
          fixed="right"
        >
          <template slot-scope="scopeData">
            <div class="d-flex-center" style="justify-content: start;">
              <el-button
                class="btn-list btn-action btn-preview"
                type="primary"
                size="mini"
                icon="el-icon-view"
                @click="showDialogFormCustom('preview',scopeData.row)"
              />
              <el-button
                v-show="showEdit"
                class="btn-list btn-action btn-edit"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showDialogFormCustom('edit',scopeData.row)"
              />
              <el-button
                v-show="showDelete"
                v-if="scopeData.row.status == statusMRPOrderingCalendar.WAIT"
                slot="reference"
                class="btn-action btn-delete btn-list"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="openDelete(scopeData.row.id)"
              />
            </div>
          </template>
        </el-table-column>
      </template>
    </table-fixed-thead>
    <DialogForm
      ref="formDialog"
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      :loading_search="loading_search"
      @created="params.page=1;getData()"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @updated="getData"
      @display-warning="showWarning"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />

    <PopupCommon
      v-if="isShowWarningPopup"
      style="z-index: 1000"
      title="Warning"
      title_submit="OK"
      @submit="submitNotWarning()"
      @close="isShowWarningPopup=false"
    >
      <p>{{ messageWarning }}</p>
    </PopupCommon>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ButtonDownload from '@/components/Button/Download'
import ButtonImport from '@/components/Button/Import'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import Search from './components/Search'
import DialogForm from './components/DialogForm'
import indexMixin from '@/mixins/crud/index'
import { codes as getPartGroup } from '@/api/master/part_group'
import { index, destroy, excel, columns } from '@/api/mrp/mrp_ordering_calendar'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import { statusMRPOrderingCalendar } from '@/utils/constant'
import PopupCommon from '@/components/Dialog/PopupCommon'

export default {
  name: 'BOM',
  components: { DialogForm, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination, ButtonImport, PopupCommon },
  mixins: [
    indexMixin(index, {
      part_group: {
        func: getPartGroup,
        params: {}
      },
      contract_code: {
        func: columns,
        params: {}
      }
    }, destroy, excel), datetimeConvert()],
  data() {
    return {
      title: this.$t('ordering_calendar_title'),
      modelable_type: 'mrp_ordering_calendar',
      model: 'mrpOrderCalendar',
      listQuery:
      {
        contract_code: null,
        part_group: null,
        status: null
      },
      form: {
        buffer_span_from: null,
        buffer_span_to: null,
        contract_code: null,
        eta: null,
        etd: null,
        id: null,
        mrp_or_run: null,
        order_span_from: null,
        order_span_to: null,
        part_group: null,
        status: null,
        target_plan_from: null,
        target_plan_to: null,
        user: {},
        created_at: null,
        updated_at: null,
        remark: null
      },
      customFormCreate: {},
      columns: [{
        name: 'contract_no',
        data: 'contract_code',
        width: '150'
      }, {
        name: 'part_group',
        data: 'part_group',
        width: '150'
      }, {
        name: 'status',
        data: 'status',
        width: '150',
        filter: 'getStatusMRPOrderingCalendar'
      }, {
        name: 'mrp_run_at',
        data: 'mrp_or_run.item',
        type: 'date',
        width: '150'
      }, {
        name: 'supplier_order_span_from',
        data: 'order_span_from',
        width: '150'
      }, {
        name: 'supplier_order_span_to',
        data: 'order_span_to',
        width: '150'
      }, {
        name: 'etd',
        data: 'etd.item',
        type: 'date',
        width: '150'
      }, {
        name: 'eta',
        data: 'eta.item',
        type: 'date',
        width: '150'
      }, {
        name: 'target_plan_from',
        data: 'target_plan_from',
        width: '150'
      }, {
        name: 'target_plan_to',
        data: 'target_plan_to',
        width: '150'
      }, {
        name: 'buffer_span_from',
        data: 'buffer_span_from',
        width: '150'
      }, {
        name: 'buffer_span_to',
        data: 'buffer_span_to',
        width: '150'
      }],
      statusMRPOrderingCalendar: statusMRPOrderingCalendar,
      isShowWarningPopup: false,
      messageWarningMissOrder: 'Some orders are missing in the order cycle.',
      messageWarningOrderOutside: 'There is an order outside the order cycle.',
      messageWarning: ''
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      const newItem = { ...item }
      newItem.eta = newItem.eta.item
      newItem.etd = newItem.etd.item
      newItem.mrp_or_run = newItem.mrp_or_run.item
      this.showDialogForm(mode, newItem)
    },
    showWarning(type = 1) {
      if (type === 1) {
        this.messageWarning = this.messageWarningMissOrder
      } else if (type === 2) {
        this.messageWarning = this.messageWarningOrderOutside
      }

      this.isShowWarningPopup = true
    },
    async submitNotWarning() {
      this.isShowWarningPopup = false
      await this.$refs.formDialog.submitData(false)
    }

  }
}
</script>

<style lang="scss" scoped>
.d-flex-center {
  display: flex;
  justify-content: center;
}

.btn-list:not(:first-child) {
  margin-left: 20px !important;
}

.action-flex-start {
  justify-content: flex-start;
}

.btn-action {
  height: auto;
  width: auto;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 20px;

  &.btn-edit {
    color: #67C23A;
  }

  &.btn-delete {
    color: #F56C6C;
  }

  &.btn-preview {
    color: #409EFF;
  }

  &.btn-confirm {
    color: #67C23A;
  }
}

::v-deep .green-bg {
  background: #F0F9EB !important;
}

::v-deep .red-bg {
  background: #FEF0F0 !important;
}
</style>
