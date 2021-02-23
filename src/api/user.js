import request from '@/utils/request'
// const baseURL = 'https://flobby-3gkbs7rb8f7e282e-1305016829.ap-shanghai.service.tcloudbase.com/api'
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
  console.log("登录")
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

// 注册
export function addAdmin(params) {
  return request({
    url: `${baseURL}/user/addAdmin`,
    data: {
      ...params
    },
    method: 'post'
  })
}

// 注销
export function deleteAdmin(params) {
  return request({
    params,
    url: `${baseURL}/user/delete`,
    method: 'post'
  })
}

// 获取管理员列表
export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/user/list`,
    method: 'get'
  })
}

// 设为超管
export function setSuperAdmin(params){
  return request({
    url: `${baseURL}/user/updateAuth`,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getInfo(token) {
  return request({
    url: `${baseURL}/user/getInfo`,
    method: 'get',
    params: {token}
  })
}

export function updateInfo(params) {
  return request({
    url: `${baseURL}/user/updateInfo`,
    data: {
      ...params
    },
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
