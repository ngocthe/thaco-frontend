<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          filterable
          :placeholder="$t('part_no')"
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          style="width: 100%"
          clearable
          remote
          reserve-keyword
          :remote-method="remoteParts"
          @visible-change="remoteParts('')"
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
          v-model="params.part_color_code"
          :placeholder="$t('part_color_code')"
          filterable
          :no-match-text="$t('no_data2')"
          :loading="loading_search"
          style="width: 100%"
          clearable
          remote
          reserve-keyword
          :remote-method="remotePartColors"
          @visible-change="remotePartColors('')"
        >
          <el-option
            v-for="item in options.part_colors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="2" class="input-common">
        <button-search @handleSearch="$emit('handleSearch')" />
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
    remoteParts(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'parts', params: { column: 'part_code', keyword: query, import_id: this.params.import_id }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.part_colors = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_colors', params: { column: 'part_color_code', keyword: query, import_id: this.params.import_id }})
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .search-field .el-input__inner {
    height: 40px !important;
  }
}
</style>
