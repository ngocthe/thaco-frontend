import request from '@/utils/request'

export function indexModelGradeName(query) {
  return request({
    url: '/api/select',
    method: 'get',
    params: query
  })
}

