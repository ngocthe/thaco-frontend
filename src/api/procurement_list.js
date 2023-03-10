import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/procurement-list',
    method: 'get',
    params: query
  })
}

