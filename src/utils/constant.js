export const role = {
  admin: 'admin',
  editor: 'editor'
}

export const aggregations = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
}

export const __arrayStatusMRPOrderingCalendar =
  [
    1, // WAIT
    2 // DONE
  ]

export const statusMRPOrderingCalendar = {
  WAIT: 1,
  DONE: 2
}

export const __arrayStatusOrder =
  [
    1, // WAIT
    2, // RELEASE
    3 // DONE
  ]

export const statusOrder = {
  WAIT: 1,
  RELEASE: 2,
  DONE: 3
}

export const statusFileImport = {
  NOT_YET_RUN: 0,
  CHECKED_SHORTAGE: 1,
  RAN_MRP: 2,
  CAN_RUN_ORDER: 3
}

export const statusRunningProductionPlan = {
  NOT_YET_RUN: 'NOT_YET_RUN',
  RUNNING_SHORTAGE: 'RUNNING_SHORTAGE',
  CHECKED_SHORTAGE: 'CHECKED_SHORTAGE',
  RUNNING_MRP: 'RUNNING_MRP',
  RAN_MRP: 'RAN_MRP',
  CAN_RUN_ORDER: 'CAN_RUN_ORDER',
  RUNNING_ORDER: 'RUNNING_ORDER'
}

/**
 *
 * @param {{mrp_or_progress: number, mrp_or_result, mrp_or_status: number, original_file_name: string}} progressResult
 */
export const getStatusRunningProductionPlan = (progressResult) => {
  switch (progressResult.mrp_or_status) {
    case statusFileImport.NOT_YET_RUN:
      if (progressResult.mrp_or_progress > 0) {
        return statusRunningProductionPlan.RUNNING_SHORTAGE
      } else {
        return statusRunningProductionPlan.NOT_YET_RUN
      }

    case statusFileImport.CHECKED_SHORTAGE:
      if (progressResult.mrp_or_progress === 100) {
        return statusRunningProductionPlan.CHECKED_SHORTAGE
      } else {
        return statusRunningProductionPlan.RUNNING_MRP
      }

    case statusFileImport.RAN_MRP:
      if (progressResult.mrp_or_progress === 100) {
        return statusRunningProductionPlan.RAN_MRP
      } else {
        return statusRunningProductionPlan.RUNNING_ORDER
      }

    case statusFileImport.CAN_RUN_ORDER:
      return statusRunningProductionPlan.CAN_RUN_ORDER
  }
}
