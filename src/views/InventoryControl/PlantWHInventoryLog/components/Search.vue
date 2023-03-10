<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :loading="loading_search"
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
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_color_code"
          clearable
          filterable
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :loading="loading_search"
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
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.warehouse_code"
          clearable
          filterable
          :placeholder="$t('warehouse_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteWarehouses"
          @visible-change="remoteWarehouses('')"
        >
          <el-option
            v-for="item in options.warehouses"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="5" class="input-common">
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
      <el-col :span="5" class="input-common">
        <el-date-picker
          v-model="params.received_date"
          type="date"
          format="dd/MM/yyyy"
          :placeholder="$t('date_received_at_assembly_plant')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <el-col :span="5" class="input-common">
        <el-date-picker
          v-model="params.updated_at"
          type="date"
          format="dd/MM/yyyy"
          :placeholder="$t('updated_date_time')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <!-- defect_id -->
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.defect_id"
          :placeholder="$t('defect_status')"
          class="input-form"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in searchDefectsTwoCase"
            :key="item.code"
            :label="item.name"
            :value="item.code"
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
  props: ['params', 'options', 'loading_search', 'defects', 'search-defects'],
  data() {
    return {
      searchDefectsTwoCase: [
        { code: 0, name: 'OK' },
        { code: 1, name: 'Has Defect' }
      ]
    }
  },
  methods: {
    remoteWarehouses(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'warehouses', params: { code: query, warehouse_type: 3 }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
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
    }
  }
}
</script>

<style scoped>

</style>
