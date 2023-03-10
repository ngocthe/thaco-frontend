import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/box-type-list',
    method: 'get',
    params: query
  })
}

