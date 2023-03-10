<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">

      <!--      MSC Code -->
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.msc_code"
          clearable
          filterable
          :placeholder="$t('msc_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteMSCs"
          @visible-change="remoteMSCs('')"
        >
          <el-option
            v-for="item in options.mscs"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <!--   Part Exterior Color Code   -->
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.vehicle_color_code"
          clearable
          filterable
          :placeholder="$t('exterior_color_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteExteriorColorCodes"
          @visible-change="remoteExteriorColorCodes('')"
        >
          <el-option
            v-for="item in options.vehicle_color_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <!--Plant Code-->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          clearable
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :loading="loading_search"
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
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plant_code', params: { code: query }})
      }, 100)
    },
    remoteMSCs(query) {
      this.options.mscs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'mscs', params: { keyword: query, column: 'msc_code' }})
      }, 100)
    },
    remoteExteriorColorCodes(query) {
      this.options.vehicle_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'vehicle_color_code', params: { code: query, vehicle_type: 'EXT' }})
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

.btn-div {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}

@media (max-width: 425px) {
  .input-common {
    width: 100%;
  }

  .col-search {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
