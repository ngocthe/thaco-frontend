<template>
  <div class="app-container">
    <search
      :id="idSearch"
      ref="search"
      :params="params"
      :options="options"
      :loading_search="loading_search"
      :default_selected_search="defaultSelectedSearch"
      @handle-reset="reset"
      @handle-search="params.page=1;getData(1)"
      @handle-change-search="getOpSearch($event, true)"
    />

    <el-row type="flex" style="align-items: center; justify-content: space-between" class="row-mobile">
      <el-col :span="12" style="display: flex;">
        <el-button
          v-show="showEdit"
          :disabled="orderResult.is_running_order"
          :loading="orderResult.is_running_order"
          type="primary"
          style="width: 196px; height: 40px; margin-bottom: 20px"
          @click="showDialogOrderSystemRun"
        >
          <i class="el-icon el-icon-video-play" /> Ordering system run
        </el-button>
        <el-button v-show="showEdit" type="primary" style="width: 196px; height: 40px; margin-bottom: 20px" @click="openDialogRelease"> <i class="el-icon el-icon-files" /> Release</el-button>
      </el-col>

      <el-row type="flex" class="row-bg mb20" justify="end">
        <button-print @handlePrint="printData" />
        <button-download @handleDownload="exportData" />
        <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
      </el-row>
    </el-row>

    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :modelable-type="modelable_type"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      :has-custom-action="true"
      @refresh-data="getData()"
      @handle-edit="showDialogForm('edit',$event)"
      @handle-preview="showDialogForm('preview',$event)"
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
                v-if="scopeData.row.status == statusOrder.WAIT"
                v-show="showEdit"
                class="btn-list btn-action btn-edit"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showDialogFormCustom('edit',scopeData.row)"
              />
              <el-button
                v-show="showDelete"
                v-if="scopeData.row.status == statusOrder.WAIT"
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :params="params"
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      :loading_search="loading_search"
      @handle-change-search="params.page=1;getOpSearch($event)"
      @created="params.page=1;getData(false)"
      @updated="getData(false)"
    />
    <OrderSystemRunDialog
      :is-show.sync="isShow"
      :title="titleOrderSystemRun"
      :form-label-width="formLabelWidth"
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-change-search="getOpSearch($event, false)"
      @handleOrderSystemRun="handleOrderSystemRun($event)"
    />
    <DialogRelease
      v-if="isOpenDialogRelease"
      :options="options"
      :params="params"
      :loading_search="loading_search"
      @close="closeDialogRelease"
      @handle-change-search="params.page=1;getOpSearch($event, false)"
      @released="getData(false)"
    />

    <PopupCommon
      v-if="isShowMessagesResult"
      :title="importFileCurrent.original_file_name"
      title_submit="OK"
      @submit="isShowMessagesResult=false"
      @close="isShowMessagesResult=false"
    >

      <div class="list-message-mrp-result-wrapper">
        <li v-for="code in messagesResult" :key="code" class="el-message--warning">
          {{ $t(code) }}
        </li>
      </div>

    </PopupCommon>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import DialogForm from './components/DialogForm'
import OrderSystemRunDialog from './components/OrderSystemRunDialog'
import ButtonPrint from '@/components/Button/Print'
import ButtonAdd from '@/components/Button/Add'
import { index, destroy, excel } from '@/api/mrp/order-list'

import { columns as getOrderCalendar } from '@/api/mrp/mrp_ordering_calendar'
import { codes as getSuppliers } from '@/api/master/supplier'
import { codes as getParts } from '@/api/master/part'
import { codes as getPartColors } from '@/api/master/part_color'
import { codes as getPlants } from '@/api/master/plant'
import { imports as importFiles } from '@/api/mrp/production_plan'

import indexMixin from '@/mixins/crud/index'
import DialogRelease from '@/views/MRP/OrderList/components/DialogRelease'
import TableFixedThead from '@/components/Table/TableFixedThead'
import { mapMutations, mapState } from 'vuex'
import { mutationTypesOrderResult } from '@/store/mutationTypes'
import { convertMessageRunningMRPResult } from '@/utils/string-helper'
import PopupCommon from '@/components/Dialog/PopupCommon'
import { statusFileImport, statusOrder } from '@/utils/constant'
import { formatProgress } from '@/filters'

