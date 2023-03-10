import { mutationTypesOrderResult } from '@/store/mutationTypes'
import { getStatusRunningProductionPlan, statusRunningProductionPlan } from '@/utils/constant'
const state = {
  is_running_order: false,
  progress_order: 0,
  original_file_name: '',
  file_id_notification: false
}

const mutations = {
  /**
   *
   * @param state
   * @param {boolean} status
   */
  [mutationTypesOrderResult.NAME.RUN_ORDER](state, status) {
    state.is_running_order = status
  },

  /**
   *
   * @param state
   * @param {{mrp_or_progress: number, mrp_or_result, mrp_or_status: number, original_file_name: string}} progressResult
   */
  [mutationTypesOrderResult.NAME.SET_PROGRESS_ORDER](state, progressResult) {
    if (progressResult) {
      state.progress_order = progressResult.mrp_or_progress
      state.original_file_name = progressResult.original_file_name
      state.is_running_order = getStatusRunningProductionPlan(progressResult) === statusRunningProductionPlan.RUNNING_ORDER
    }
  },

  /**
   *
   * @param state
   * @param {number} fileId
   * store the file id what is notified inside current page
   */
  [mutationTypesOrderResult.NAME.SET_FILE_ID_NOTIFICATION](state, fileId) {
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

