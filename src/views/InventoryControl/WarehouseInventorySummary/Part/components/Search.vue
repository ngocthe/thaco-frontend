<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          remote
          reserve-keyword
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :remote-method="remotePart"
          @visible-change="remotePart('')"
        >
          <el-option
            v-for="item in options.parts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_color_code"
          clearable
          filterable
          remote
          reserve-keyword
          :placeholder="$t('part_color_code')"
          style="width: 100%"
          :remote-method="remotePartColor"
          @visible-change="remotePartColor('')"
        >
          <el-option
            v-for="item in options.partColors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('plant_code')"
          style="width: 100%"
          class="input-clearable-none"
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
      <el-col :span="4" class="input-common">
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
  props: ['params', 'options'],
  methods: {
    remotePart(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remotePartColor(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partColors', params: { code: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }, is_create_option_by_typing: false })
      }, 100)
    }
  }
}
</script>

<style>
.el-table--medium th, .el-table--medium td {
    padding: 8px 0;
}
.el-date-editor.el-input {
  width: 100%;
}
.btn-div{
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}
@media(max-width: 425px) {
  .input-common {
    width: 100%;
  }
  .col-search {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
