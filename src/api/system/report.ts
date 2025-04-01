import requests from "@/utils/request.ts";
import { serverAddress } from '@/api/config'

// 查询上报列表
export const listReport = (query) => {
  console.log('发送请求参数:', query)  // 添加日志
    const url= `${serverAddress}/system/report/list`
    return requests({ url, method: "get",params:query})
}

// 查询上报详细
export const getReport=(id) =>{
    const url= `${serverAddress}/system/report/` + id
    return requests({ url, method: "get"})
}

// 新增上报
export const addReport = (data) => {
    const url= `${serverAddress}/system/report`
    return requests({ url, method: "post",data})
}

// 修改上报
export const updateReport = (data) => {
    const url= `${serverAddress}/system/report`
    return requests({ url, method: "put",data})
}

// 删除上报
export function delReport(id) {

    const url= `${serverAddress}/system/report/` + id
    return requests({ url, method: "delete"})

}

// 导出上报列表
export const exportReport = (data) => {
  return requests({
    url: `${serverAddress}/system/report/export`,
    method: 'post',
    data,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
