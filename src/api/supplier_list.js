import request from '@/utils/request'

export function index() {
  return request({
    url: '/api/supplier-list',
    method: 'get'
  })
}

