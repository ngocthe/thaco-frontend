import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/remarks',
    method: 'post',
    data
  })
}
