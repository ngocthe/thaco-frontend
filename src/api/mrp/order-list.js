import request from '@/utils/request'
import { formatDateTime } from '@/filters'

export function index(query) {
  return request({
    url: '/order-list',
    method: 'get',
    params: query
  })
}

export function delivering(query) {
  return request({
    url: '/order-list/delivering',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/order-list',
    method: 'post',
    data
  })
}

export function system_run(data) {
  return request({
    url: '/order-list/system-run',
    method: 'post',
    data: { ...data, ...{ mrp_run_date: formatDateTime(new Date(), 'y-m-d') }}
  })
}

export function update(id, data) {
  return request({
    url: '/order-list/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/order-list/' + id,
    method: 'delete'
  })
}

export function excel(query) {
  return request({
    url: '/order-list/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/order-list/columns',
    method: 'get',
    params: query
  })
}

export function release(data) {
  return request({
    url: '/order-list/release',
    method: 'put',
    data
  })
}

export function excelDelivering(query) {
  return request({
    url: '/order-list/export-delivering',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function checkShortagePart(data) {
  return request({
    url: '/order-list/check-shortage-part',
    method: 'post',
    data: { ...data, ...{ mrp_run_date: formatDateTime(new Date(), 'y-m-d') }}
  })
}
