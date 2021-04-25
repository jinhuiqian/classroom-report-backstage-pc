import request from "@/utils/request";
// const baseURL = 'https://flobby-3gkbs7rb8f7e282e-1305016829.ap-shanghai.service.tcloudbase.com/api'
const baseURL = 'http://47.117.115.147:3000'
// const baseURL = 'http://localhost:3000'

export function fetchNListCount(params) {
  return request({
    url: `${baseURL}/report/nlistcount`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchAListCount(params) {
  return request({
    url: `${baseURL}/report/alistcount`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchUnratedReport(params) {
  return request({
    url: `${baseURL}/report/unratedreport`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchunProcessedReport(params) {
  return request({
    url: `${baseURL}/report/unprocessedreport`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchNList(params) {
  return request({
    url: `${baseURL}/report/nlist`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchAList(params) {
  return request({
    url: `${baseURL}/report/alist`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function fetchDetail(params) {
  return request({
    url: `${baseURL}/report/detail`,
    method: "get",
    params: {
      ...params
    }
  });
}

export function updateStatus(params) {
    return request ({
      url: `${baseURL}/report/updatestatus`,
      method: "post",
      data: {
        ...params
      },
    });
}

export function updateScore(params) {
  return request ({
    url: `${baseURL}/report/updatescore`,
    method: "post",
    data: {
      ...params
    },
  });
}

export function updateFeedback(params) {
  return request ({
    url: `${baseURL}/report/updatefeedback`,
    method: "post",
    data: {
      ...params
    },
  });
}

export function filtertime(params) {
  return request ({
    url: `${baseURL}/report/filtertime`,
    method: "post",
    data: {
      ...params
    },
  });
}

export function filter(params) {
  return request ({
    url: `${baseURL}/report/filter`,
    method: "post",
    data: {
      ...params
    },
  });
}


