<template>
  <el-table
    :data="defectCache"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      :label="$t('no')"
      width="80"
      align="center"
    />

    <el-table-column
      prop="name"
      :label="$t('box_defect_status')"
    >
      <template slot-scope="scope">
        <el-select
          v-model="scope.row.defect_id"
          filterable
          :placeholder="$t('defect_status')"
          :no-match-text="$t('no_data2')"
          class="input-form"
        >
          <el-option
            v-for="item in defects"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
    </el-table-column>

    <InfiniteLoading
      slot="append"
      ref="infiniteLoading"
      direction="bottom"
      spinner="circle"
      :distance="1"
      @infinite="infiniteHandlerBottom"
    />
  </el-table>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: { InfiniteLoading },
  props: ['form', 'defects'],
  data() {
    return {
      defectCache: [],
      indexDefectCache: 0,
      numberBoxPerPage: 50
    }
  },
  methods: {
    async infiniteHandlerBottom($state) {
      await new Promise((resolve) => {
        setTimeout(() => { resolve() }, 500)
      })

      const tempIndexDefectCache = this.indexDefectCache
      for (let i = 0; i < this.numberBoxPerPage; i++) {
        const positionDefectProp = i + tempIndexDefectCache
        if (this.form.box_list.length <= positionDefectProp) {
          $state.complete()
        } else {
          this.defectCache.push(this.form.box_list[positionDefectProp])
          this.indexDefectCache = this.indexDefectCache + 1
          // console.log(this.indexDefectCache)
        }
      }

      if (this.defectCache.length > this.form.box_list.length) {
        $state.complete()
      } else {
        $state.loaded()
      }
    }
  }
}
</script>

<style scoped>
::v-deep th {
  height: 70px !important;
  background-color: #ECF5FF !important;
}
</style>
