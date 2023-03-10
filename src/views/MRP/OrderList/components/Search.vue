<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">

      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.contract_code"
          class="el-form-item mb-0"
          clearable
          filterable
          :placeholder="$t('contract_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteContracts"
          @visible-change="remoteContracts('')"
        >
          <el-option
            v-for="item in options.contract_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_group_by_contract"
          class="el-form-item mb-0"
          clearable
          filterable
          :placeholder="$t('part_group')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePartGroups"
          @visible-change="remotePartGroups('')"
        >
          <el-option
            v-for="item in options.part_group_by_contract"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.supplier_code"
          class="el-form-item mb-0"
          filterable
          clearable
          :placeholder="$t('procurement_supplier_code')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteProcurementSuppliers"
          @visible-change="remoteProcurementSuppliers('')"
        >
          <el-option
            v-for="item in options.supplier_code"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>

      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.plant_code"
          filterable
          clearable
          :loading="loading_search"
          :placeholder="$t('plant_code')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remotePlants"
          @visible-change="remotePlants('')"
        >
          <el-option
            v-for="item in options.plant_code"
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
    </el-row>

    <el-row :gutter="20">
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.status"
          clearable
          no-match-text="No data"
          :placeholder="$t('order_status')"
          style="width: 100%"
        >
          <el-option
            v-for="item in statusOrder"
            :key="item + ''"
            :label="item | translateStatusOrder"
            :value="item + ''"
          />
        </el-select>
      </el-col>

      <el-col :span="5" class="input-common">
        <el-date-picker
          v-model="params.eta"
          type="date"
          :placeholder="$t('eta')"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          format="dd/MM/yyyy"
        />
      </el-col>
      <el-col :span="5" class="input-common">
        <el-select
          v-model="params.part_code"
          clearable
          filterable
          :placeholder="$t('part_no')"
          style="width: 100%"
          remote
          reserve-keyword
          :remote-method="remoteParts"
          @visible-change="remoteParts('')"
        >
          <el-option
            v-for="item in options.part_code"
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
          remote
          reserve-keyword
          :remote-method="remotePartColors"
          @visible-change="remotePartColors('')"
        >
          <el-option
            v-for="item in options.part_color_code"
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
import { uniqBy } from '@/utils/filter'
import { statusFileImport, statusOrder } from '@/utils/constant'

export default {
  name: 'Search',
  components: { ButtonSearch },
  // eslint-disable-next-line vue/require-prop-types
  props: ['params', 'options', 'loading_search', 'default_selected_search'],
  data() {
    return {
      query_file_name: '',
      statusOrder: [statusOrder.WAIT, statusOrder.DONE]
    }
  },
  methods: {
    remoteContracts(query) {
      this.options.contract_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'contract_code', params: { column: 'contract_code', keyword: query }})
      }, 100)
    },
    remoteETA(query) {
      this.options.eta = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'eta', params: { column: 'eta', keyword: query }})
      }, 100)
    },
    remoteProcurementSuppliers(query) {
      this.options.supplier_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'supplier_code', params: { code: query }})
      }, 100)
    },
    remoteParts(query) {
      this.options.part_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_code', params: { code: query }})
      }, 100)
    },
    remotePartColors(query) {
      this.options.part_color_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_color_code', params: { code: query }})
      }, 100)
    },
    remotePartGroups(query) {
      this.options.part_group_by_contract = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'part_group_by_contract', params: { column: 'part_group', keyword: query, contract_code: this.params.contract_code }})
      }, 100)
    },
    remotePlants(query) {
      this.options.plant_code = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'plant_code', params: { code: query }})
      }, 100)
    },
    remoteInputFileName(query) {
      this.query_file_name = query
      this.options.input_file_name = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'input_file_name', params: { original_file_name: query, mrp_or_status: statusFileImport.CAN_RUN_ORDER }})
      }, 100)
    },

    getValueIdInputFile(item) {
      return item?.id ?? '0'
    },

    uniqBy(arr) {
      return uniqBy(arr)
    },

    __getOptionFile() {
      const manualText = this.$t('manual_order')
      if (manualText.includes(this.query_file_name) && this.options.input_file_name) {
        return [...[{ id: '-1', original_file_name: this.$t('manual_order') }], ...this.options.input_file_name]
      } else {
        return this.options.input_file_name
      }
    }
  }
}
</script>

<style scoped>

</style>
