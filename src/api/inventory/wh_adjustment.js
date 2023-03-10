
import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/warehouse-summary-adjustments',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/warehouse-summary-adjustments/codes',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/warehouse-summary-adjustments/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/warehouse-summary-adjustments/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/warehouse-summary-adjustments/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/warehouse-summary-adjustments',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/warehouse-summary-adjustments/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/warehouse-summary-adjustments/' + id,
    method: 'delete'
  })
}
