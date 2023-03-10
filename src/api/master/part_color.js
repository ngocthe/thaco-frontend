import request from '@/utils/request'

export function columns(query) {
  return request({
    url: '/part-colors/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/part-colors/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/part-colors/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function index(query) {
  return request({
    url: '/part-colors',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/part-colors/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/part-colors',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/part-colors/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/part-colors/' + id,
    method: 'delete'
  })
}
