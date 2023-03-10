<template>
  <div :class="{'hidden':hidden}" class="pagination-container d-xs-block">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      layout="total, sizes"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div class="right-pagination d-xs-block">
      <el-pagination
        class="d-xs-block"
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="prev, pager, next, jumper"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <span id="page-text">Page</span>
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    isPageText: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 40px 5px 2px 5px;
  margin-top: 0 !important;
  display: flex;
  justify-content: space-between;

}
.pagination-container.hidden {
  display: none;
}

#page-text {
  font-size: 14px;
  padding: 0;
  display: inline-block;
  min-width: 35.5px;
  height: 100%;
  line-height: 28px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  vertical-align: center;
  color: #606266;
}

.right-pagination {
  display: flex;
  justify-content: start;
}

::v-deep .right-pagination .el-pagination__editor.el-input .el-input__inner {
  line-height: 28px;
}

@media only screen and (max-width: 768px) {
  .d-xs-block {
    display: block;
  }
}
</style>
