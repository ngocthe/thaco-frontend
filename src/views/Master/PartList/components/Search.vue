<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
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
          v-model="params.name"
          clearable
          filterable
          :placeholder="$t('part_name')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePartName"
          @visible-change="remotePartName('')"
        >
          <el-option
            v-for="item in options.partNames"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.group"
          clearable
          filterable
          :placeholder="$t('part_group')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remotePartGroup"
          @visible-change="remotePartGroup('')"
        >
          <el-option
            v-for="item in options.partGroups"
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
          filterable
          :placeholder="$t('plant_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
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
        <el-select
          v-model="params.ecn_in"
          clearable
          filterable
          :placeholder="$t('ecn_no_in')"
          style="width: 100%"
          :loading="loading_search"
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
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.ecn_out"
          clearable
          filterable
          :placeholder="$t('ecn_no_out')"
          style="width: 100%"
          :loading="loading_search"
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
    remotePartName(query) {
      this.options.partNames = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partNames', params: { column: 'name', keyword: query }})
      }, 100)
    },
    remotePartGroup(query) {
      this.options.partGroups = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'partGroups', params: { code: query }})
      }, 100)
    },
    remotePlant(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remotePart(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'parts', params: { code: query }})
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
