<template>
  <div>
    <!-- plant_code -->
    <el-select
      v-model="params.plant_code"
      class="search-field"
      :placeholder="$t('plant_code')"
      :loading="loading_search"
      filterable
      clearable
      remote
      :remote-method="remotePlants"
      @visible-change="remotePlants('')"
    >
      <el-option
        v-for="item in options.plants"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <!-- part_no -->
    <el-select
      v-model="params.part_code"
      class="search-field"
      :placeholder="$t('part_no')"
      :loading="loading_search"
      clearable
      filterable
      remote
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
    <!-- part_color_code -->
    <el-select
      v-model="params.part_color_code"
      class="search-field"
      :placeholder="$t('part_color_code')"
      :loading="loading_search"
      filterable
      clearable
      remote
      :remote-method="remotePartColors"
      @visible-change="remotePartColors('')"
    >
      <el-option
        v-for="item in options.partColors"
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
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partColors', params: { code: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style scoped></style>
