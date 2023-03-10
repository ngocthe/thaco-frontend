<template>
  <el-table :data="form.box_list" border style="width: 100%">
    <el-table-column prop="id" :label="$t('no')" width="50" />
    <!-- defect_status -->
    <el-table-column prop="name" :label="$t('defect_status')" width="180">
      <template slot-scope="scope">
        <el-select
          v-model="scope.row.defect_id"
          :placeholder="$t('defect_status')"
          class="input-form defect-status"
          style="width: 150px !important;"
          @change="changeDefectStatusBox(scope.row)"
        >
          <el-option
            v-for="item in defects"
            :key="item.code"
            class="defect-status-option"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
    </el-table-column>
    <!-- part_defect_quantity -->
    <el-table-column prop="name" :label="$t('part_defect_quantity')" width="100">
      <template slot-scope="scope">
        <el-input v-if="scope.row.edit" v-model="scope.row.part_defect_quantity" class="input-form" type="number" :min="1" style="width: 90% !important;" />
      </template>
    </el-table-column>
    <!-- remark -->
    <el-table-column
      prop="name"
      :label="$t('remark')"
    >
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.edit"
          v-model="scope.row.remark"
          class="input-form remark-box"
          type="textarea"
          style="width: 90% !important;"
          :rows="3"
          :placeholder="$t('remark')"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['form', 'defects'],
  created() {
    this.updateBigDefect()
  },
  methods: {
    updateBigDefect() {
      const countRemark = document.getElementsByClassName('remark-box').length
      if (countRemark > 0) {
        this.form.defect_id = 1
      } else {
        this.form.defect_id = 0
      }
    },
    changeDefectStatusBox(row) {
      if (row.defect_id === null || row.defect_id === '') {
        row.part_defect_quantity = null
        row.remark = null
        row.edit = false
      } else {
        row.edit = true
      }
      setTimeout(() => {
        this.updateBigDefect()
      }, 200)
    }
  }
}
</script>

<style scoped>
::v-deep th{
  height: 70px!important;
  background-color: #ECF5FF !important;
}
</style>
