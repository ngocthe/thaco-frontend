import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/vietnam-source-logs',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/vietnam-source-logs/codes',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/vietnam-source-logs/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/vietnam-source-logs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/vietnam-source-logs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/vietnam-source-logs',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/vietnam-source-logs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/vietnam-source-logs/' + id,
    method: 'delete'
  })
}
