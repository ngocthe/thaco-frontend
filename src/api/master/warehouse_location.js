import request from '@/utils/request'

export function codes(query) {
  return request({
    url: '/warehouse-locations/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/warehouse-locations/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function index(query) {
  return request({
    url: '/warehouse-locations',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/warehouse-locations/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/warehouse-locations',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/warehouse-locations/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/warehouse-locations/' + id,
    method: 'delete'
  })
}
