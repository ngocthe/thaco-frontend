<template>
  <div>
    <el-row class="mb-20" :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.warehouse_code"
          clearable
          remote
          reserve-keyword
          filterable
          :placeholder="$t('warehouse_code')"
          style="width: 100%"
          :remote-method="remoteWH"
          @visible-change="remoteWH('')"
        >
          <el-option
            v-for="item in options.warehouses"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
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
          remote
          reserve-keyword
          filterable
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
          clearable
          remote
          reserve-keyword
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
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.updated_at"
          type="date"
          :placeholder="$t('updated_date_time')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col class="col-search" :span="4">
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
    remoteWH(query) {
      this.options.warehouses = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'warehouses', params: { code: query }})
      }, 100)
    },
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
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
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
