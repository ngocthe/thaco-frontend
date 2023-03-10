<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <!-- part_no -->
      <el-col :span="4" class="input-common min-wid">
        <el-select
          v-model="params.part_code"
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :loading="loading_search"
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
      <!-- part_color_code -->
      <el-col :span="4" class="input-common min-wid">
        <el-select
          v-model="params.part_color_code"
          filterable
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :loading="loading_search"
          clearable
          remote
          reserve-keyword
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
      </el-col>
      <!-- plant_code -->
      <el-col :span="4" class="input-common min-wid">
        <el-select
          v-model="params.plant_code"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :loading="loading_search"
          clearable
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
    remoteParts(query) {
      console.log(query)
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

<style scoped>
.min-wid{
  min-width: 135px;
}
</style>
