import request from '@/utils/request'
export function excel(query) {
  return request({
    url: '/admins/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function columns(query) {
  return request({
    url: '/admins/columns',
    method: 'get',
    params: query
  })
}

export function indexRole(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/admins',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/admins',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/admins/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/admins',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/admins/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/admins/' + id,
    method: 'delete'
  })
}
