<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.msc_code"
          clearable
          filterable
          :placeholder="$t('msc_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteMSC"
          @visible-change="remoteMSC('')"
        >
          <el-option
            v-for="item in options.msc_code"
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
          :placeholder="$t('exterior_color_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteExteriorColorCode"
          @visible-change="remoteExteriorColorCode('')"
        >
          <el-option
            v-for="item in options.vehicle_color_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

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
            v-for="item in options.part_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_color_code"
          clearable
          filterable
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePartColorCode"
          @visible-change="remotePartColorCode('')"
        >
          <el-option
            v-for="item in options.part_color_code"
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
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePlantCode"
          @visible-change="remotePlantCode('')"
        >
          <el-option
            v-for="item in options.plant_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.time_span"
          class="w-100"
          type="month"
          :placeholder="$t('time_span')"
          :format="'MM/yyyy'"
          :value-format="'MM-yyyy'"
        />
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search', 'import_id'],
  methods: {
    handlePrint() {
    },
    remoteMSC(query) {
      this.options.msc_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'msc_code', params: { column: 'msc_code', keyword: query, import_id: this.import_id }})
      }, 100)
    },
    remoteExteriorColorCode(query) {
      this.options.vehicle_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'vehicle_color_code', params: { column: 'vehicle_color_code', keyword: query, import_id: this.import_id }})
      }, 100)
    },
    remotePart(query) {
      this.options.part_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_code', params: { column: 'part_code', keyword: query, import_id: this.import_id }})
      }, 100)
    },
    remotePartColorCode(query) {
      this.options.part_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_color_code', params: { column: 'part_color_code', keyword: query, import_id: this.import_id }})
      }, 100)
    },
    remotePlantCode(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plant_code', params: { column: 'plant_code', keyword: query, import_id: this.import_id }, is_create_option_by_typing: false })
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
