import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/logical-inventory-part-adjustments',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/logical-inventory-part-adjustments/codes',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/logical-inventory-part-adjustments/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/logical-inventory-part-adjustments/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/logical-inventory-part-adjustments/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/logical-inventory-part-adjustments',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/logical-inventory-part-adjustments/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/logical-inventory-part-adjustments/' + id,
    method: 'delete'
  })
}
