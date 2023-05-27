import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/getList',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}

// 园区列表
export function getCampusList(data) {
  return request({
    url: '/api/build/listAllArea',
    method: 'get',
    data,
  })
}

// 添加小区/api/build/addArea
export function doAddCampus(data) {
  return request({
    url: '/api/build/addArea',
    method: 'post',
    data,
  })
}

// 删除小区
export function deleteCampus(data) {
  return request({
    url: '/api/build/delArea',
    method: 'post',
    data,
  })
}
// 楼栋列表
export function getBuildList(data) {
  return request({
    url: '/api/build/listAllBuild',
    method: 'get',
    data,
  })
}
