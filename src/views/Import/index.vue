<template>
  <div class="import-container">
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :span="24" style="color: #606266" class="input-common">
        <span>Select Data</span>
      </el-col>
      <el-col :md="6" :sm="6" :xs="24" class="input-common">
        <el-select v-model="form.type" clearable filterable :placeholder="$t('type_import')" no-match-text="No data">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-col>
      <el-col :md="8" :sm="6" :xs="24" class="input-common input-select-file">
        <select-data :form.sync="form" :disabled="disabled" @clear-errors="errors=[]" />
      </el-col>
      <el-col :md="10" :sm="12" :xs="24" class="input-common">

        <el-button
          class="btn-upload-common btn-import-excel green-btn "
          type="success"
          size="small"
          :disabled="disabled"
          @click="upload()"
        >
          <svg-icon icon-class="import" style="margin-right: 5px;" />
          {{ $t('import_excel') }}
        </el-button>
        <el-button
          class="btn-upload-common btn-download-sample "
          size="small"
          icon="el-icon-download"
          @click="dowloadTemplate"
        >
          {{ $t('download_sample') }}
        </el-button>
      </el-col>
    </el-row>
    <DataError v-if="errors&&errors.length>0" :errors="errors" />
    <br>
    <a
      v-if="errors && errors.length > 0 && !masters.includes(form.type) && link_error != '#' && link_error != ''"
      :href="link_error"
      :download="errorFileName"
    >
      <el-button
        class="btn-upload-common btn-import-excel btn-download-error"
        type="primary"
        style="background: #409EFF"
        size="small"
        icon="el-icon-download"
        @click="disabled=false"
      >
        {{ $t('download_error_data') }}
      </el-button>
    </a>
  </div>
