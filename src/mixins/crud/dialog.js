const dialogMixin = (store, update) => ({
  props: ['form', 'editing', 'preview', 'confirm', 'showDialog', 'options', 'title', 'loading_search', 'isEdit'],
  data() {
    return {
      dialog: true,
      errors: {},
      errorDefaults: {},
      loading: false,
      formLabelWidth: '375px',
      formPopupWidth: '885px'
    }
  },
  computed: {
    header() {
      if (this.confirm && this.editing) {
        return this.$t('confirm')
      } else {
        return (this.preview ? this.$t('preview') : ((this.editing ? this.$t('edit') : this.$t('add'))))
      }
    }
  },
  methods: {
    showEdit() {
      this.$emit('update:editing', true)
      this.$emit('update:preview', false)
      this.errors = {}
    },
    closeDialog() {
      this.$emit('update:preview', false)
      this.$emit('update:showDialog', false)
      if (this.preview === false) {
        this.$refs.form_parent.$refs.form.resetFields()
        this.errors = {}
        this.$refs.form_parent.$refs.form.clearValidate()
      }
      const textarea = document.querySelector('.input-form textarea')
      if (textarea) {
        textarea.style.height = 'auto'
      }
    },
    closePreview() {
      setTimeout(() => {
        this.$emit('update:preview', false)
      }, 500)
      this.$emit('update:showDialog', false)
      if (this.preview === false) {
        this.$refs.form_parent.$refs.form.resetFields()
      }
    },
    async submitData(hasWarning = false) {
      this.loading = true
      let valid = true
      try {
        await this.$refs.form_parent.$refs.form.validate()

        if (!this.valid) {
          valid = false
          this.errors = { ... this.errorDefaults }
          this.loading = false
        }
      } catch (e) {
        valid = true
        this.loading = false
      }
      if (!valid) {
        this.loading = true
        if (this.editing) {
          try {
            if (hasWarning) {
              const success = await this.__checkWarningBeforeSubmit()
              this.loading = false
              if (!success) {
                return
              }
            }
            await update(this.$refs.form_parent.form.id, this.$refs.form_parent.form)
            this.reload()
          } catch (error) {
            this.loading = false
            if (error.data) {
              this.errorFields(error.data)
            } else {
              if (error.message === this.$t('object_not_found')) {
                this.error(this.$t('data_not_found'))
              } else if (error.message === this.$t('duplicate_keys') && !error.errors) {
                error.errors = { box_type_code: { code: '10096', message: 'The box type code has already been taken.' }}
                this.errorFields(error.errors)
              } else {
                this.error(error.message)
              }
            }
          }
        } else {
          try {
            if (hasWarning) {
              this.loading = false
              const success = await this.__checkWarningBeforeSubmit()
              if (!success) {
                return
              }
            }
            this.loading = true
            await store(this.$refs.form_parent.form)
            this.reload()
          } catch (error) {
            this.loading = false
            if (error.data) {
              this.errorFields(error.data)
            } else {
              this.error(error.message)
            }
          }
        }
      }
    },
    errorFields(data) {
      for (const [key, value] of Object.entries(data)) {
        var columnArray = key.split('.')
        this.errors[columnArray[0]] = value.message
      }
    },
    error(err) {
      this.$message({
        message: err,
        type: 'error'
      })
    },
    querySearchAsync(queryString, cb, opts) {
      var results = queryString ? opts.filter(this.createFilter(queryString)) : opts
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    reload() {
      this.$message({
        message: this.editing ? this.$t('edit_success') : this.$t('created_success'),
        type: 'success'
      })
      this.closeDialog()
      this.$emit(this.editing ? 'updated' : 'created')
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    async __checkWarningBeforeSubmit() {}
  }
})

export default dialogMixin
