<template>
  <div>
    <el-row type="flex" class="row-bg mb20">
      <el-col :span="4">
        <el-date-picker
          v-model="params.received_date"
          :picker-options="{ disabledDate: (time) => disabledEndDate(time) }"
          class="input-form"
          type="date"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
          :placeholder="''"
          :clearable="false"
          :editable="false"
          style="width: 100%; margin-top: 20px"
          @change="$emit('handle-search')"
        />
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
      fit
      border
      highlight-current-row
      header-cell-class-name="header-table"
      size="medium"
      class="table-custom-fixed"
      :default-sort="{prop: 'no', order: 'descending'}"
    >
      <div v-if="tableData && tableData.length=='0'" slot="append" class="box-empty-custom">
        {{ $t('no_data') }}
      </div>
      <el-table-column prop="part_code" :label="$t('part_no')" align="center" min-width="150" />
      <el-table-column prop="part_color_code" :label="$t('part_color_code')" align="center" min-width="150" />
      <el-table-column prop="quantity" :label="$t('logical_inventory_quantity')" align="center" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.quantity <0" style="color: red">
            {{ '('+ fillQuantity(scope.row.quantity)+')' }}
          </span>
          <span v-else>
            {{ scope.row.quantity | numberFormatter }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory_log_file')" align="center">
        <el-table-column prop="quantity" :label="$t('total_quantity')" min-width="150">
          <template slot-scope="scope">
            {{ +scope.row.warehouses.bwh+(+scope.row.warehouses.upkwh)+(+scope.row.warehouses.plant_wh) | numberFormatter }}
          </template>
        </el-table-column>
        <el-table-column prop="warehouses.bwh" :label="$t('bwh_quantity')" min-width="150">
          <template slot-scope="scope">
            {{ (scope.row.warehouses.bwh) | numberFormatter }}
          </template>
        </el-table-column>
        <el-table-column prop="warehouses.upkwh" :label="$t('upk_wh_quantity')" min-width="150">
          <template slot-scope="scope">
            {{ (scope.row.warehouses.upkwh) | numberFormatter }}
          </template>
        </el-table-column>
        <el-table-column prop="warehouses.plant_wh" :label="$t('plant_wh_quantity')" min-width="150">
          <template slot-scope="scope">
            {{ (scope.row.warehouses.plant_wh) | numberFormatter }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('difference')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.quantity-((+scope.row.warehouses.bwh)+(+scope.row.warehouses.upkwh)+(+scope.row.warehouses.plant_wh)) <0" style="color: red">
            {{ '('+fillQuantity(scope.row.quantity-((+scope.row.warehouses.bwh)+(+scope.row.warehouses.upkwh)+(+scope.row.warehouses.plant_wh)))+')' }}
          </span>
          <span v-else>
            {{ scope.row.quantity-((+scope.row.warehouses.bwh)+(+scope.row.warehouses.upkwh)+(+scope.row.warehouses.plant_wh)) | numberFormatter }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <pagination
      v-show="total>0"
      :total.sync="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="$emit('fresh-data')"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { numberFormatter } from '@/filters'

export default {
  components: { Pagination },
  props: ['params', 'tableData', 'total'],
  data() {
    return {
    }
  },
  methods: {
    fillQuantity(value) {
      value = -value
      return numberFormatter(value)
    },
    disabledEndDate(date) {
      return date.getTime() > Date.now()
    }
  }
}
</script>

<style scoped >
  .row-filter{
    margin-top:10px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .min-wid{
    min-width: 170px;
  }
  .dis-inblock{
    display: inline-block;
  }

  .label-select{
    color: #606266;
    font-family: Noto Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
  }
  .month-year-text{
    font-family: Noto Sans SC;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #73767A;
    display: inline-block;
    margin: 0px 20px 0px 0px;
    min-width: fit-content;
  }
  .btn-print{
    width: 100% !important;
  }
  .btn-download{
    margin-left: 0px !important;
    width: 100%;
  }
  .color-white{
    color: white;
  }
  .fl-group-res{

  }
  @media (min-width: 708px) and (max-width: 1259px) {
    .dis-block{
      display: block;
    }
  }
</style>
