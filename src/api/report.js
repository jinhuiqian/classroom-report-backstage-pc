import request from "@/utils/request";
// const baseURL = 'https://flobby-3gkbs7rb8f7e282e-1305016829.ap-shanghai.service.tcloudbase.com/api'
const baseURL = 'http://localhost:3000'

export function fetchList(params) {
  return request({
    url: `${baseURL}/report/list`,
    method: "get",
    params: {
      ...params
    }
  });
}
