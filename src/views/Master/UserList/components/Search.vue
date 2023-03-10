<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-input
          v-model="params.code"
          clearable
          :placeholder="$t('user_code')"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input
          v-model="params.company"
          clearable
          :placeholder="$t('company')"
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
  props: ['params', 'options', 'loading_search']
}
</script>
