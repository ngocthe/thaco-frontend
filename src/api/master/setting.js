import request from '@/utils/request'

export function index() {
  return request({
    url: '/settings',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/settings',
    method: 'post',
    data
  })
}