export default {
  name: 'OrderList',
  mixins: [
    indexMixin(index, {
      contract_code: {
        func: getOrderCalendar,
        params: {}
      },
      eta: {
        func: getOrderCalendar,
        params: {}
      },
      supplier_code: {
        func: getSuppliers,
        params: {}
      },
      part_code: {
        func: getParts,
        params: {}
      },
      part_color_code: {
        func: getPartColors,
        params: {}
      },
      part_group: {
        func: getOrderCalendar,
        params: {}
      },
      plant_code: {
        func: getPlants,
        params: {}
      },
      input_file_name: {
        func: importFiles,
        params: {}
      },
      part_group_by_contract: {
        func: getOrderCalendar,
        params: {}
      },
      contract_code_by_part_group: {
        func: getOrderCalendar,
        params: {}
      }

    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  components: { TableFixedThead, DialogRelease, Search, ButtonAdd,
    OrderSystemRunDialog, DialogForm, ButtonPrint,
    ButtonDownload, Pagination, PopupCommon },
  data() {
    return {
      model: 'orderList',
      modelable_type: 'order_list',
      exportFileName: 'order-list',
      isOpenDialogRelease: false,
      isShow: false,
      titleOrderSystemRun: this.$t('order_system_run'),
      formLabelWidth: '375px',
      listQuery:
      {
        status: '',
        contract_code: '',
        eta: '',
        part_code: '',
        part_color_code: '',
        part_group: '',
        quantity: '',
        import_id: '',
        plant_code: '',
        supplier_code: '',
        page: 1,
        per_page: 20
      },
      form: {
        status: null,
        contract_code: null,
        eta: null,
        part_code: null,
        part_color_code: null,
        part_group: null,
        actual_quantity: null,
        supplier_code: null,
        import_id: null,
        moq: null,
        input_file_name: null,
        mrp_quantity: null,
        plant_code: 'TMAC',
        user_code: null,
        username: null,
        created_at: null,
        updated_at: null,
        remark: null,
        user: null
      },
      columns: [{
        name: 'order_status',
        data: 'status',
        width: '150',
        filter: 'translateStatusOrder'
      }, {
        name: 'contract_no',
        data: 'contract_code',
        width: '150'
      }, {
        name: 'eta',
        data: 'eta',
        width: '150',
        type: 'date'
      }, {
        name: 'part_no',
        data: 'part_code',
        width: '150'
      }, {
        name: 'part_color_code',
        data: 'part_color_code',
        width: '150'
      }, {
        name: 'part_group',
        data: 'part_group',
        width: '150'
      }, {
        name: 'moq',
        data: 'moq',
        width: '170'
      }, {
        name: 'number_quantity_from_mrp',
        data: 'mrp_quantity',
        width: '170'
      }, {
        name: 'actual_quantity',
        data: 'actual_quantity',
        width: '150'
      }, {
        name: 'procurement_supplier_code',
        data: 'supplier_code',
        width: '150'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '150'
      }, {
        name: 'input_file_name',
        data: 'file_import',
        width: '150',
        filter: 'translateInputFileOrder'
      }],
      defaultSelectedSearch: {
        contract_code: null
      },
      statusOrder: statusOrder,
      importFileCurrent: {},
      messagesResult: [],
      isShowMessagesResult: false,
      idSearch: 1
    }
  },
  methods: {
    showDialogOrderSystemRun() {
      this.isShow = true
    },
    showDialogFormCustom(mode, item) {
      const newItem = Object.assign({}, item)
      newItem.input_file_name = item.file_import ? item.file_import.original_file_name : null
      this.showDialogForm(mode, newItem)
    },
    closeDialogRelease() {
      this.isOpenDialogRelease = false
    },
    openDialogRelease() {
      this.isOpenDialogRelease = true
    },
    async __filterResponseData(res) {
      const { data, import_file, running_file } = res

      this.importFileCurrent = import_file
      this[mutationTypesOrderResult.MAP.SET_PROGRESS_ORDER](running_file)

      if (import_file && import_file.mrp_or_result) {
        this.messagesResult = convertMessageRunningMRPResult(import_file.mrp_or_result)
        if (import_file.id !== this.orderResult.file_id_notification && import_file.mrp_or_status === statusFileImport.CAN_RUN_ORDER) {
          this.isShowMessagesResult = true
          this[mutationTypesOrderResult.MAP.SET_FILE_ID_NOTIFICATION](import_file.id)
        }
      }

      if (this.importFileCurrent) {
        this.addCurrentFileToOptionList(() => {
          this.params.import_id = this.importFileCurrent.id
        })
      }

      return data
    },
    formatProgress() {
      return formatProgress(this.orderResult.progress_order)
    },
    addCurrentFileToOptionList(callback = () => {
    }) {
      let hasFileCurrentInOptionList = false
      if (!this.options.input_file_name) {
        this.options.input_file_name = [this.importFileCurrent]
        callback()
        return 1
      }
      this.options.input_file_name.forEach(file => {
        if (file.id === this.importFileCurrent.id) {
          hasFileCurrentInOptionList = true
        }
      })

      if (!hasFileCurrentInOptionList) {
        this.options.input_file_name = [...[this.importFileCurrent], ...this.options.input_file_name]
        callback()
        return 1
      } else {
        callback()
      }
    },
    ...mapMutations([mutationTypesOrderResult.MAP.SET_PROGRESS_ORDER,
      mutationTypesOrderResult.MAP.RUN_SHORTAGE,
      mutationTypesOrderResult.MAP.SET_FILE_ID_NOTIFICATION])
  },
  computed: {
    ...mapState(['orderResult'])
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

