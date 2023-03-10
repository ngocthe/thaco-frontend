<template>
  <div>
    <el-table
      :key="key"
      :data="tableData"
      fit
      border
      highlight-current-row
      style="width: 100%"
      header-cell-class-name="header-table"
      size="medium"
      class="table-custom-fixed"
      :default-sort="{prop: 'no', order: 'descending'}"
      :cell-class-name="fillCellClass"
      :class="{'empty-table': tableData && tableData.length=='0' }"
    >
      <div v-if="tableData && tableData.length=='0'" slot="append" class="box-empty-custom">
        {{ $t('no_data') }}
      </div>
      <!-- remark -->
      <el-table-column
        v-if="remarks&&fixed"
        :label="$t('remark')"
        fixed
        width="85"
        align="center"
      >
        <template slot-scope="scope">
          <div class="d-flex-center">
            <span v-if="scope.row.remarks && scope.row.remarks.length>0" @click="showDialogRemark(scope.row)">
              <i class="icon-remark el-icon-tickets" />
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="remarks"
        :label="$t('remark')"
        width="85"
        align="center"
      >
        <template slot-scope="scope">
          <div class="d-flex-center">
            <span v-if="scope.row.remarks && scope.row.remarks.length>0" @click="showDialogRemark(scope.row)">
              <i class="icon-remark el-icon-tickets" />
            </span>
          </div>
        </template>
      </el-table-column>
      <!-- no -->
      <el-table-column
        v-if="fixed"
        align="center"
        :label="$t('no')"
        type="index"
        :index="indexMethod"
        fixed
        width="85"
      />
      <el-table-column
        v-else
        :label="$t('no')"
        align="center"
        type="index"
        :index="indexMethod"
        width="85"
      />
      <!-- v-for column -->
      <el-table-column
        v-for="column in columns"
        :key="column.name"
        :label="$t(column.name)"
        :width="fixed?column.width:''"
      >
        <template slot-scope="scope">
          <span v-if="column.type && column.type=='array'">
            <span
              v-for="item in fillData(scope.row,column.data)"
              :key="typeof(item)?item.id:item"
            >{{ column.value ? item[column.value] : item }} <br></span>
          </span>
          <span v-else-if="column.type && column.type=='date'">
            {{ fillData(scope.row, column.data) | formatDateTime }}
          </span>
          <span v-else-if="column.type && column.type=='password'">
            ***************
          </span>
          <span
            v-else-if="column.type && column.type=='defect'"
            :class="fillClassDefect(scope.row.defect_id)"
            @click="$emit('handle-defect',scope.row)"
          >
            {{ fillDefect(scope.row.defect_id) }}
          </span>
          <span
            v-else-if="column.type && column.type=='defect_2_case'"
            :class="fillClassDefect(scope.row.defect_id)"
            @click="$emit('handle-defect',scope.row)"
          >
            {{ fillDefectTwoCase(scope.row.defect_id) }}
          </span>
          <span v-else-if="column.type && column.type == 'negative'">
            {{ convertNegativeToPositive(scope.row, column.data) }}
          </span>
          <span v-else-if="column.filter">{{ fillData(scope.row, column.data, column.filter) }}</span>
          <span v-else>{{ fillData(scope.row, column.data) }}</span>
        </template>
      </el-table-column>
      <!-- button action -->
      <el-table-column
        v-if="(!hasCustomAction) && fixed && (isScan||isConfirm || isPreview || isEdit || isDelete)"
        align="center"
        fixed="right"
        :label="$t('actions')"
        :width="isScan?'150px':'120px'"
      >
        <template slot-scope="scope">
          <div class="d-flex-center">
            <el-button
              v-if="isScan"
              class="btn-list btn-action "
              type="default"
              size="mini"
              icon="el-icon-printer"
              @click="$emit('handle-scan',scope.row)"
            />
            <el-button
              v-if="isConfirm"
              class="btn-list btn-action btn-confirm"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="$emit('handle-edit',scope.row)"
            />
            <el-button
              v-if="isPreview"
              class="btn-list btn-action btn-preview"
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="$emit('handle-preview',scope.row)"
            />
            <el-button
              v-if="isEdit"
              class="btn-list btn-action btn-edit"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$emit('handle-edit',scope.row)"
            />
            <el-button
              v-if="isDelete"
              slot="reference"
              class="btn-action btn-delete btn-list"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="$emit('handle-delete',scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="(!hasCustomAction) && !fixed && (isScan||isConfirm || isPreview || isEdit || isDelete)"
        align="center"
        :label="$t('actions')"
        :width="isScan?'150px':'120px'"
      >
        <template slot-scope="scope">
          <div class="d-flex-center">
            <el-button
              v-if="isScan"
              class="btn-list btn-action "
              type="default"
              size="mini"
              icon="el-icon-printer"
              @click="$emit('handle-scan',scope.row)"
            />
            <el-button
              v-if="isConfirm"
              class="btn-list btn-action btn-confirm"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="$emit('handle-edit',scope.row)"
            />
            <el-button
              v-if="isPreview"
              class="btn-list btn-action btn-preview"
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="$emit('handle-preview',scope.row)"
            />
            <el-button
              v-if="isEdit"
              class="btn-list btn-action btn-edit"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$emit('handle-edit',scope.row)"
            />
            <el-button
              v-if="isDelete"
              slot="reference"
              class="btn-action btn-delete btn-list"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="$emit('handle-delete',scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <slot name="col_action" :scopeData="scope" />
    </el-table>
    <remark
      :is-show-remark="isShowRemark"
      :current="currentId"
      :form="form"
      :data-remarks="dataRemarks"
      :modelable-type="modelableType"
      @refresh-data="$emit('refresh-data')"
      @handle-close-remark="closeDialogRemark"
    />
  </div>
