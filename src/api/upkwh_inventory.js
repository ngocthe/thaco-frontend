import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/upkwh-inventory',
    method: 'get',
    params: query
  })
}

