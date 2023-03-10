import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/upkwh-inventory-logs',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/upkwh-inventory-logs/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/upkwh-inventory-logs/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/upkwh-inventory-logs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/upkwh-inventory-logs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/upkwh-inventory-logs',
    method: 'post',
    data
  })
}

export function updateDefect(id, data) {
  return request({
    url: '/upkwh-inventory-logs/' + id + '/defects',
    method: 'put',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/upkwh-inventory-logs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id, params) {
  return request({
    url: '/upkwh-inventory-logs/' + id,
    method: 'delete',
    params: params
  })
}
