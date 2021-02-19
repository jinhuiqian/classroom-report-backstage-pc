import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

// 手机号登录
export function loginByPhone(params) {
  return request({
    url: `${baseURL}/user/loginByPhone`,
    data: {
      ...params
    },
    method: 'post'
  })
}
// 工号登录
export function loginByJN(params) {
  return request({
    url: `${baseURL}/user/loginByJN`,
    data: {
      ...params
    },
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
