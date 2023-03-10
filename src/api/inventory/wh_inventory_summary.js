import request from '@/utils/request'

export function excelWH(query) {
  return request({
    url: '/warehouse-inventory-summaries/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function excelPart(query) {
  return request({
    url: '/warehouse-inventory-summaries/parts/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/warehouse-inventory-summaries/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/warehouse-inventory-summaries/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/warehouse-inventory-summaries',
    method: 'get',
    params: query
  })
}

export function parts(query) {
  return request({
    url: '/warehouse-inventory-summaries/parts',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/warehouse-inventory-summaries/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/warehouse-inventory-summaries',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/warehouse-inventory-summaries/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/warehouse-inventory-summaries/' + id,
    method: 'delete'
  })
}
