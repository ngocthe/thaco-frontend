import request from '@/utils/request'
import { formatDateTime } from '@/filters'

export function index(query) {
  return request({
    url: '/shortage-parts',
    method: 'get',
    params: query
  })
}

export function columns(query) {
  return request({
    url: '/shortage-parts/columns',
    method: 'get',
    params: query
  })
}

export function imports(query) {
  return request({
    url: '/shortage-parts/import-files',
    method: 'get',
    params: query
  })
}

export function remarks(data) {
  return request({
    url: '/shortage-parts/remarks',
    method: 'post',
    data: data
  })
}

export function simulation(data) {
  return request({
    url: '/shortage-parts/simulation-run',
    method: 'post',
    data: { ...data, ...{ mrp_run_date: formatDateTime(new Date(), 'y-m-d') }}
  })
}

export function excel(query) {
  return request({
    url: '/shortage-parts/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
