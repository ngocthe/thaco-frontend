<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.msc_code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteMSC"
          :placeholder="$t('msc_code')"
          style="width: 100%"
          @visible-change="remoteMSC('')"
        >
          <el-option
            v-for="item in options.mscs"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.shop_code"
          clearable
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remoteShopCode"
          :placeholder="$t('shop_code')"
          style="width: 100%"
          @visible-change="remoteShopCode('')"
        >
          <el-option
            v-for="item in options.shopCodes"
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
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remotePartCode"
          :placeholder="$t('part_no')"
          style="width: 100%"
          @visible-change="remotePartCode('')"
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
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remotePartColor"
          :placeholder="$t('part_color_code')"
          style="width: 100%"
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
          :loading="loading_search"
          remote
          reserve-keyword
          filterable
          :remote-method="remotePlant"
          :placeholder="$t('plant_code')"
          style="width: 100%"
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
  // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteMSC(query) {
      this.options.mscs = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'mscs', params: { code: query }})
      }, 100)
    },
    remotePartCode(query) {
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
    remoteShopCode(query) {
      this.options.shopCodes = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'shopCodes', params: { code: query }})
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

<style scoped>

</style>
