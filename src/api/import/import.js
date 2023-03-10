import request from '@/utils/request'
export function attach(data) {
  return request({
    url: `/data-imports/inventory`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function attachMaster(data) {
  return request({
    url: `/data-imports/master`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function attachMRP(data) {
  return request({
    url: `/data-imports/mrp`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function template(query) {
  return request({
    url: '/data-imports/templates',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
