import request from '@/utils/request'

const baseURL = 'http://106.14.246.27:3000'
// const baseURL = 'http://localhost:3000'

export function fetchReportCount(params) {
  return request({
    url: `${baseURL}/report/reportCount`,
    method: 'get',
    params: {
      ...params
    }
  })
}

export function fetchDetail(params) {
  return request({
    url: `${baseURL}/report/detail`,
    method: 'get',
    params: {
      ...params
    }
  })
}

export function updateStatus(params) {
  return request({
    url: `${baseURL}/report/updatestatus`,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateScore(params) {
  return request({
    url: `${baseURL}/report/updatescore`,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateFeedback(params) {
  return request({
    url: `${baseURL}/report/updatefeedback`,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getList(params) {
  return request({
    url: `${baseURL}/report/getList`,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 添加未打扫记录
export function addNotClean(params) {
  return request({
    url: `${baseURL}/report/addNotClean`,
    data: {
      ...params
    },
    method: 'post'
  })
}

// 导出数据
export function exportRecord(params) {
  return request({
    // 连接超时时间
    timeout: 60 * 60 * 1000,
    url: `${baseURL}/report/exportData`,
    data: {
      ...params
    },
    method: 'post'
  })
}
