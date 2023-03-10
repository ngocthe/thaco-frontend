import request from '@/utils/request'
export function codes(query) {
  return request({
    url: '/box-types/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/box-types',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/box-types/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/box-types',
    method: 'post',
    data
  })
}

export function excel(query) {
  return request({
    url: '/box-types/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function update(id, data) {
  return request({
    url: '/box-types/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/box-types/' + id,
    method: 'delete'
  })
}
