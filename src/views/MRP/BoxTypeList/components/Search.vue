<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_no"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
        >
          <el-option
            v-for="item in options.parts"
            :key="item.id"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.box_type_code"
          clearable
          filterable
          :placeholder="$t('box_type_code')"
          style="width: 100%"
        >
          <el-option
            v-for="item in options.box_type_codes"
            :key="item.id"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          clearable
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
        >
          <el-option
            v-for="item in options.plants"
            :key="item.id"
            :label="item.code"
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
  props: ['params', 'options']
}
</script>
