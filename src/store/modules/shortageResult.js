import { mutationTypesShortageResult } from '@/store/mutationTypes'
import { getStatusRunningProductionPlan, statusRunningProductionPlan } from '@/utils/constant'
const state = {
  is_running_shortage: false,
  progress_shortage: 0,
  original_file_name: '',
  file_id_notification: false
}

const mutations = {
  /**
   *
   * @param state
   * @param {boolean} status
   */
  [mutationTypesShortageResult.NAME.RUN_SHORTAGE](state, status) {
    state.is_running_shortage = status
  },

  /**
   *
   * @param state
   * @param {{mrp_or_progress: number, mrp_or_result, mrp_or_status: number, original_file_name: string}} progressResult
   */
  [mutationTypesShortageResult.NAME.SET_PROGRESS_SHORTAGE](state, progressResult) {
    if (progressResult) {
      state.progress_shortage = progressResult.mrp_or_progress
      state.original_file_name = progressResult.original_file_name
      state.is_running_shortage = getStatusRunningProductionPlan(progressResult) === statusRunningProductionPlan.RUNNING_SHORTAGE
    }
  },

  /**
   *
   * @param state
   * @param {number} fileId
   * store the file id what is notified inside current page
   */
  [mutationTypesShortageResult.NAME.SET_FILE_ID_NOTIFICATION](state, fileId) {
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

