import request from '@/utils/request'

export function excel(query) {
  return request({
    url: '/order-point-controls/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/order-point-controls/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/order-point-controls/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/order-point-controls',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/order-point-controls/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/order-point-controls',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/order-point-controls/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/order-point-controls/' + id,
    method: 'delete'
  })
}
