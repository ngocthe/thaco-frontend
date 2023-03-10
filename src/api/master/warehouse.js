import request from '@/utils/request'

export function codes(query) {
  return request({
    url: '/warehouses/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/warehouses/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function index(query) {
  return request({
    url: '/warehouses',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/warehouses/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/warehouses',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/warehouses/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/warehouses/' + id,
    method: 'delete'
  })
}
