<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remotePartGroup"
          :placeholder="$t('part_group_code')"
          style="width: 100%"
          @visible-change="remotePartGroup('')"
        >
          <el-option
            v-for="item in options.partGroups"
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
    remotePartGroup(query) {
      this.options.partGroups = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partGroups', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
