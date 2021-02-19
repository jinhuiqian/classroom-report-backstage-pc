import request from "@/utils/request";
const baseURL = "http://localhost:3000";

export function fetchList(params) {
  return request({
    url: `${baseURL}/report/list`,
    method: "get",
    params: {
      ...params
    }
  });
}
