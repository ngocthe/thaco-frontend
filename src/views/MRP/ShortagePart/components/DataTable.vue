<template>
  <div class="wrap-table">
    <table v-if="tableData.length==0" class="mrp-shortage-part">
      <thead>
        <tr>
          <td colspan="2" align="center" class="fixed first">{{ $t('planned_production_date') }}</td>
          <td v-for="index in +number_week" :key="index" align="center" :colspan="7" style="min-width: 130px;">
            {{ 'Week '+ index }}
          </td>
        </tr>
        <tr>
          <td class="fixed first">Part No.</td>
          <td class="fixed second">Part Color Code</td>
          <td v-for="(item, key) in dateData" :key="key" style="min-width: 130px;text-align: center">
            <div>
              <span class="day-on-calendar" style="width: 50px">
                {{ getDateDisplay(item) }}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr style="text-align: center; height: 50px;">
          <td :colspan="getColspanNodata()" style="position: fixed; left: 50%; border: none">{{ $t('no_data') }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else class="mrp-shortage-part">
      <thead>
        <tr>
          <td colspan="2" align="center" class="fixed first">{{ $t('planned_production_date') }}</td>
          <td v-for="index in tableData[0].plan_dates.length/7" :key="index" align="center" :colspan="7" style="min-width: 130px;">
            {{ 'Week '+ index }}
          </td>
        </tr>
        <tr>
          <td class="fixed first">Part No.</td>
          <td class="fixed second">Part Color Code</td>
          <td v-for="(row, key) in tableData[0].plan_dates" :key="key" style="min-width: 130px;text-align: center">
            <div>
              <span class="day-on-calendar">
                {{ formatDateTime(row.plan_date, 'd/m/y') }}
              </span>
            </div>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in tableData" :key="index" class="el-table__row">
          <td class="fixed first">{{ item.part_code }}</td>
          <td class="fixed second">{{ item.part_color_code }}</td>
          <td
            v-for="(item_child, key) in item.plan_dates"
            :key="key"
            :style="
              item_child.day_off===1?'background: pink':
              item_child.quantity!==0?'background: white; cursor: pointer':'background: #f2f6fc; cursor: pointer'"
            :class="{ 'shortage-part':item_child.quantity, 'td-renmark':(item_child.remarks.length>0?item_child.remarks[0]:null) }"
            @dblclick="addRenmark(item_child,item)"
          >
            <div v-if="item_child.remarks.length>0" class="icon-renmark">
              <el-popover
                placement="top-center"
                width="200"
                trigger="click"
                :content="item_child.remarks[item_child.remarks.length-1].content"
              >
                <i slot="reference" class="el-icon-caret-left" />
              </el-popover>
              {{ item_child.quantity!==0? '(' + fillQuantity(item_child.quantity) + ')' : '' }}
            </div>
            <span v-else>{{ item_child.quantity!==0 ? '(' + fillQuantity(item_child.quantity) + ')' : '' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      :before-close="beforeClose"
      :title="this.$t('remark')"
      custom-class="dialog-style"
    >
      <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules">
        <div v-for="item in dataRemarks" :key="item.id" style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee">
          <h4 style="word-break: break-word;  white-space: pre-wrap; margin-top: 0; line-height: 1.5">{{ item.content }}</h4>
          <div class="d-flex" style="justify-content: space-between">
            <div>{{ item.created_at | formatDateTime('d/m/y h:i:s') }}</div>
            <div>{{ item.user.username }}</div>
          </div>
        </div>
        <el-form-item :label="$t('remark')" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" class="input-form" type="textarea" :rows="3" :placeholder="$t('remark')" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$refs.form.resetFields();$refs.form.clearValidate();showDialog = false">{{ this.$t('cancel') }}</el-button>
        <el-button :loading="loading" type="primary" @click="submitRemark()">{{ this.$t('add') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { remarks } from '@/api/mrp/shortage_part'
import datetimeConvert from '@/mixins/crud/datetimeConvert'
import { numberFormatter } from '@/filters'
import { formatDate } from '@/utils/datetime'

export default {
  mixins: [datetimeConvert()],
  props: ['number_week', 'table-data', 'year', 'month', 'data-default', 'params', 'date-data'],
  data() {
    var checkTrimValue = (rule, value, callback) => {
      if (value.trim().length > 0) {
        callback()
      } else {
        callback(new Error('The Remark field is required'))
      }
    }
    return {
      loading: false,
      labelPosition: 'top',
      showDialog: false,
      formLabelWidth: '375px',
      dataRemarks: [],
      form: {
        plan_date: null,
        part_code: null,
        part_color_code: null,
        plant_code: null,
        remark: ''
      },
      rules: {
        remark: [
          { required: true, message: 'The Remark field is required', trigger: 'blur' },
          { max: 255, message: 'The Remark must not be greater than 255 characters.', trigger: 'blur' },
          { validator: checkTrimValue, trigger: 'blur' }
        ]
      }
    }
  },
  currentId: null,
  methods: {
    beforeClose() {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.showDialog = false
    },
    getDateDisplay(dateData) {
      // if (dateData && isReplaceMinusToSlash) {
      //   dateData = dateData.replace('-', '/')
      // }

      return formatDate(dateData)
    },
    fillQuantity(value) {
      value = value > 0 ? value : -value
      return numberFormatter(value)
    },
    getColspanNodata() {
      return new Date(this.year, this.month, 0).getDate() + 1
    },
    async submitRemark() {
      try {
        await this.$refs.form.validate()
        if (this.valid) return
        this.loading = true
        await remarks(this.form)
        this.$message({
          message: this.$t('created_success'),
          type: 'success'
        })
        this.dataRemarks.push({
          content: this.form.remark.trim(),
          created_at: new Date(),
          updated_at: new Date(),
          user: { username: this.$store.state.user.username }
        })
        this.$refs['form'].resetFields()
        this.loading = false
        this.scrollRemarkToBottom()
      } catch (error) {
        error.message ? this.$message({
          message: error.message,
          type: 'error'
        }) : null
        this.loading = false
      }
    },
    addRenmark(child, item) {
      if (child.quantity !== 0) {
        this.dataRemarks = child.remarks
        this.form.import_id = this.params.import_id
        this.form.part_code = item.part_code
        this.form.part_color_code = item.part_color_code
        this.form.plan_date = child.plan_date
        this.form.plant_code = item.plant_code
        this.showDialog = true
      }
    },
    scrollRemarkToBottom() {
      var bodyRemark = document.getElementsByClassName('el-dialog__body')
      bodyRemark[0].scrollTop = bodyRemark[0].scrollHeight
    }
  }
}
</script>
<style lang="scss" scoped >
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
* {
  box-sizing: border-box !important;
}
.wrap-table {
  overflow-x:auto;
  position: relative;
  width:100%;
  margin: auto;
  overflow: auto;
}
/* Hoặc cẩn thận hơn */
*, *::before, *::after {
  box-sizing: border-box !important;
}
::v-deep .el-popover {
  word-break: break-word;
}
.mrp-shortage-part {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: 14px;
  color: #606266 !important;
}
.mrp-shortage-part thead {
  background: #f2f6fc;
}
.mrp-shortage-part thead td {
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  padding: 10px 10px;
  font-weight: bold;
  box-sizing: border-box;
}
.mrp-shortage-part tbody td {
  box-sizing: border-box;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  padding: 10px 10px;
  color: #606266;
  text-align: center;
}
.mrp-shortage-part {
  box-sizing: border-box;
  border-top: 1px solid #dfe6ec;
  border-collapse: separate;
  border-spacing: 0;
}

thead td.fixed {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2000;
  background: #f2f6fc;
  padding: 10px 10px;
  font-weight: bold;
}
tbody td.fixed {
  box-sizing: inherit;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  visibility:visible;
  background: #fff;
  color:#606266;
  z-index: 2000;
}
::v-deep .el-popover {
  z-index: 1999 !important;
}
.first {
  border-left: 1px solid #dfe6ec;
  min-width: 150px;
  text-align: center;
}
.fisrt.fixed {
  left: 0;
}
.second.fixed {
  left: 150px;
}
.second {
  min-width: 150px;
  text-align: center;
}
.end {
  min-width: 120px;
  left:350px !important;
  /*box-shadow: 0 0 10px rgb(0 0 0 / 12%)*/
}
td.shortage-part {
  color: #FF4D4F !important;
}
::v-deep .el-form-item__label {
  text-align: left !important;
  width: 850px;
}
.td-renmark {
  position: relative;
}
.icon-renmark i{
  background: transparent;
  border: none;
  position: absolute;
  top: -6px;
  right: -6px;
  padding: 0;
  font-size: 15px;
  transform: rotate(135deg);
  color: #f84d50;
}
.input-form.el-textarea {
  width: 100% !important;
}
@media(max-width: 940px) {
  ::v-deep .el-form {
    .el-form-item__label {
      float: none;
      width: 100% !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