</template>
<script>
import SelectData from '@/views/Import/components/SelectData'
import { attachMaster, attach, template, attachMRP } from '@/api/import/import'
import DataError from '@/views/Import/components/DataError'
export default {
  name: 'Import',
  components: { DataError, SelectData },
  data() {
    return {
      errors: [],
      disabled: false,
      errorFileName: null,
      masters: [
        'user',
        'part_group',
        'plant',
        'ecn',
        'vehicle_color',
        'msc',
        'part',
        'part_color',
        'bom',
        'supplier',
        'procurement',
        'warehouse',
        'warehouse_location',
        'box_type'
      ],
      mrp: [
        'production_plan',
        'part_usage_result',
        'mrp_ordering_calendar'
      ],
      link_error: '#',
      compares: [
        {
          key: 'part.create',
          value: 'part'
        },
        {
          key: 'partColor.create',
          value: 'part_color'
        },
        {
          key: 'bom.create',
          value: 'bom'
        },
        {
          key: 'supplier.create',
          value: 'supplier'
        },
        {
          key: 'ecn.create',
          value: 'ecn'
        },
        {
          key: 'msc.create',
          value: 'msc'
        },
        {
          key: 'boxType.create',
          value: 'box_type'
        },
        {
          key: 'procurement.create',
          value: 'procurement'
        },
        {
          key: 'vehicleColor.create',
          value: 'vehicle_color'
        },
        {
          key: 'admin.create',
          value: 'user'
        },
        {
          key: 'warehouseLocation.create',
          value: 'warehouse_location'
        },
        {
          key: 'inTransitInventoryLog.create',
          value: 'in_transit_inventory_log'
        },
        {
          key: 'bwhInventoryLog.create',
          value: 'bwh_inventory_log'
        },
        {
          key: 'vietnamSourceLog.create',
          value: 'vietnam_source_log'
        },
        {
          key: 'warehouseSummaryAdjustment.create',
          value: 'warehouse_summary_adjustment'
        },
        {
          key: 'logicalInventoryPartAdjustment.create',
          value: 'warehouse_logical_adjustment_part'
        },
        {
          key: 'logicalInventoryMscAdjustment.create',
          value: 'warehouse_logical_adjustment_msc'
        },
        {
          key: 'orderPointControl.create',
          value: 'order_point_control'
        },
        {
          key: 'mrpOrderCalendar.create',
          value: 'mrp_ordering_calendar'
        },
        {
          key: 'productionPlan.create',
          value: 'production_plan'
        },
        {
          key: 'partUsageResult.create',
          value: 'part_usage_result'
        }
      ],
      options: [{
        label: 'Master',
        options: [
          {
            value: 'part',
            label: this.$t('part')
          },
          {
            value: 'part_color',
            label: this.$t('part_color')
          }, {
            value: 'bom',
            label: this.$t('bom')
          },
          {
            value: 'supplier',
            label: this.$t('supplier')
          },
          {
            value: 'ecn',
            label: this.$t('ecn')
          },

          {
            value: 'msc',
            label: this.$t('msc')
          },
          {
            value: 'box_type',
            label: this.$t('box_type')
          },
          {
            value: 'procurement',
            label: this.$t('procurement')
          },
          {
            value: 'vehicle_color',
            label: this.$t('vehicle_color')
          },
          {
            value: 'user',
            label: this.$t('User')
          },
          {
            value: 'warehouse_location',
            label: this.$t('warehouse_location')
          }
        ]
      },
      {
        label: 'MRP',
        options: [
          {
            value: 'production_plan',
            label: this.$t('production_plan')
          },
          {
            value: 'part_usage_result',
            label: this.$t('Parts Usage Result')
          },
          {
            value: 'mrp_ordering_calendar',
            label: this.$t('mrp_ordering_calendar')
          }
        ]
      },
      {
        label: 'Inventory',
        options: [
          {
            value: 'in_transit_inventory_log',
            label: this.$t('in_transit_inventory_log')
          },
          {
            value: 'bwh_inventory_log',
            label: this.$t('bwh_inventory_log')
          }, {
            value: 'vietnam_source_log',
            label: this.$t('vietnam_source_log')
          },
          {
            value: 'warehouse_summary_adjustment',
            label: this.$t('warehouse_summary_adjustment')
          },
          {
            value: 'warehouse_logical_adjustment_msc',
            label: this.$t('warehouse_logical_adjustment_msc')
          },
          {
            value: 'warehouse_logical_adjustment_part',
            label: this.$t('warehouse_logical_adjustment_part')
          },
          {
            value: 'order_point_control',
            label: this.$t('ordering_point_control')
          }
        ]
      }],
      form: {
        type: null,
        import_file: null
      }
    }
  },
  mounted() {
    this.checkPermissions()
    this.$route.query.type ? this.form.type = this.$route.query.type : null
  },
  methods: {
    checkPermissions() {
      const controler = this
      var pers = []
      this.compares.forEach((e) => {
        if (controler.$store.state.user.roles[0].permissions.includes(e.key)) {
          pers.push(e.value)
        }
      })
      this.options.forEach(e => {
        var el = e.options.filter(child => {
          return pers.includes(child.value)
        })
        e.options = el
      })
    },
    async upload() {
      this.errors = []
      if (!this.form.type) {
        this.$message.error(this.$t('type_required'))
      } else if (!this.form.import_file) {
        this.$message.error(this.$t('file_required'))
      } else {
        try {
          this.$loader(true)
          const formData = new FormData()
          formData.append('import_file', this.form.import_file)
          formData.append('type', this.form.type)
          this.masters.includes(this.form.type) ? await attachMaster(formData)
            : this.mrp.includes(this.form.type) ? await attachMRP(formData)
              : await attach(formData)
          this.$loader(false)
          this.$message({
            type: 'success',
            message: this.$t('import_completed')
          })
        } catch (e) {
          this.$loader(false);
          (this.masters.includes(this.form.type) || this.mrp.includes(this.form.type)) ? null : ((e.errors.rows[0].errors === 'The import file has missing table column' || e.errors.rows[0].errors === 'The import file has missing data.') ? null : this.disabled = true)
          this.errors = e.errors ? (e.errors.rows.length > 50 ? e.errors.rows.slice(0, 50) : e.errors.rows) : null
          this.link_error = e.errors ? (e.errors.link_download_error ? e.errors.link_download_error : '#') : '#'
          this.errorFileName = this.form.type
          if (e.message) {
            if (e.message !== 'You are not authorized to perform this action.') {
              this.$message({
                type: 'error',
                message: e.message
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: this.$t('error_import')
            })
          }
        }
      }
    },
    async dowloadTemplate() {
      if (!this.form.type) {
        this.$message.error(this.$t('type_required'))
      } else {
        this.form.type
        this.$loader(true)
        try {
          const data = await template({ type: this.form.type }, 'blob')
          const url = URL.createObjectURL(
            new Blob([data], {
              type:
                'application/vnd.ms-excel'
            })
          )
          const link = document.createElement('a')
          link.href = url
          const fileName = this.changeNameFileTemplate(this.form.type)
          link.setAttribute('download', `${fileName || 'export'}_${this.getDateTimeNow()}.xlsx`)
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
    changeNameFileTemplate(value) {
      let new_name = value
      if (value === 'warehouse_logical_adjustment_part') {
        new_name = 'warehouse-adjustment-logical-inventory-part'
      } else if (value === 'warehouse_logical_adjustment_msc') {
        new_name = 'warehouse-adjustment-logical-inventory-msc'
      } else if (value === 'part_usage_result') {
        new_name = 'production_result'
      }
      return new_name
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.disabled) {
      this.$message.error('Please download this error data before taking any other action')
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="scss" >
.btn-upload-common{
  height: 40px;
}
.import-container {
  padding: 20px;
}
.btn-download-error:hover {
  background: #0363d9 !important;
}
.btn-download-error:active {
  background: #1b75e4 !important;
}
@media(max-width: 992px) {
  .input-select-file {
    ::v-deep .input-common {
      width: 100%;
    }
  }
}
@media(max-width: 768px) {
  .input-select-file {
    padding-left: 0 !important;
  }
}

</style>
