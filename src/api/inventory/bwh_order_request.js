import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/bwh-order-requests',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/bwh-order-requests/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/bwh-order-requests/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/bwh-order-requests/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/bwh-order-requests/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/bwh-order-requests',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/bwh-order-requests/' + id,
    method: 'put',
    data
  })
}

export function confirm(id, data) {
  return request({
    url: '/bwh-order-requests/' + id + '/confirm',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/bwh-order-requests/' + id,
    method: 'delete'
  })
}
