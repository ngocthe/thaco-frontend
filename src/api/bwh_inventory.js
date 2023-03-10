import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/bwh-inventory',
    method: 'get',
    params: query
  })
}

