<template>
  <div class="import-container">
    <router-link
      :to="'/#/import/'"
    >
      <button-back />
    </router-link>
    <p class="import-err-text">* Error types in file C</p>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
    />
  </div>
</template>
<script>
import ButtonBack from '@/components/Button/Back'
import TableFixedThead from '@/components/Table/TableFixedThead'
export default {
  name: 'ViewDetail',
  components: { TableFixedThead, ButtonBack },
  data() {
    return {
      tableData: [{
        line: '100',
        field_name: 'Contract code',
        data: 'aaaa',
        message: 'Must be integer'
      }, {
        line: '100',
        field_name: 'Contract code',
        data: 'aaaa',
        message: 'Must be integer'
      }
      ],
      columns: [{
        name: 'line',
        data: 'line',
        width: ''
      }, {
        name: 'field_name',
        data: 'field_name',
        width: ''
      }, {
        name: 'data',
        data: 'data',
        width: ''
      }, {
        name: 'message',
        data: 'message',
        width: ''
      }]
    }
  }
}
</script>

<style scoped >

.import-container {
  padding: 20px;
}

</style>
