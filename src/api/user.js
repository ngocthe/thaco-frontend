import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
export function changePassword(data) {
  return request({
    url: '/change-password',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/profile',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}
