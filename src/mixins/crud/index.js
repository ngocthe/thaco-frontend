const indexMixin = (index, options, destroy, excel) => ({
  data() {
    return {
      loading_search: false,
      editing: false,
      preview: false,
      listQuery: {},
      loading: false,
      params: {},
      title: '',
      final_params: {},
      model: '',
      total: 0,
      showCreateOrImport: false,
      showEdit: false,
      showDelete: false,
      showPreview: false,
      showDialog: false,
      showMrpSystemRun: false,
      tableData: [],
      options: {},
      defaultForm: {},
      form: {
        id: undefined
      }
    }
  },
  methods: {
    async openDelete(id) {
      try {
        const content = this.checkRouteToChangeMess()
        const res = await this.$confirm(
          content,
          {
            dangerouslyUseHTMLString: true,
            title: 'Warning',
            confirmButtonText: this.$t('confirm_yes'),
            cancelButtonText: this.$t('confirm_no'),
            type: 'warning'
          }
        )
        if (res) {
          this.$loader(true)
          await destroy(id)
          this.getData(false)
          this.$loader(false)
          this.$message({
            type: 'success',
            message: this.$t('delete_completed')
          })
        }
      } catch (error) {
        if (error !== 'cancel' && error !== 'close') {
          this.$loader(false)
          if (error.message === this.$t('object_not_found')) {
            this.$message({
              message: this.$t('data_not_found'),
              type: 'error'
            })
            this.getData(false)
          } else if (error.message === 'Item used! Can not delete!') {
            await this.getData(false)
            this.$message({
              message: this.$t('unable_to_delete'),
              type: 'error'
            })
          } else {
            this.$message({
              message: error.message,
              type: 'error'
            })
          }
        }
      }
    },
    checkRouteToChangeMess() {
      let content = this.$t('confirm_delete')
      if (this.$route.name === 'UPKWHInventoryLog' || this.$route.name === 'BWHInventoryLog' || this.$route.name === 'PlantWHInventoryLog') {
        content = 'Are you sure to delete this row?<br>Delete Inventory Log does not change quantity of WH Summary, please update by using WH Adjustment.'
      }
      return content
    },
    async exportData() {
      this.$loader(true)
      try {
        const data = await excel({ ...this.final_params, type: 'xls' }, 'blob')
        const url = URL.createObjectURL(
          new Blob([data], {
            type:
              'application/vnd.ms-excel'
          })
        )

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${this.exportFileName || this.title || 'export'}_${this.getDateTimeNow()}.xlsx`)
        document.body.appendChild(link)
        link.click()
        this.$loader(false)
      } catch (error) {
        this.$loader(false)
        this.$message({
          message: error.message,
          type: 'error'
        })
      }
    },
    async printData() {
      this.$loader(true)
      try {
        const data = await excel({ ...this.final_params, type: 'pdf' }, 'blob')
        const url = URL.createObjectURL(
          new Blob([data])
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${this.exportFileName || this.title || 'export'}_${this.getDateTimeNow()}.pdf`)
        document.body.appendChild(link)
        link.click()
        this.$loader(false)
      } catch (error) {
        this.$loader(false)
        this.$message({
          message: error.message,
          type: 'error'
        })
      }
    },
    getDateTimeNow() {
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()

      today = dd + mm + yyyy
      return today
    },
    async freshData(filter) {
      this.final_params.page = filter.page
      this.final_params.per_page = filter.limit
      this.$loader(true)
      await this.getData(false)
      this.$loader(false)
    },
    showDialogForm(mode, data = null) {
      switch (mode) {
        case 'edit':
          this.editing = true
          for (const field in this.form) {
            this.form[field] = (data[field] && !(typeof data[field])) ? data[field].toString() : data[field]
          }
          break
        case 'create':
          this.form = JSON.parse(JSON.stringify(this.defaultForm))
          this.form.id = undefined
          this.editing = false
          break
        default: this.preview = true
          this.editing = false
          for (const field in this.form) {
            this.form[field] = (data[field] && !(typeof data[field])) ? data[field].toString() : data[field]
          }
      }
      this.showDialog = true
    },
    async getData(search = true) {
      this.$loader(true)
      try {
        if (search) {
          this.final_params = { ...this.params }
        }
        this.final_params.page = this.params.page
        const res = await index(this.final_params)
        const { pagination, warehouse_codes } = res
        this.tableData = await this.__filterResponseData(res)
        this.total = pagination.total
        if (this.warehouse_codes && warehouse_codes) {
          this.warehouse_codes = warehouse_codes
        }
        this.handleReceivedData()
        this.$router.push({ path: this.$route.path, query: { ...this.final_params }})
      } catch (error) {
        console.log(error)
      } finally {
        this.$loader(false)
      }
    },
    /**
     *
     * @param {{model: *, params: *, type: *}}e
     * @param {boolean}hasTextTyping
     * @param {Promise} funcGetOption
     * @return {Promise<void>}
     */
    async getOpSearch(e, hasTextTyping = false, funcGetOption = null) {
      this.loading_search = true
      try {
        const res = funcGetOption ? await funcGetOption : await options[e.model].func(e.params)
        if (e.type === 'xx') {
          res.data.unshift('XX')
        }
        this.options[e.model] = res.data

        const is_create_option_by_typing = e.is_create_option_by_typing ?? hasTextTyping
        if (is_create_option_by_typing) {
          const paramValue = e.params.code || e.params.keyword || ''

          if ((paramValue + '').trim() !== '') {
            if (!this.options[e.model].includes(paramValue)) {
              this.options[e.model] = [...[paramValue], ...this.options[e.model]]
            }
          }
        }
        this.loading_search = false
      } catch (e) {
        console.log(e)
      }
    },
    async getOption() {
      this.$loader(true)
      // eslint-disable-next-line no-sequences
      Object.keys(options), Object.values(options)
      try {
        const opts = {}
        let results = await Promise.all(
          Object.values(options).map(option =>
            option.func(option.params)
          )
        )
        results = results.map(item => item.data)
        Object.keys(options).forEach((item, key) => {
          opts[item] = results[key]
        })
        this.options = { ...opts }
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
      this.params = { ...this.listQuery }
      this.getData()
    },
    getQueryParams() {
      this.params = {}
      this.params = { ...this.listQuery }
      const query = this.$route.query
      for (const key in query) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.listQuery.hasOwnProperty(key)) {
          if (query[key] instanceof Array) {
            this.params[key] = query[key].map(
              item => Number(item) || item
            )
          } else { this.params[key] = typeof this.listQuery[key] === 'string' ? query[key] : Number(query[key]) || '' }
        }
      }
      this.checkLimitRowInPage(this.params.per_page)
      this.final_params = this.params
    },
    checkLimitRowInPage(limit) {
      const perPage = [10, 20, 50, 100]
      if (!perPage.includes(limit)) {
        this.params.per_page = 20
      }
    },
    getActions() {
      const permissions = this.$store.state.user.role.permissions
      this.showCreateOrImport = !!permissions.includes(this.model + '.create')
      this.showPreview = !!permissions.includes(this.model + '.list')
      this.showEdit = !!permissions.includes(this.model + '.edit')
      this.showDelete = !!permissions.includes(this.model + '.delete')
      this.showMrpSystemRun = !!permissions.includes(this.model + '.systemRun')
    },
    handleReceivedData() {},
    async __filterResponseData(res) {
      const { data } = res
      return data
    }
  },
  async created() {
    this.defaultForm = JSON.parse(JSON.stringify(this.form))
    this.getActions()
    this.getQueryParams()
    if (options) this.getOption()
    await this.getData()
  }
})

export default indexMixin
