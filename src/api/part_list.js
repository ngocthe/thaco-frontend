import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/part-list',
    method: 'get',
    params: query
  })
}

