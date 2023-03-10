import request from '@/utils/request'

export function codes(query) {
  return request({
    url: '/plants/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/plants/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function index(query) {
  return request({
    url: '/plants',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/plants/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/plants',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/plants/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/plants/' + id,
    method: 'delete'
  })
}
