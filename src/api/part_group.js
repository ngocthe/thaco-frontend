import request from '@/utils/request'

export function index() {
  return request({
    url: '/api/select',
    method: 'get'
  })
}
