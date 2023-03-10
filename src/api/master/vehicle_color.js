import request from '@/utils/request'
export function codes(query) {
  return request({
    url: '/vehicle-colors/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/vehicle-colors',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/vehicle-colors/columns',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/vehicle-colors/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/vehicle-colors',
    method: 'post',
    data
  })
}

export function excel(query) {
  return request({
    url: '/vehicle-colors/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function update(id, data) {
  return request({
    url: '/vehicle-colors/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/vehicle-colors/' + id,
    method: 'delete'
  })
}
