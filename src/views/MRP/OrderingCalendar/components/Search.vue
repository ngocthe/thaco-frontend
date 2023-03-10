<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.contract_code"
          filterable
          :placeholder="$t('contract_no')"
          :no-match-text="$t('no_data2')"
          style="width: 100%"
          :loading="loading_search"
          clearable
          remote
          reserve-keyword
          :remote-method="remoteContracts"
          @visible-change="remoteContracts('')"
        >
          <el-option
            v-for="item in options.contract_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_group"
          filterable
          :placeholder="$t('part_group')"
          style="width: 100%"
          :loading="loading_search"
          clearable
          remote
          reserve-keyword
          :remote-method="remotePartGroups"
          @visible-change="remotePartGroups('')"
        >
          <el-option
            v-for="item in options.part_group"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.status"
          filterable
          :placeholder="$t('status')"
          :no-match-text="$t('no_data2')"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in allStatus"
            :key="item"
            :label="$t(`mrp_ordering_calendar_status.${item}`)"
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
import { __arrayStatusMRPOrderingCalendar } from '@/utils/constant'
export default {
  name: 'Search',
  components: { ButtonSearch },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  data() {
    return {
      allStatus: __arrayStatusMRPOrderingCalendar
    }
  },
  methods: {
    remotePartGroups(query) {
      this.options.part_group = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_group', params: { code: query }})
      }, 100)
    },
    remoteContracts(query) {
      this.options.contract_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'contract_code', params: { column: 'contract_code', keyword: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