</template>

<script>
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import Remark from '../Dialog/Remark'
import * as filterFuncs from '@/filters/index'

export default {
  name: 'TableFixedThead',
  components: {
    Remark
  },
  filters: {
    filterDate: function(value) {
      if (!value) return ''
      return new Date(Date.parse(value)).toLocaleDateString('en-US')
    }
  },
  mixins: [datetimeConvert()],
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    previewUrl: {
      default: '',
      type: String
    },
    editUrl: {
      default: '',
      type: String
    },
    deleteUrl: {
      default: '',
      type: String
    },
    isScan: {
      default: false,
      type: Boolean
    },
    isConfirm: {
      default: false,
      type: Boolean
    },
    isPreview: {
      default: false,
      type: Boolean
    },
    isEdit: {
      default: false,
      type: Boolean
    },
    remarks: {
      default: true,
      type: Boolean
    },
    isDelete: {
      default: false,
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    params: {
      type: Object
    },
    // eslint-disable-next-line vue/prop-name-casing, vue/require-default-prop
    modelableType: {
      default: '',
      type: String
    },
    hasCustomAction: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      fixed: true,
      key: 1, // table key
      parentDom: null,
      isShowRemark: false,
      dataRemarks: [],
      currentId: null,
      form: {
        remark: ''
      }
    }
  },
  mounted() {
    var controller = this
    controller.sizeTable()
    window.addEventListener('resize', function() {
      controller.sizeTable()
    })
  },
  methods: {
    convertNegativeToPositive(row, data) {
      let result = row[data]
      if (row[data] < 0) {
        result = '(' + Math.abs(row[data]) + ')'
      }
      return result
    },
    fillDefect(id) {
      switch (id) {
        case 'W': return 'Wrong'
          // eslint-disable-next-line no-unreachable
          break
        case 'D': return 'Damage'
          // eslint-disable-next-line no-unreachable
          break
        case 'S': return 'Shortage'
          // eslint-disable-next-line no-unreachable
          break
        case 'X': return 'No good'
          // eslint-disable-next-line no-unreachable
          break
        default: return 'OK'
          // eslint-disable-next-line no-unreachable
          break
      }
    },
    fillDefectTwoCase(id) {
      if (id === null) {
        return 'OK'
      } else {
        return 'Has Defect'
      }
    },
    fillClassDefect(value) {
      if (value === null || value === '') return 'green defect-click'; else return 'red defect-click'
    },
    sizeTable() {
      this.parentDom = document.getElementsByClassName('table-custom-fixed')
      if (this.parentDom[0]) {
        this.tableWidth = this.parentDom[0].querySelectorAll('.el-table__header-wrapper')[0].getBoundingClientRect().width
      }
      let sumWidthColums = 170
      this.columns.forEach((el) => {
        if (el.width) {
          sumWidthColums = sumWidthColums + (+el.width.replace('px', ''))
        } else {
          // 80 is min width of column if not set width
          sumWidthColums += 80
        }
      })
      if (this.tableWidth >= sumWidthColums) {
        this.fixed = false
      } else {
        this.fixed = true
      }
    },
    fillData(row, columns, filterName = null) {
      columns = columns + ''
      var columnArray = columns.split('.')
      var result = { ...row }
      columnArray.forEach(el => {
        ((result && result[el]) || (result && result[el] === 0)) ? result = result[el] : result = null
      })

      if (filterName && filterFuncs[filterName]) {
        return filterFuncs[filterName](result)
      } else {
        return result
      }
    },
    indexMethod(index) {
      return ((+this.params.page - 1) * (+this.params.per_page) + index + 1)
    },
    showDialogRemark(data) {
      this.currentId = data.id
      this.dataRemarks = data.remarks
      this.isShowRemark = true
    },
    closeDialogRemark() {
      this.form.remark = ''
      this.isShowRemark = false
    },
    fillCellClass({ column, columnIndex, row }) {
      return column.label === 'Defect Status' ? (row.defect_id === null ? 'green-bg cell-defect-click' : 'red-bg cell-defect-click') : ''
    }
  }
}
</script>

<style lang="scss">
.cell-defect-click {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.d-flex-center {
  display: flex;
  justify-content: center;
}

.btn-list:not(:first-child) {
  margin-left: 20px !important;
}

.icon-remark {
  height: 21px;
  width: 18px;
  border-radius: 0px;
  font-size: 22px;
  cursor: pointer;
}

.red {
  color: #F56C6C;
}

.green {
  color: #67C23A;
}

.defect-click {
  cursor: pointer !important;
  width: 100%;
  display: block;
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

::v-deep .empty-table .el-table__fixed-body-wrapper {
  background: #FFFFFF;
}
</style>

