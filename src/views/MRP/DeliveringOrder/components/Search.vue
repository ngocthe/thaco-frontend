<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.contract_code"
          :placeholder="$t('contract_no')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteContracts"
          :loading="loading_search"
          @visible-change="remoteContracts('')"
        >
          <el-option
            v-for="item in options.contracts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.eta"
          type="date"
          :placeholder="$t('eta')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_code"
          :placeholder="$t('part_no')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :loading="loading_search"
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
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_color_code"
          :placeholder="$t('part_color_code')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePartColors"
          :loading="loading_search"
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
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.part_group"
          :placeholder="$t('part_group')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePartGroups"
          :loading="loading_search"
          @visible-change="remotePartGroups('')"
        >
          <el-option
            v-for="item in options.partGroups"
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
          v-model="params.supplier_code"
          :placeholder="$t('procurement_supplier_code')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteSuppliders"
          :loading="loading_search"
          @visible-change="remoteSuppliders('')"
        >
          <el-option
            v-for="item in options.suppliers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.plant_code"
          :placeholder="$t('plant_code')"
          clearable
          filterable
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePlants"
          :loading="loading_search"
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
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.import_id"
          clearable
          filterable
          :loading="loading_search"
          :placeholder="$t('input_file_name')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteInputFileName"
          @visible-change="remoteInputFileName('')"
        >
          <el-option
            v-for="item in __getOptionFile()"
            :key="getValueIdInputFile(item)"
            :label="item | translateInputFileOrder"
            :value="getValueIdInputFile(item)"
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
import { statusFileImport } from '@/utils/constant'

export default {
  name: 'Search',
  components: { ButtonSearch },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search'],
  data() {
    return {
      query_file_name: ''
    }
  },
  methods: {
    remotePartColors(query) {
      this.options.partColors = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partColors', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.parts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'parts', params: { code: query }})
      }, 100)
    },
    remoteContracts(query) {
      this.options.contracts = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'contracts', params: { column: 'contract_code', keyword: query }})
      }, 100)
    },
    remotePartGroups(query) {
      this.options.partGroups = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'partGroups', params: { column: 'part_group', keyword: query }})
      }, 100)
    },
    remoteSuppliders(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'suppliers', params: { code: query }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plants = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'plants', params: { code: query }})
      }, 100)
    },
    remoteInputFileName(query) {
      this.query_file_name = query
      this.options.input_file_name = []
      setTimeout(() => {
        this.$emit('handle-change-option', { model: 'input_file_name', params: { original_file_name: query, mrp_or_status: statusFileImport.CAN_RUN_ORDER }})
      }, 100)
    },
    getValueIdInputFile(item) {
      return item?.id ?? '0'
    },
    __getOptionFile() {
      const manualText = this.$t('manual_order')
      if (manualText.includes(this.query_file_name)) {
        return [...[{ id: '-1', original_file_name: this.$t('manual_order') }], ...this.options.input_file_name]
      } else {
        return this.options.input_file_name
      }
    }
  }
}
</script>
