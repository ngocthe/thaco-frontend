<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          filterable
          allow-create
          :placeholder="$t('vehicle_color_code')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteVehicleColorSearch"
          @visible-change="remoteVehicleColorSearch('')"
        >
          <el-option
            v-for="item in options.vehicleColorsSearch"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.vehicle_type"
          clearable
          filterable
          :placeholder="$t('vehicle_color_type')"
          style="width: 100%"
        >
          <el-option
            v-for="item in ['EXT', 'INT']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.ecn_in"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteEcnIn"
          :placeholder="$t('ecn_no_in')"
          style="width: 100%"
          @visible-change="remoteEcnIn('')"
        >
          <el-option
            v-for="item in options.ecnIns"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.ecn_out"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteEcnOut"
          :placeholder="$t('ecn_no_out')"
          style="width: 100%"
          @visible-change="remoteEcnOut('')"
        >
          <el-option
            v-for="item in options.ecnOuts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remotePlant"
          :placeholder="$t('plant_code')"
          style="width: 100%"
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
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col class="col-search" :span="2">
        <button-search @handleSearch="$emit('handle-search')" />
      </el-col>
    </el-row>

  </div>
</template>
<script>
import ButtonSearch from '@/components/Button/Search'
export default {
  name: 'Search',
  components: { ButtonSearch },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteVehicleColorSearch(query) {
      this.options.vehicleColorsSearch = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'vehicleColorsSearch', params: { column: 'code', keyword: query }})
      }, 100)
    },
    remoteEcnIn(query) {
      this.options.ecnIns = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'ecnIns', params: { code: query }})
      }, 100)
    },
    remoteEcnOut(query) {
      this.options.ecnOuts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'ecnOuts', params: { code: query }})
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

<style scoped>

</style>
