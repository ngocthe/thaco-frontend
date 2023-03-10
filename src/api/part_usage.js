import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/parts-usage-result',
    method: 'get',
    params: query
  })
}

