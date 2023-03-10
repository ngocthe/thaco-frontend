<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      @handle-search="params.page=1;getData(1)"
      @handle-reset="reset"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <button-print @handlePrint="$emit('handle-print')" />
      <button-download @handleDownload="$emit('handle-download')" />
      <button-add @handleAdd="$emit('handle-add')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :is-preview="showPreview"
      :is-edit="showEdit"
      :is-delete="showDelete"
      :preview-url="'/mrp/part_list/preview/'"
      :edit-url="'/mrp/part_list/edit/'"
      :delete-url="'/mrp/part_list/delete/'"
      @handle-delete="getData()"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.per_page"
      @pagination="freshData"
    />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Search from './components/Search'
import ButtonDownload from '@/components/Button/Download'
import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import { index } from '@/api/box_type_list'
import { index as getParts } from '@/api/part'
import { index as getBoxTypeCodes } from '@/api/part'
import { index as getPlants } from '@/api/part'
import indexMixin from '@/mixins/crud/index'

export default {
  name: 'BoxTypeList',
  mixins: [
    indexMixin(index, {
      parts: {
        func: getParts,
        params: {}
      },
      box_type_codes: {
        func: getBoxTypeCodes,
        params: {}
      },
      plants: {
        func: getPlants,
        params: {}
      }
    })],
  // eslint-disable-next-line vue/order-in-components
  components: { ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  data() {
    return {
      listQuery:
        {
          part_no: '',
          box_type_code: '',
          box_type_description: '',
          box_weight_gram: '',
          size_box_x_mm: '',
          size_box_y_mm: '',
          size_box_z_mm: '',
          part_quantity_in_box: '',
          unit: '',
          plant_code: '',
          company: '',
          page: 1,
          per_page: 20
        },
      columns: [{
        name: 'part_no',
        data: 'part_no',
        width: '180px'
      }, {
        name: 'box_type_code',
        data: 'box_type_code',
        width: '180px'
      }, {
        name: 'box_type_description',
        data: 'box_type_description',
        width: '180px'
      }, {
        name: 'box_weight_gram',
        data: 'box_weight_gram',
        width: '180px'
      }, {
        name: 'size_box_x_mm',
        data: 'size_box_x_mm',
        width: '180px'
      }, {
        name: 'size_box_y_mm',
        data: 'size_box_y_mm',
        width: '180px'
      }, {
        name: 'size_box_z_mm',
        data: 'size_box_z_mm',
        width: '180px'
      }, {
        name: 'part_quantity_in_box',
        data: 'part_quantity_in_box',
        width: '180px'
      }, {
        name: 'unit',
        data: 'unit',
        width: '180px'
      }, {
        name: 'plant_code',
        data: 'plant_code',
        width: '180px'
      }]
    }
  }
}
</script>
