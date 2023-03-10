import request from '@/utils/request'
export function excel(query) {
  return request({
    url: '/boms/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/boms/columns',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/boms',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/boms',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/boms/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/boms',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/boms/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/boms/' + id,
    method: 'delete'
  })
}
