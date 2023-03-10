import request from '@/utils/request'
export function codes(query) {
  return request({
    url: '/suppliers/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/suppliers',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/suppliers/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/suppliers',
    method: 'post',
    data
  })
}

export function excel(query) {
  return request({
    url: '/suppliers/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function update(id, data) {
  return request({
    url: '/suppliers/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/suppliers/' + id,
    method: 'delete'
  })
}
