<template>
  <div class="app-container">
    <search
      :params="params"
      :options="options"
      :loading_search="loading_search"
      @handle-search="params.page=1;getData(1)"
      @handle-reset="reset"
      @handle-change-search="getOpSearch($event, true)"
    />
    <el-row type="flex" class="row-bg mb20" justify="end">
      <!-- <button-print @handlePrint="printData" /> -->
      <!-- <button-download @handleDownload="exportData" /> -->
      <button-import v-show="showCreateOrImport" :type="'user'" />
      <button-add v-show="showCreateOrImport" @handleAdd="showDialogForm('create')" />
    </el-row>
    <table-fixed-thead
      :columns="columns"
      :params="params"
      :table-data="tableData"
      :is-preview="showPreview"
      :modelable-type="modelable_type"
      :is-edit="showEdit"
      :is-delete="showDelete"
      @handle-edit="showDialogFormCustom('edit',$event)"
      @handle-preview="showDialogFormCustom('preview',$event)"
      @handle-delete="openDelete($event)"
    />
    <DialogForm
      :options="options"
      :is-edit="showEdit"
      :show-dialog.sync="showDialog"
      :title="title"
      :preview.sync="preview"
      :editing.sync="editing"
      :form="form"
      @created="params.page=1;getData(false)"
      @updated="getData(false)"
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
// import ButtonDownload from '@/components/Button/Download'
// import ButtonPrint from '@/components/Button/Print'
import TableFixedThead from '@/components/Table/TableFixedThead'
import ButtonAdd from '@/components/Button/Add'
import { index, codes, destroy, excel } from '@/api/master/admin'
import { indexRole as getRoles } from '@/api/master/admin'

import indexMixin from '@/mixins/crud/index'
import ButtonImport from '@/components/Button/Import'
import DialogForm from './components/DialogForm'

export default {
  name: 'UserList',
  mixins: [
    indexMixin(index, {
      users: {
        func: codes,
        params: {}
      },
      roles: {
        func: getRoles,
        params: {}
      }
    }, destroy, excel)],
  // eslint-disable-next-line vue/order-in-components
  // components: { DialogForm, ButtonImport, ButtonAdd, TableFixedThead, ButtonPrint, ButtonDownload, Search, Pagination },
  components: { DialogForm, ButtonImport, ButtonAdd, TableFixedThead, Search, Pagination },
  data() {
    return {
      modelable_type: 'user',
      model: 'admin',
      title: this.$t('user_list'),
      listQuery:
        {
          code: '',
          company: '',
          page: 1,
          per_page: 20
        },
      form: {
        code: null,
        name: null,
        company: null,
        role: [],
        password: null,
        created_at: null,
        updated_at: null,
        remark: null,
        password_default: false,
        user: {}
      },
      columns: [{
        name: 'user_code',
        data: 'code'
      }, {
        name: 'user_name',
        data: 'name'
      }, {
        name: 'company',
        data: 'company'
      }, {
        name: 'role_name',
        data: 'roles',
        value: 'code',
        type: 'array'
      },
      {
        name: 'password',
        data: 'password',
        type: 'password'
      }
      ]
    }
  },
  methods: {
    showDialogFormCustom(mode, item) {
      if (this.$store.state.user.roles.filter(e => e.code === 'admin').length === 0) {
        this.options.roles = this.$store.state.user.roles
      }
      item.password_default === 1 ? item.password_default = true : item.password_default = false
      this.showDialogForm(mode, item)
      var contrl = []
      item.roles.forEach(child => {
        contrl.push(child.code)
      })
      this.form.role = contrl
    }
  }
}
</script>
