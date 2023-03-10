import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/production-plan-list',
    method: 'get',
    params: query
  })
}

