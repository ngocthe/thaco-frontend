import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/ecns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/ecns/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/ecns/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/ecns/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/ecns',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/ecns/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/ecns/' + id,
    method: 'delete'
  })
}
