<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          remote
          reserve-keyword
          filterable
          :placeholder="$t('msc_code')"
          style="width: 100%"
          :remote-method="remoteMSC"
          @visible-change="remoteMSC('')"
        >
          <el-option
            v-for="item in options.codes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input
          v-model="params.car_line"
          clearable
          :placeholder="$t('car_line')"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input
          v-model="params.model_grade"
          clearable
          :placeholder="$t('model_grade_name')"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-input
          v-model="params.body"
          :placeholder="$t('body_description')"
          clearable
        />
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
          :remote-method="remotePlant"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options'],
  methods: {
    remoteMSC(query) {
      this.options.codes = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'codes', params: { keyword: query, column: 'code' }})
      }, 100)
    },
    remoteCarLine(query) {
      this.options.car_lines = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'car_lines', params: { column: 'car_line', keyword: query }})
      }, 100)
    },
    remoteModelGrade(query) {
      this.options.model_grades = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'model_grades', params: { column: 'model_grade', keyword: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    }
  }
}
</script>
