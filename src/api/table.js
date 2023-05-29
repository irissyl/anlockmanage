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
export function getCampusList() {
  return request({
    url: '/api/build/listAllArea',
    method: 'get',
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

// 更新小区
export function updateArea(data) {
  return request({
    url: '/api/build/updateArea',
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

// 添加楼栋
export function addBuild(data) {
  return request({
    url: '/api/build/addBuild',
    method: 'post',
    data,
  })
}
// 删除楼栋
export function deleteBuild(data) {
  return request({
    url: '/api/build/delBuild',
    method: 'post',
    data,
  })
}
// 修改楼栋
export function updateBuild(data) {
  return request({
    url: '/api/build/updateBuild',
    method: 'post',
    data,
  })
}
// 部门列表
export function listSection(data) {
  return request({
    url: '/api/office/listSection',
    method: 'post',
    data,
  })
}
// 添加部门
export function addSection(data) {
  return request({
    url: '/api/office/addSection',
    method: 'post',
    data,
  })
}
// 删除部门
export function delSection(data) {
  return request({
    url: '/api/office/delSection',
    method: 'post',
    data,
  })
}
// 修改部门
// export function delSection (data) {
//   return request({
//     url: '/api/office/delSection',
//     method: 'post',
//     data,
//   })
// }

// 取所有办公室名单
export function listRentCustomerPage(param) {
  return request({
    url: '/api/office/listRentCustomerPage',
    method: 'get',
    params: param,
  })
}
