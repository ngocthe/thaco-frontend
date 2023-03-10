<template>
  <el-dialog :width="formPopupWidth" :before-close="closeDialog" :close-on-click-modal="false" :title="header" :visible.sync="showDialog" class="form-submit" :destroy-on-close="true">
    <CreateOrEdit
      v-if="!preview && showDialog"
      ref="form_parent"
      v-loading="loading"
      :errors.sync="errors"
      :editing="editing"
      :pass-form-data="form"
      :form-label-width="formLabelWidth"
      :options="options"
      :loading_search="loading_search"
      :is-open-form="showDialog"
      @handle-change-option="$emit('handle-change-search',$event)"
    />
    <Preview
      v-else
      v-loading="loading"
      :form="form"
      :form-label-width="formLabelWidth"
    />
    <template #footer>
      <Action
        :loading="loading"
        :hidden-btn-edit="!isEdit"
        :preview="preview"
        :editing="editing"
        @handle-close="closeDialog"
        @handle-close-preview="closePreview"
        @handle-show-edit="showEdit"
        @handle-submit-data="submitData(true)"
      />
    </template>
  </el-dialog>
</template>
<script>
import { create, update } from '@/api/mrp/mrp_ordering_calendar'

import dialogMixin from '@/mixins/crud/dialog'
import Preview from './Preview'
import Action from '@/components/Dialog/Action'
import CreateOrEdit from './CreateOrEdit'
import { entityByCode as getPartGroupEntityByCode } from '@/api/master/part_group'
import { addDays, formatDate, getWeekMonthYearFromDate } from '@/utils/datetime'

export default {
  components: { CreateOrEdit, Action, Preview },
  mixins: [dialogMixin(create, update)],
  data() {
    return {
      errorDefaults: {
        buffer_span_from: null,
        buffer_span_to: null,
        contract_code: null,
        eta: null,
        etd: null,
        id: null,
        mrp_or_run: null,
        order_span_from: null,
        order_span_to: null,
        part_group: null,
        status: null,
        target_plan_from: null,
        target_plan_to: null,
        remark: null
      },
      year: '2022',
      month: '8',
      customForm: {}
    }
  },
  methods: {

    async __checkWarningBeforeSubmit() {
      try {
        const part_group = this.$refs.form_parent.form.part_group
        const partGroup = await getPartGroupEntityByCode(part_group)

        if (partGroup.data) {
          let { lead_time, ordering_cycle } = partGroup.data
          lead_time = Number(lead_time)
          ordering_cycle = Number(ordering_cycle)

          const { mrp_or_run, target_plan_from, target_plan_to } = this.$refs.form_parent.form
          if (target_plan_from && target_plan_to) {
            const weekCurrentMrpRunDetail = getWeekMonthYearFromDate(mrp_or_run)
            if (weekCurrentMrpRunDetail) {
              const startOrderCycleDate = new Date(weekCurrentMrpRunDetail.startDateOnWeek)
              const endOrderCycleDate = new Date(weekCurrentMrpRunDetail.startDateOnWeek)

              addDays(startOrderCycleDate, (lead_time + 1) * 7)
              addDays(endOrderCycleDate, (lead_time + Number(ordering_cycle)) * 7)

              if (formatDate(target_plan_from) !== formatDate(startOrderCycleDate) || formatDate(target_plan_to) !== formatDate(endOrderCycleDate)) {
                const targetPlanFromByTime = (new Date(target_plan_from)).getTime()
                const targetPlanToByTime = (new Date(target_plan_to)).getTime()
                const startOrderCycleDateByTime = (new Date(startOrderCycleDate)).getTime()
                const endOrderCycleDateByTime = (new Date(endOrderCycleDate)).getTime()

                if (formatDate(target_plan_from) !== formatDate(startOrderCycleDate) &&
                  ((targetPlanFromByTime > startOrderCycleDateByTime))) {
                  this.$emit('display-warning', 1)
                  return false
                }

                if (formatDate(target_plan_from) !== formatDate(startOrderCycleDate) &&
                  ((targetPlanToByTime < endOrderCycleDateByTime))) {
                  this.$emit('display-warning', 1)
                  return false
                }

                if (formatDate(target_plan_to) !== formatDate(endOrderCycleDate) && (targetPlanToByTime < endOrderCycleDateByTime)) {
                  this.$emit('display-warning', 1)
                  return false
                }

                if (formatDate(target_plan_to) !== formatDate(endOrderCycleDate) && (targetPlanToByTime > endOrderCycleDateByTime)) {
                  this.$emit('display-warning', 2)
                  return false
                }
              }

              return true
            }
          } else {
            return true
          }
        }
      } catch (e) {
        return true
      }

      return true
    },
    async submitNotWarning() {
      await this.submitData(false)
    }
  }
}
</script>
