<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          remote
          reserve-keyword
          clearable
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :remote-method="remotePlant"
          @visible-change="remotePlant('')"
        >
          <el-option
            v-for="item in options.plants"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          remote
          reserve-keyword
          clearable
          filterable
          :placeholder="$t('warehouses_code')"
          style="width: 100%"
          :remote-method="remoteWarehouse"
          @visible-change="remoteWarehouse('')"
        >
          <el-option
            v-for="item in options.warehouses"
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
  props: ['params', 'options', 'isCreate'],
  methods: {
    remoteWarehouse(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'warehouses', params: { code: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style>
.el-table--medium th, .el-table--medium td {
  padding: 8px 0;
}
</style>
