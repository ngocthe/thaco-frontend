import request from '@/utils/request'
export function codes(query) {
  return request({
    url: '/part-groups/codes',
    method: 'get',
    params: query
  })
}

export function index(query) {
  return request({
    url: '/part-groups',
    method: 'get',
    params: query
  })
}

export function excel(query) {
  return request({
    url: '/part-groups/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function show(id) {
  return request({
    url: '/part-groups/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/part-groups',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/part-groups/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/part-groups/' + id,
    method: 'delete'
  })
}

export function entityByCode(code) {
  return request({
    url: `/part-groups/entity/${code}`,
    method: 'get'
  })
}

export function columns(query) {
  return request({
    url: '/part-groups/columns',
    method: 'get',
    params: query
  })
}
