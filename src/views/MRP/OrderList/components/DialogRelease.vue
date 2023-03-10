<template>
  <el-dialog
    :width="formPopupWidth"
    :before-close="emitClose"
    :close-on-click-modal="false"
    title="Release Preview"
    :visible.sync="dialogTableVisible"
    class="form-submit"
  >
    <el-form ref="form" class="preview" :rules="rules" :model="form">
      <el-row>
        <el-col :span="12" style="padding-right: 20px;">
          <el-form-item
            class="form-item-release contract-code-item"
            style="margin-bottom: 20px !important;"
            :label="$t('contract_code')"
            prop="contract_code"
            :error="errors.contract_code"
          >
            <el-select
              v-model="form.contract_code"
              class="el-form-item mb-0"
              :placeholder="$t('contract_no')"
              :loading="loading_search"
              remote
              clearable
              filterable
              reserve-keyword
              :remote-method="remoteContracts"
              @visible-change="remoteContracts('')"
              @change="resetFilter()"
            >
              <el-option
                v-for="item in options.contract_code"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            class="form-item-release supplier-code-item"
            :label="$t('procurement_supplier_code')"
            prop="supplier_code"
            :error="errors.supplier_code"
          >
            <el-select
              v-model="form.supplier_code"
              clearable
              filterable
              :placeholder="$t('procurement_supplier_code')"
              :loading="loading_search"
              remote
              reserve-keyword
              :remote-method="remoteProcurementSuppliers"
              @visible-change="remoteProcurementSuppliers('')"
              @change="resetFilter()"
            >
              <el-option
                v-for="item in options.supplier_code"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

        </el-col>

        <el-col :span="12" style="padding-left: 20px;">
          <el-form-item
            class="form-item-release part-group-item"
            :label="$t('part_group')"
            prop="part_group"
            :error="errors.part_group"
          >
            <el-select
              v-model="form.part_group"
              class="el-form-item mb-0"
              :loading="loading_search"
              clearable
              filterable
              :placeholder="$t('part_group')"
              remote
              reserve-keyword
              :remote-method="remotePartGroups"
              @visible-change="remotePartGroups('')"
              @change="resetFilter()"
            >
              <el-option
                v-for="item in options.part_group"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="form-item-release eta-item" :label="$t('eta')">
            <el-input
              :value="eta | formatDateTime"
              :disabled="true"
              :placeholder="$t('eta')"
              class="input-form"
            />
          </el-form-item>

        </el-col>
      </el-row>

      <hr style="color: #D9D9D9; border: solid 1px; margin-top: 20px;">

      <el-table
        ref="table"
        :key="idTable"
        v-loading="loadingTable"
        :data="tableData"
        style="width: 100%; margin-top: 20px;"
        border
        empty-text="There was no information found."
        @row-dblclick="rowDBClick"
      >

        <el-table-column
          prop="contract_code"
          :label="$t('contract_no')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="part_code"
          :label="$t('part_no')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="part_color_code"
          :label="$t('part_color_code')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="part_group"
          :label="$t('part_group')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="moq"
          :label="$t('moq')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="mrp_quantity"
          :label="$t('number_quantity_from_mrp')"
          label-class-name="label-customize"
          width="280"
        />

        <el-table-column
          prop="actual_quantity"
          :label="$t('actual_quantity')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="supplier_code"
          :label="$t('procurement_supplier_code')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          prop="plant_code"
          :label="$t('plant_code')"
          label-class-name="label-customize"
          width="180"
        />

        <el-table-column
          :label="$t('input_file_name')"
          label-class-name="label-customize"
          width="285"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.file_import | translateInputFileOrder }} </span>
          </template>
        </el-table-column>

        <InfiniteLoading
          slot="append"
          ref="infiniteLoading"
          :on-infinite="infiniteHandlerBottom"
          direction="bottom"
          spinner="waveDots"
          :distance="1"
        />
      </el-table>
    </el-form>

    <div slot="footer">
      <el-button :disabled="loadingRelease" @click="emitClose">{{ $t('cancel') }}</el-button>
      <el-button :disabled="loadingRelease" type="primary" @click="release">{{ $t('release') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>

import InfiniteLoading from 'vue-infinite-loading'
import { release, index as getOrderList } from '@/api/mrp/order-list'
import { statusMRPOrderingCalendar, statusOrder } from '@/utils/constant'
import { fillAttributeToMessage } from '@/utils/validate'
import i18n from '@/i18n'

export default {
  components: { InfiniteLoading },
  props: ['params', 'options', 'loading_search'],
  data() {
    return {
      loadingRelease: false,
      dialogTableVisible: true,
      errorDefaults: {
        part_group: '',
        supplier_code: '',
        contract_code: ''
      },
      page: 0,
      tableData: [],
      form: {
        part_group: '',
        eta: '',
        supplier_code: '',
        contract_code: ''
      },
      errors: {
        part_group: '',
        supplier_code: '',
        contract_code: ''
      },
      rules: {
        contract_code: [
          { required: true, message: fillAttributeToMessage(i18n.t('contract_code'), 10080), trigger: 'change' }
        ],
        supplier_code: [
          { required: true, message: fillAttributeToMessage(i18n.t('supplier_code'), 10080), trigger: 'change' }
        ]
      },
      dialog: true,
      loading: false,
      formPopupWidth: '70vw',
      idTable: 1,
      eta: '',
      loadingTable: false
    }
  },
  created() {
    this.form = { ...this.params, ...{ eta: '' }}
  },
  methods: {
    emitClose() {
      this.$emit('close')
      this.$emit('released')
    },
    async infiniteHandlerBottom($state) {
      this.loadingTable = true
      await new Promise((resolve) => {
        setTimeout(() => { resolve() }, 500)
      })

      try {
        const dataResponse = await getOrderList({ ...this.form, ...{
          page: this.page + 1,
          status: statusOrder.WAIT,
          is_popup_release: true,
          per_page: 20
        }})

        this.tableData = [...this.tableData, ...dataResponse.data]

        this.__setETA()

        this.loadingTable = false

        this.page = dataResponse.pagination.current_page
        if (dataResponse.pagination.current_page >= dataResponse.pagination.total_page) {
          $state.complete()
        } else {
          $state.loaded()
        }
      } catch (e) {
        $state.complete()
        this.loadingTable = false
      }
    },
    __setETA() {
      this.eta = ''
      if (this.form.contract_code && this.form.part_group) {
        if (this.tableData.length) {
          this.eta = this.tableData[0].eta
        }
      }
    },
    async release() {
      this.loadingRelease = true
      this.errors = { ...this.errorDefaults }
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          await release(this.form)
          this.$message.success(this.$t('edit_success'))
          this.emitClose()
        }
      } catch (e) {
        if (e.data) {
          for (const [key, value] of Object.entries(e.data)) {
            const columnArray = key.split('.')
            this.errors[columnArray[0]] = value.message
          }
        } else if (e.code === 'NotFoundException') {
          this.$message.closeAll()
          this.$message.error(this.$t('data_not_found'))
        }
      } finally {
        this.loadingRelease = false
      }
    },
    async resetFilter() {
      this.page = 0
      this.tableData = []
      this.idTable = this.idTable + 1
      this.$refs.infiniteLoading.stateChanger.reset()
    },
    remotePartGroups(query) {
      this.options.part_group = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_group', params: { column: 'part_group', keyword: query, contract_code: this.form.contract_code, status: statusMRPOrderingCalendar.WAIT }})
      }, 100)
    },
    remoteProcurementSuppliers(query) {
      this.options.supplier_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'supplier_code', params: { code: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plant_code', params: { code: query }})
      }, 100)
    },
    remoteContracts(query) {
      this.options.contract_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'contract_code', params: { column: 'contract_code', keyword: query, part_group: this.form.part_group, status: statusMRPOrderingCalendar.WAIT }})
      }, 100)
    },
    async rowDBClick(e) {
      this.form.contract_code = e.contract_code
      this.form.supplier_code = e.supplier_code
      await this.resetFilter()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body-wrapper {
  overflow: auto;
  //max-height: calc(100vh - 680px);
}

::v-deep .label-customize {
  background: #ECF5FF !important;
}

::v-deep .el-dialog {
  height: 80vh;
}
::v-deep .el-form-item {
  width: 100% !important;
  display: flex;
}
::v-deep .el-input {
  width: 100% !important;
}
::v-deep .el-form-item__label {
  width: 266px;
}
::v-deep .el-select {
  width: 100% !important;
}
::v-deep .el-dialog__body {
  height: calc(100% - 130px);
}
::v-deep .eta-item .el-form-item__label {
  width: 258px !important;
}
::v-deep .eta-item .el-form-item__content {
  width: calc(100% - 258px) !important;
}
::v-deep .part-group-item .el-form-item__content {
  width: calc(100% - 246px) !important;
}
::v-deep .contract-code-item .el-form-item__content {
  width: calc(100% - 258px) !important;
}
::v-deep .supplier-code-item .el-form-item__content {
  width: calc(100% - 258px) !important;
}
::v-deep .plant-code-item .el-form-item__content {
  width: calc(100% - 258px) !important;
}
::v-deep .el-table th > .cell {
  word-break: break-word !important;
}
.form-item-release {
  margin-bottom: 20px;
}
//::v-deep .el-table__header-wrapper {
//  width: 2005px !important;
//}
//::v-deep .el-table__header {
//  width: 2005px !important;
//}
//::v-deep .el-table__body-wrapper{
//  width: 2005px !important;
//}
//::v-deep .el-table {
//  overflow: auto !important;
//  height: calc(80vh - 400px);
//}
::v-deep .el-table--border::after {
  background-color: unset !important;
}
::v-deep .el-table::before {
  background-color: unset !important;
}
::v-deep .el-table__body-wrapper {
  height: 280px;
}
::v-deep .el-table__header  colgroup > col[width="285"] {
  width: 300px !important;
}
@media(max-width: 1400px) {
  .el-form.preview .el-row .el-col{
    width: 100%;
    padding: 0 !important;
    >.el-form-item {
      margin-bottom: 30px !important;
    }
  }
}

::v-deep .el-table__empty-block {
  display: block !important;
  height: auto !important;
}
</style>
