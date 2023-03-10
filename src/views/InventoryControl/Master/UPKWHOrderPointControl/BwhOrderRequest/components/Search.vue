<template>
  <div>
    <el-select
      v-model="params.case_code"
      class="search-field"
      :placeholder="$t('case_no')"
      :loading="loading_search"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="remoteCasesBwhInventoryLog"
      @visible-change="remoteCasesBwhInventoryLog('')"
    >
      <el-option
        v-for="item in options.casesBwhOrderRequest"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="params.part_code"
      class="search-field"
      :placeholder="$t('order_trigger_part_no')"
      :loading="loading_search"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="remoteParts"
      @visible-change="remoteParts('')"
    >
      <el-option
        v-for="item in options.partSearchs"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="params.part_color_code"
      class="search-field"
      :placeholder="$t('part_color_code')"
      :loading="loading_search"
      filterable
      clearable
      remote
      reserve-keyword
      :remote-method="remotePartColors"
      @visible-change="remotePartColors('')"
    >
      <el-option
        v-for="item in options.partColorSearchs"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <button-search @handleSearch="$emit('handle-search')" />
  </div>
</template>
<script>
import ButtonSearch from '@/components/Button/Search'

export default {
  name: 'Search',
  components: { ButtonSearch },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  data() {
    return {}
  },
  methods: {
    remoteParts(query) {
      this.options.partSearchs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partSearchs', params: { column: 'part_code', keyword: query }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColorSearchs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partColorSearchs', params: { column: 'part_color_code', keyword: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteCasesBwhInventoryLog(query) {
      this.options.casesBwhOrderRequest = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'casesBwhOrderRequest', params: { column: 'case_code', keyword: query }})
      }, 100)
    }
  }
}
</script>

<style scoped></style>
