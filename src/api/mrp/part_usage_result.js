import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/part-usage-results',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/part-usage-results/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/part-usage-results/codes',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/part-usage-results/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/part-usage-results/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/part-usage-results',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/part-usage-results/' + id,
    method: 'put',
    data
  })
}

export function destroy(id, params) {
  return request({
    url: '/part-usage-results/' + id,
    params: params,
    method: 'delete'
  })
}
