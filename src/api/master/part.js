import request from '@/utils/request'

export function excel(query) {
  return request({
    url: '/parts/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/parts/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/parts/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/parts',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/parts/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/parts',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/parts/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/parts/' + id,
    method: 'delete'
  })
}
