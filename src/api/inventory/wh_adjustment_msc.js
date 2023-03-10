import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/logical-inventory-msc-adjustments',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/logical-inventory-msc-adjustments/codes',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/logical-inventory-msc-adjustments/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/logical-inventory-msc-adjustments/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/logical-inventory-msc-adjustments/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/logical-inventory-msc-adjustments',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/logical-inventory-msc-adjustments/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/logical-inventory-msc-adjustments/' + id,
    method: 'delete'
  })
}
