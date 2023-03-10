<template>
  <div>
    <el-col :span="20" class="input-common" style="position: relative">
      <el-upload
        ref="upload"
        style="width: 100%"
        class="upload-demo input-form"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        type="input"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-change="handleChange"
      >
        <el-button size="large" class="btn-import" type="default" :icon="form.import_file?'el-icon-document':'el-icon-paperclip'">
          {{ file_name }}
        </el-button>
      </el-upload>
      <el-button v-if="form.import_file" type="default" style="position: absolute; right: 20px; top: 10px; z-index: 99; padding: 2px; border: none" icon="el-icon-close" size="mini" circle @click="beforeRemoveFile" />
    </el-col>
  </div>
</template>
<script>

export default {
  name: 'SelectData',
  props: ['form', 'disabled'],
  data() {
    return {
      file_name: this.$t('click_choose_file')
    }
  },
  methods: {
    handleChange(e) {
      this.form.import_file = e.raw // only use files[0]
      this.file_name = e.name
      if (!this.form.import_file) return
      // this.upload(rawFile)
    },
    beforeUpload(file) {
      if (this.disabled) {
        this.$message.error('Please download this error data before taking any other action')
        this.removeFile()
      } else {
        if (!this.isExcel(file)) {
          this.$message.error('File format is invalid. Require excel file.')
          this.removeFile()
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 1`)
    },
    beforeRemoveFile() {
      if (this.disabled) {
        this.$message.error('Please download this error data before taking any other action')
      } else {
        this.removeFile()
      }
    },
    removeFile() {
      this.file_name = this.$t('click_choose_file')
      this.form.import_file = null
      this.$refs.upload.clearFiles()
      if (!this.disabled) {
        this.$emit('clear-errors')
      }
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped >
.file_name_screen_import
{
  display: inline-block;
  width: 80%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.btn-import {
  width: 100%;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
