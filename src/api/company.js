import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/select',
    method: 'get',
    params: query
  })
}

