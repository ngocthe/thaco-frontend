import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/mrp-week-definitions',
    method: 'get',
    params: query
  })
}

export function update(data) {
  return request({
    url: '/mrp-week-definitions',
    method: 'post',
    data
  })
}
