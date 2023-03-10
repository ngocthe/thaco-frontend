import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/bwh-inventory-logs',
    method: 'get',
    params: query
  })
}

export function parts(query) {
  return request({
    url: '/bwh-inventory-logs/parts',
    method: 'get',
    params: query
  })
}

export function cases(query) {
  return request({
    url: '/bwh-inventory-logs/cases',
    method: 'get',
    params: query
  })
}

export function partColors(query) {
  return request({
    url: '/bwh-inventory-logs/part-colors',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/bwh-inventory-logs/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/bwh-inventory-logs/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/bwh-inventory-logs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/bwh-inventory-logs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/bwh-inventory-logs',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/bwh-inventory-logs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id, params) {
  return request({
    url: '/bwh-inventory-logs/' + id,
    params: params,
    method: 'delete'
  })
}
