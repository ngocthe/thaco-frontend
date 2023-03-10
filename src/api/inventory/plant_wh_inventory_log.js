import request from '@/utils/request'

export function excel(query) {
  return request({
    url: '/plant-inventory-logs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function updateDefect(id, data) {
  return request({
    url: '/plant-inventory-logs/' + id + '/defects',
    method: 'put',
    data
  })
}

export function columns(query) {
  return request({
    url: '/plant-inventory-logs/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/plant-inventory-logs/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/plant-inventory-logs',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/plant-inventory-logs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/plant-inventory-logs',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/plant-inventory-logs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id, params) {
  return request({
    url: '/plant-inventory-logs/' + id,
    method: 'delete',
    params: params
  })
}
