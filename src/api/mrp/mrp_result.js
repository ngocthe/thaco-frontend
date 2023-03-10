import request from '@/utils/request'
import { formatDateTime } from '@/filters'

export function indexMSC(query) {
  return request({
    url: '/mrp-results/msc',
    method: 'get',
    params: query
  })
}

export function indexPart(query) {
  return request({
    url: '/mrp-results/part',
    method: 'get',
    params: query
  })
}

export function excelMSC(query) {
  return request({
    url: '/mrp-results/msc/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function excelPart(query) {
  return request({
    url: '/mrp-results/part/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/mrp-results/columns',
    method: 'get',
    params: query
  })
}

export function system_run(data) {
  return request({
    url: '/mrp-results/system-run',
    method: 'post',
    data: { ...data, ...{ mrp_run_date: formatDateTime(new Date(), 'y-m-d') }}
  })
}
