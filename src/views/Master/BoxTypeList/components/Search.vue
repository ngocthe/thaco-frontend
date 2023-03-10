<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
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
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :placeholder="$t('box_type_code')"
          style="width: 100%"
          :remote-method="remoteBoxTypes"
          @visible-change="remoteBoxTypes('')"
        >
          <el-option
            v-for="item in options.boxTypes"
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
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteBoxTypes(query) {
      this.options.boxTypes = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'boxTypes', params: { code: query }})
      }, 100)
    }
  }
}
</script>
