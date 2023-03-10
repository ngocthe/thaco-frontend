<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          filterable
          :placeholder="$t('ecn_no')"
          style="width: 100%"
          :loading="loading_search"
          clearable
          remote
          reserve-keyword
          :remote-method="remoteEcn"
          @visible-change="remoteEcn('')"
        >
          <el-option
            v-for="item in options.ecns"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input v-model="params.page_number" :placeholder="$t('ecn_page_number')" style="width: 100%" />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input v-model="params.line_number" :placeholder="$t('ecn_line_number')" style="width: 100%" />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input v-model="params.released_party" :placeholder="$t('ecn_released_party')" style="width: 100%" />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.released_date"
          type="date"
          :placeholder="$t('ecn_released_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="8" class="input-common">
        <el-date-picker
          v-model="params.planned_line_off_date"
          type="date"
          :placeholder="$t('planned_inspection_line_off_effective_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="8" class="input-common">
        <el-date-picker
          v-model="params.actual_line_off_date"
          type="date"
          :placeholder="$t('actual_inspection_line_off_effective_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          clearable
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
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
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="8" class="input-common">
        <el-date-picker
          v-model="params.planned_packing_date"
          type="date"
          :placeholder="$t('planned_packing_effective_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="8" class="input-common">
        <el-date-picker
          v-model="params.actual_packing_date"
          type="date"
          :placeholder="$t('actual_packing_effective_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
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
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteEcn(query) {
      this.options.ecns = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'ecns', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
