<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePart"
          @visible-change="remotePart('')"
        >
          <el-option
            v-for="item in options.parts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          filterable
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePartColor"
          @visible-change="remotePartColor('')"
        >
          <el-option
            v-for="item in options.partColors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.interior_code"
          clearable
          filterable
          :placeholder="$t('inter_color_condition')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteVehicleColorInt"
          @visible-change="remoteVehicleColorInt('')"
        >
          <el-option
            v-for="item in options.vehicleColorsInt"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.vehicle_color_code"
          clearable
          filterable
          :placeholder="$t('exterior_color_condition')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteVehicleColorExt"
          @visible-change="remoteVehicleColorExt('')"
        >
          <el-option
            v-for="item in options.vehicleColorsExt"
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
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
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
          v-model="params.ecn_in"
          clearable
          filterable
          :placeholder="$t('ecn_no_in')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteEcn"
          @visible-change="remoteEcn('')"
        >
          <el-option
            v-for="item in options.ecns"
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
          filterable
          :placeholder="$t('ecn_no_out')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteEcn"
          @visible-change="remoteEcn('')"
        >
          <el-option
            v-for="item in options.ecns"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
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
  // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
  props: ['params', 'options', 'loading_search'],
  methods: {
    remotePart(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remotePartColor(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partColors', params: { code: query }})
      }, 100)
    },
    remoteVehicleColorInt(query) {
      this.options.vehicleColorsInt = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'vehicleColorsInt', params: { code: query, vehicle_type: 'INT' }})
      }, 100)
    },
    remoteVehicleColorExt(query) {
      this.options.vehicleColorsExt = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'vehicleColorsExt', params: { code: query, vehicle_type: 'EXT' }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteEcn(query) {
      this.options.ecns = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'ecns', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
