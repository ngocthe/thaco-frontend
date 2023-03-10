<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="8" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          filterable
          remote
          :loading="loading_search"
          reserve-keyword
          :remote-method="remoteSupplier"
          :placeholder="$t('procurement_supplier_code')"
          style="width: 100%"
          @visible-change="remoteSupplier('')"
        >
          <el-option
            v-for="item in options.suppliers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="8" class="input-common">
        <el-input
          v-model="params.description"
          clearable
          :placeholder="$t('procurement_supplier_code_description')"
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
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteSupplier(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'suppliers', params: { code: query }})
      }, 100)
    }
  }
}
</script>
