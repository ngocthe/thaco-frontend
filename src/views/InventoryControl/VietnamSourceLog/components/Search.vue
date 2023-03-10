<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px">
      <!-- contract_no -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.contract_code"
          clearable
          filterable
          :placeholder="$t('contract_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteContracts"
          @visible-change="remoteContracts()"
        >
          <el-option
            v-for="item in options.contracts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- invoice_no -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.invoice_code"
          clearable
          filterable
          :placeholder="$t('invoice_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteInvoices"
          @visible-change="remoteInvoices()"
        >
          <el-option
            v-for="item in options.invoices"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- bl_no -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.bill_of_lading_code"
          clearable
          filterable
          :placeholder="$t('bl_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteBills"
          @visible-change="remoteBills()"
        >
          <el-option
            v-for="item in options.bills"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- container_no -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.container_code"
          clearable
          filterable
          :placeholder="$t('container_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteContainers"
          @visible-change="remoteContainers()"
        >
          <el-option
            v-for="item in options.containers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- case_no -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.case_code"
          clearable
          filterable
          :placeholder="$t('case_no')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteCases"
          @visible-change="remoteCases()"
        >
          <el-option
            v-for="item in options.cases"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- part_no -->
      <el-col :span="4" class="input-common">
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
      <!-- part_color_code -->
      <el-col :span="4" class="input-common">
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
      <!-- plant_code -->
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
      <!-- supplier_code -->
      <el-col :span="4" class="input-common">
        <el-select
          v-model="params.supplier_code"
          clearable
          filterable
          :placeholder="$t('procurement_supplier_code')"
          style="width: 100%"
          :loading="loading_search"
          remote
          reserve-keyword
          :remote-method="remoteSuppliers"
          @visible-change="remoteSuppliers('')"
        >
          <el-option
            v-for="item in options.suppliers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <!-- delivery_date -->
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.delivery_date"
          type="date"
          :value-format="'yyyy-MM-dd'"
          :format="'dd/MM/yyyy'"
          :placeholder="$t('delivery_date')"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="4" class="input-common">
        <el-date-picker
          v-model="params.updated_at"
          type="date"
          :value-format="'yyyy-MM-dd'"
          :format="'dd/MM/yyyy'"
          :placeholder="$t('updated_date_time')"
          style="width: 100%"
        />
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
  props: ['params', 'options', 'loading_search'],
  methods: {
    remoteContracts(query) {
      this.options.contracts = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'contracts', params: { column: 'contract_code', keyword: query }})
      }, 100)
    },
    remoteInvoices(query) {
      this.options.invoices = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'invoices', params: { column: 'invoice_code', keyword: query }})
      }, 100)
    },
    remoteContainers(query) {
      this.options.containers = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'containers', params: { column: 'container_code', keyword: query }})
      }, 100)
    },
    remoteBills(query) {
      this.options.bills = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'bills', params: { column: 'bill_of_lading_code', keyword: query }})
      }, 100)
    },
    remoteCases(query) {
      this.options.cases = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'cases', params: { column: 'case_code', keyword: query }})
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
    },
    remoteSuppliers(query) {
      this.options.suppliers = []
      setTimeout(() => {
        this.$emit('handle-change-search', { model: 'suppliers', params: { code: query }})
      }, 100)
    }
  }
}
</script>

<style scoped>
.input-common{
  width: 280px;
}
</style>
