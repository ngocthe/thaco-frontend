// import parseTime, formatTime and set to filter
import i18n from '@/i18n'
import { __arrayStatusMRPOrderingCalendar, __arrayStatusOrder } from '@/utils/constant'
import { convertStringToIntOrNull, isEmpty } from '@/utils/filter'
import { isString } from '@/utils/validate'

export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  if (num != null) {
    return num
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return null
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * convert status to text by locale
 * @param {Number} statusID
 */
export function getStatusMRPOrderingCalendar(statusID) {
  statusID = convertStringToIntOrNull(statusID)
  if (__arrayStatusMRPOrderingCalendar.includes(statusID)) {
    return i18n.t(`mrp_ordering_calendar_status.${statusID}`)
  } else {
    return ''
  }
}

/**
 *
 * @param {Number} statusID
 * @return {string}
 */
export function translateStatusOrder(statusID) {
  statusID = convertStringToIntOrNull(statusID)
  if (__arrayStatusOrder.includes(statusID)) {
    return i18n.t(`mrp_order_list.${statusID}`)
  } else {
    return ''
  }
}

/**
 *
 * @param {Number} statusID
 * @return {string}
 */
export function translateStatusDelivering(statusID) {
  statusID = convertStringToIntOrNull(statusID)
  if (__arrayStatusOrder.includes(statusID)) {
    return i18n.t(`mrp_order_delivering.${statusID}`)
  } else {
    return ''
  }
}

/**
 *
 * @param fileName
 * @return {string|*}
 */
export function translateInputFileOrder(fileName) {
  if (isEmpty(fileName)) {
    return i18n.t('manual_order')
  } else {
    if (isString(fileName)) {
      return fileName
    } else {
      const originalFileName = fileName?.original_file_name ?? ''
      return originalFileName
    }
  }
}

/**
 *
 * @param strTime
 * @param { 'd/m/y' | 'd/m/y h:i:s' | 'y-m-d' | 'y-m-d h:i:s' | 'd/m/y' } format
 * @return {string}
 */
export function formatDateTime(strTime, format = 'd/m/y') {
  if (!strTime) {
    return ''
  }
  const d = new Date(strTime)
  const month = d.getMonth() + 1
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const second = d.getSeconds()
  let result = null
  if (format === 'd/m/y' || format === 'd/m/y h:i:s') {
    result = (date < 10 ? ('0' + date) : date) + '/' +
      (month < 10 ? ('0' + month) : month) + '/' +
      d.getFullYear()
    if (format === 'd/m/y h:i:s') {
      result += ' ' + (hours < 10 ? ('0' + hours) : hours) + ':' +
        (minutes < 10 ? ('0' + minutes) : minutes) + ':' +
        (second < 10 ? ('0' + second) : second)
    }
  } else if (format === 'y-m-d') {
    result = d.getFullYear() + '-' +
      (month < 10 ? ('0' + month) : month) + '-' +
      (date < 10 ? ('0' + date) : date)
  } else if (format === 'd/m/y') {
    result = (date < 10 ? ('0' + date) : date) + '/' + (month < 10 ? ('0' + month) : month) + '/' + d.getFullYear()
  } else {
    result = d.getFullYear() + '/' +
      (month < 10 ? ('0' + month) : month) + '/' +
      (date < 10 ? ('0' + date) : date)
    if (format === 'y-m-d h:i:s') {
      result += ' ' + (hours < 10 ? ('0' + hours) : hours) + ':' +
        (minutes < 10 ? ('0' + minutes) : minutes) + ':' +
        (second < 10 ? ('0' + second) : second)
    }
  }

  return result
}

/**
 *
 * @param {number} processMrp
 * @return {string|string}
 */
export function formatProgress(processMrp) {
  return processMrp === 100 ? 'Done' : `${processMrp}%`
}

export function getFileImport(fileImport) {
  if (fileImport) {
    return fileImport.original_file_name ?? ''
  } else {
    return ''
  }
}

export function getUserCodeProfile(user) {
  return user?.code ?? ''
}

export function getUserNameProfile(user) {
  return user?.username ?? ''
}
