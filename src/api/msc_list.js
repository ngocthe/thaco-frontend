import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/msc-list',
    method: 'get',
    params: query
  })
}

export function codes(query) {
  return request({
    url: '/mscs/codes',
    method: 'get',
    params: query
  })
}

