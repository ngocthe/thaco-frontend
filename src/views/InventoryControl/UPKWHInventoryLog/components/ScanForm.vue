<template>
  <el-dialog width="885px" :before-close="closeDialogScan" :close-on-click-modal="false" :title="'Print Barcode'" :visible.sync="showDialogScan" class="form-submit">
    <el-form ref="form" :model="formPrint" :rules="rules" :label-width="formLabelWidth">
      <!-- contract_code -->
      <el-form-item :label="$t('contract_no')" :label-width="formLabelWidth">
        <el-input v-model="form.contract_code" :placeholder="$t('contract_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- invoice_no -->
      <el-form-item :label="$t('invoice_no')" :label-width="formLabelWidth">
        <el-input v-model="form.invoice_code" :placeholder="$t('invoice_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- bl_no -->
      <el-form-item :label="$t('bl_no')" :label-width="formLabelWidth">
        <el-input v-model="form.bill_of_lading_code" :placeholder="$t('bl_no')" disabled clearable class="input-form" />
      </el-form-item>
      <!-- case_no -->
      <el-form-item :label="$t('case_no')" :label-width="formLabelWidth">
        <el-input v-model="form.case_code" :placeholder="$t('case_no')" disabled clearable class="input-form" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" size="large" @click="closeDialogScan">{{ $t('cancel') }}</el-button>
        <el-button
          :disabled="loading"
          size="large"
          type="primary"
          @click="printDownload()"
        >Print</el-button>
      </span>
    </template>
    <section id="printHtml" style="display: none">
      <div style="padding-top: 50px;text-align: center;">
        <VueBarcode id="barcode-content" :value="form.contract_code+' '+form.invoice_code" format="CODE39" />
      </div>
      <div style="padding-top: 100px; text-align: center;">
        <VueBarcode id="barcode-content" :value="form.bill_of_lading_code+' '+form.case_code" format="CODE39" />
      </div>
    </section>
  </el-dialog>
</template>
<script>
import VueBarcode from 'vue-barcode'
import dialogMixin from '@/mixins/crud/dialog'
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
Vue.use(VueHtmlToPaper)
export default {
  components: { VueBarcode },
  props: ['defects', 'showDialogScan'],
  mixins: [dialogMixin(null, null)],
  data() {
    return {
      formPrint: { quantity: 1 },
      rules: {
        quantity: [
          { required: true, message: 'The quantity field is required.', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDialogScan() {
      this.$emit('update:showDialogScan', false)
    },
    printDownload() {
      var options = {
        name: 'Scan Barcode',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css'
        ],
        timeout: 1000,
        autoClose: true,
        windowTitle: 'Scan Barcode'
      }
      this.$htmlToPaper('printHtml', options)
    },
    progress(val) {
      if (val === 100) { this.loading = false }
      console.log(val)
    }
  }
}
</script>
