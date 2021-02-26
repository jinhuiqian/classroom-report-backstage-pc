import request from "@/utils/request";
const baseURL = "http://localhost:3000";

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
  console.log(31231323)
  console.log(params)
  return request ({
    url: `${baseURL}/report/updatescore`,
    method: "post",
    data: {
      ...params
    },
  });
}

