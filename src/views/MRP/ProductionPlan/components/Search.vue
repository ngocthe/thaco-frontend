<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.msc_code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteMSC"
          :placeholder="$t('msc_code')"
          style="width: 100%"
          @visible-change="remoteMSC('')"
        >
          <el-option
            v-for="item in options.mscs"
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
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteExteriors"
          :placeholder="$t('exterior_color_code')"
          style="width: 100%"
          @visible-change="remoteExteriors('')"
        >
          <el-option
            v-for="item in options.exteriors"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteMSC(query) {
      this.options.mscs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'mscs', params: { column: 'msc_code', keyword: query }})
      }, 100)
    },
    remoteExteriors(query) {
      this.options.exteriors = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'exteriors', params: { column: 'vehicle_color_code', keyword: query }})
      }, 100)
    }
  }
}
</script>
