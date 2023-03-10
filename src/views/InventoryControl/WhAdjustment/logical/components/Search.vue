<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.warehouse_code"
          clearable
          filterable
          :placeholder="$t('msc_code_code')"
          style="width: 100%"
        >
          <el-option
            v-for="item in options.warehouses"
            :key="item.id"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
        >
          <el-option
            v-for="item in options.parts"
            :key="item.id"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col class="col-search" :span="2">
        <ButtonSearch @handleSearch="$emit('handle-search')" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ButtonSearch from '@/components/Button/Search'
export default {
  components: {
    ButtonSearch
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'isCreate']
}
</script>

<style>
.el-table--medium th, .el-table--medium td {
    padding: 8px 0;
}
.el-date-editor.el-input {
  width: 100%;
}
.btn-div{
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}
@media(max-width: 425px) {
  .input-common {
    width: 100%;
  }
  .col-search {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
