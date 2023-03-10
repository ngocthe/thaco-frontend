import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/mrp-order-calendars',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/mrp-order-calendars',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/mrp-order-calendars/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/mrp-order-calendars/' + id,
    method: 'delete'
  })
}

export function excel(query) {
  return request({
    url: '/mrp-order-calendars/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/mrp-order-calendars/columns',
    method: 'get',
    params: query
  })
}
