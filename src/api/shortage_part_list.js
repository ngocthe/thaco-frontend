import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/shortage-part-list',
    method: 'get',
    params: query
  })
}

