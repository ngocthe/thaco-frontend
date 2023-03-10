import request from '@/utils/request'

export function excel(query) {
  return request({
    url: '/mscs/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/mscs/columns',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/mscs/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/mscs',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/mscs/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/mscs',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/mscs/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/mscs/' + id,
    method: 'delete'
  })
}
