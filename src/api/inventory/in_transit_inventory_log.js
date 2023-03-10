import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/in-transit-inventory-logs',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/in-transit-inventory-logs/codes',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/in-transit-inventory-logs/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/in-transit-inventory-logs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/in-transit-inventory-logs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/in-transit-inventory-logs',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/in-transit-inventory-logs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/in-transit-inventory-logs/' + id,
    method: 'delete'
  })
}
