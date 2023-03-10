import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/api/plant-wh-list',
    method: 'get',
    params: query
  })
}

