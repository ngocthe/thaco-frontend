import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/upkwh-order-point-control',
    method: 'get',
    params: query
  })
}

