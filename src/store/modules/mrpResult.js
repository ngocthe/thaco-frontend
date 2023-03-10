import { mutationTypesMrpResult } from '@/store/mutationTypes'
import { getStatusRunningProductionPlan, statusRunningProductionPlan } from '@/utils/constant'
const state = {
  is_running_mrp: false,
  progress_mrp: 0,
  original_file_name: '',
  file_id_notification: false
}

const mutations = {
  /**
   *
   * @param state
   * @param {boolean} status
   */
  [mutationTypesMrpResult.NAME.RUN_MRP](state, status) {
    state.is_running_mrp = status
  },

  /**
   *
   * @param state
   * @param {{mrp_or_progress: number, mrp_or_result, mrp_or_status: number, original_file_name: string}} progressResult
   */
  [mutationTypesMrpResult.NAME.SET_PROGRESS_MRP](state, progressResult) {
    if (progressResult) {
      state.progress_mrp = progressResult.mrp_or_progress
      state.original_file_name = progressResult.original_file_name
      state.is_running_mrp = getStatusRunningProductionPlan(progressResult) === statusRunningProductionPlan.RUNNING_MRP
    }
  },

  /**
   *
   * @param state
   * @param {number} fileId
   * store the file id what is notified inside current page
   */
  [mutationTypesMrpResult.NAME.SET_FILE_ID_NOTIFICATION](state, fileId) {
    state.file_id_notification = fileId
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

