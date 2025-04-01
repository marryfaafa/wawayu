import requests from '@/utils/request.ts'
import { serverAddress } from '@/api/config'
// 查询资料库列表
export function listScience(query) {
    return requests({
      url: `${serverAddress}/system/science/list`,
      method: 'get',
      params: query
    })
  }
  
  // 查询资料库详细
  export function getScience(id) {
    return requests({
      url: `${serverAddress}/system/science/${id}`,
      method: 'get'
    })
  }
  
  // 新增资料库
  export function addScience(data) {
    return requests({
      url: `${serverAddress}/system/science`,
      method: 'post',
      data: data
    })
  }
  
  // 修改资料库
  export function updateScience(data) {
    return requests({
      url: `${serverAddress}/system/science`,
      method: 'put',
      data: data
    })
  }
  
  // 删除资料库
  export function delScience(id) {
    return requests({
      url: `${serverAddress}/system/science/${id}`,
      method: 'delete'
    })
  }