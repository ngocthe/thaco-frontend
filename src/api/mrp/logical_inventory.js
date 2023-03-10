import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/logical-inventory',
    method: 'get',
    params: query
  })
}

export function indexForeCast(query) {
  return request({
    url: '/logical-inventory/forecast',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/logical-inventory/columns',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/logical-inventory/export',
    method: 'get',
    responseType: 'blob',
    params: query
  })
}
