import requests from '@/utils/request.ts'
import { serverAddress } from '@/api/config'

// 查询【请填写功能名称】列表
export function listDetection(query) {
  return requests({
    url: `${serverAddress}/system/detection/list`,
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getDetection(userId) {
  return requests({
    url: `${serverAddress}/system/detection/` + userId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addDetection(data) {
  return requests({
    url: `${serverAddress}/system/detection`,
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateDetection(data) {
  return requests({
    url: `${serverAddress}/system/detection`,
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delDetection(userId) {
  return requests({
    url: `${serverAddress}/system/detection/` + userId,
    method: 'delete'
  })
}
