<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.warehouse_code"
          clearable
          filterable
          :placeholder="$t('warehouse_code')"
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteWarehouses"
          @visible-change="remoteWarehouses('')"
        >
          <el-option
            v-for="item in options.warehouse_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteParts"
          @visible-change="remoteParts('')"
        >
          <el-option
            v-for="item in options.part_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.plant_code"
          clearable
          filterable
          :placeholder="$t('plant_code')"
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePlants"
          @visible-change="remotePlants('')"
        >
          <el-option
            v-for="item in options.plant_code"
            :key="item"
            :label="item"
            :value="item"
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
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteWarehouses(query) {
      this.options.warehouse_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'warehouse_code', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.part_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_code', params: { code: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plant_code', params: { code: query }})
      }, 100)
    }
  }
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
