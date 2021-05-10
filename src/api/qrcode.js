import request from '@/utils/request'

// const baseURL = 'http://47.117.115.147:3000'
const baseURL = 'http://localhost:3000'

export function uploadCode(params) {
  return request({
    data: {
      ...params
    },
    url: `${baseURL}/QR/addCode`,
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/QR/list`,
    method: 'get'
  })
}

export function del(params) {
  return request({
    params,
    url: `${baseURL}/QR/delete`,
    method: 'get'
  })
}

export function getLength() {
  return request({
    url: `${baseURL}/QR/length`,
    method: 'get'
  })
}
