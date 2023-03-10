import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/production-plans',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/production-plans/columns',
    method: 'get',
    params: query
  })
}

export function imports(query) {
  return request({
    url: '/production-plans/import-files',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/production-plans/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
