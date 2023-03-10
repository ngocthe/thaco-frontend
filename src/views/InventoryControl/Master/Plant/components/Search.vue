<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          filterable
          remote
          reserve-keyword
          :remote-method="remotePlants"
          :placeholder="$t('plant_code')"
          style="width: 100%"
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
  props: ['params', 'options', 'isCreate'],
  methods: {
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table--medium th, .el-table--medium td {
    padding: 8px 0;
}
</style>
