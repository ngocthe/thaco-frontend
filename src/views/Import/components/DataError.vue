<template>
  <div>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="errors"
      :remarks="false"
      :is-preview="false"
      :is-edit="false"
      :is-delete="false"
    />
  </div>
</template>
<script>

import TableFixedThead from '@/components/Table/TableFixedThead'
export default {
  name: 'DataError',
  components: { TableFixedThead },
  // eslint-disable-next-line vue/require-prop-types
  props: ['errors'],
  data() {
    return {
      params: {
        page: 1,
        per_page: 99999
      },
      columns: [{
        name: 'line',
        data: 'line',
        width: '150'
      }, {
        name: 'field_name',
        data: 'attribute',
        width: '150'
      }, {
        name: 'data',
        data: 'value',
        width: '150'
      }, {
        name: 'message',
        data: 'errors',
        width: '150'
      }
      ]
    }
  }
}
</script>

<style scoped >
.btn-import {
  height: 40px;
}
::v-deep .el-table .cell {
  word-break: break-word;
}
</style>
