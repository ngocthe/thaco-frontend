import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/in-transit-inventory-log',
    method: 'get',
    params: query
  })
}

