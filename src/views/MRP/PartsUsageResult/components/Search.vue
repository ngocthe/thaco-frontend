<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.used_date"
          type="date"
          :placeholder="$t('parts_used_date')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          remote
          reserve-keyword
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :remote-method="remoteParts"
          @visible-change="remoteParts('')"
        >
          <el-option
            v-for="item in options.partSearchs"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_color_code"
          remote
          reserve-keyword
          clearable
          filterable
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :remote-method="remotePartColors"
          @visible-change="remotePartColors('')"
        >
          <el-option
            v-for="item in options.partColorSearchs"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          remote
          reserve-keyword
          clearable
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :remote-method="remotePlants"
          @visible-change="remotePlants('')"
        >
          <el-option
            v-for="item in options.plantSearchs"
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
  props: ['params', 'options'],
  methods: {
    remoteParts(query) {
      this.options.partSearchs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partSearchs', params: { column: 'part_code', keyword: query }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.partColorSearchs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partColorSearchs', params: { column: 'part_color_code', keyword: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plantSearchs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plantSearchs', params: { column: 'plant_code', keyword: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
